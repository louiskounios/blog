---
title: "Flattening the Contents of a Directory Without Overwriting Files"
date: "2019-01-03"
summary: "Using Python to develop a very simple CLI that flattens a directory's structure without overwriting files when filename clashes occur."
---

A few weeks ago, a friend was going through some old junk he had at home and stumbled upon a couple of old hard drives.
In those hard drives, there were a few directories that included an enormous amount of files.
A large portion of the files were in the top directory, but other files were deeply nested.
A quick inspection revealed that files that were deeply nested shared a filename with files that were in the top directory.
What was more irritating was that some files had the same filename but different content.

So, my friend called me and asked me how he could deal with this.
Basically, he wanted an easy way to navigate the contents of the directory without going through all the nesting.
He also didn't want to change the original filenames too much.
Although I was positive that no existing tool would achieve this, ever since I found out that there's [a website you can use to deliver a potato as a gift to someone](https://potatoparcel.com), my world view has never been the same.
Anyway, this was actually [incredibly easy to achieve on Windows by leveraging the search GUI](https://superuser.com/a/523854).
My friend was on Windows, so problem solved.

But this whole thing piqued my curiosity.
Has anyone else created a command-line-only solution for this before?
As a matter of fact, yes.
There's [this amazing `go` tool called `flatten`](https://github.com/goggle/flatten) that solves the issue.
And here I was imagining that I had a unique problem on my hands.

<video autoplay controls loop muted>
  <source src="https://media.giphy.com/media/Jq7y34Hgfy01y/giphy.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

Although it was clear that the issue was (1) not unique; and (2) already solved, I decided to roll my own solution anyway.
Because sometimes re-inventing the wheel is just plain fun.

## Reinventing the Wheel

I decided the solution would need to do the following:

* Bring all files from subdirectories into the top directory
* Do so without overwriting files in case of name clashes
* Files should keep their initial filename intact, but have some sort of extra suffix used to prevent name clashes
* The suffix used to differentiate between duplicates should be a counter.

The last point is an interesting one.
If I'm being honest, I only added it for the extra challenge this would bring as I was already imagining a solution where the suffix is a randomly generated UUID / string or something along those lines.
But the counter suffix also gives us the benefit that the tool is fully deterministic.
[Although it is incredibly unlikely we'd get something like a UUID collision](https://en.wikipedia.org/wiki/Universally_unique_identifier#Collisions), the determinism that comes from using a counter along with the extra challenge it'd be provide led me to making it part of the requirements.

For my language of choice, I decided to use Python 3.7.

### Filename to Filepath Map

The first thing we need to do is create some sort of mapping between filenames and filepaths.
A filename is the stem of the filepath (e.g., if the filepath is `/home/louis/file.txt`, the filename is `file.txt`).

Let's consider the possible scenarios:

1. Filename in top directory is unique across all files
1. Filename in top directory is shared by one or more files in subdirectories
1. Filename in subdirectory is unique across all files
1. Filename in subdirectory is shared by one or more files in other subdirectories but not in the top directory

Using a Python dictionary and the `pathlib` library, we have something like this:

```python
def top_dir_files(top_dir):
    return {path for path in top_dir.glob('*') if path.is_file()}


def nested_dir_files(top_dir):
    return {path for path in top_dir.glob('**/*')
            if path.is_file() and path.parent != top_dir}


def filename_paths_map(path):
    top_dir_files = top_dir_files(path)
    nested_dir_files = nested_dir_files(path)

    filename_paths_map = dict()
    for file in top_dir_files:
        filename_paths_map[file.name] = [file]

    for file in nested_dir_files:
        if file.name in filename_paths_map:
            filename_paths_map[file.name].append(file)
        else:
            filename_paths_map[file.name] = [file]

    return filename_paths_map
```

The `top_dir_files` / `nested_dir_files` separation is not _really_ necessary; I just prefer the idea that we begin with a map of just the top directory files.


### Utility Functions

Next, we are going to need some utility functions.

We need a function that returns the suffixless filename so that we can append our counter suffix to it in case of a name clash.

```python
# Returns a suffixless filename.
# 'myfile.tar.gz' => 'myfile'
def suffixless_name(path):
    return path.name.split('.')[0]
```

The `stem` property is not useful here as it returns the filename up to the last period and that is an issue for filenames with multiple suffixes such as `.tar.gz`.
So instead we split at the first period and take the first element of the array.
In case there's no period in the filename, the first element of the array will be the original filename.

We also need a function that returns the suffix of the filename which will follow the counter suffix we add.

```python
# Returns the suffixes combined into a string.
# 'myfile.tar.gz' => '.tar.gz'
def suffix(path):
    return ''.join(path.suffixes)
```

The `suffix` property is not suitable as it returns a substring starting from the last period all the way to the end of the filename.
We use the `suffixes` property instead which returns a list of substrings that start with a period and end right before another period or at the end of the string.
Since the substrings are stored with their periods, we simply join the list without introducing any extra characters.

Lastly, we need a function that returns the counter suffix.
If we have `x` files that share a filename, the function will be called `x` times, once for each shared filename.
In return, we get a zero-padded counter suffix.

For this we need:

1. The index of the file we're currently looping over, relative to the number of files that share that filename
2. The number of files that share the filename we're currently processing.

```python
# Returns a zero-padded counter suffix.
def counter_suffix(current, total):
    return '_' + str(current).zfill(len(str(total)))
```

If we have ten files with the filename `file.jpg` and we're currently processing the third of those files, the function call will be `counter_suffix(3, 10)` and the returned value will be `_03`.
If a hundred files shared a filename, the returned value would be `_003`.
And so forth.

### Renaming the Files

We have three possible scenarios when looping over the filename-to-filepaths map and renaming the files:

1. Filename is globally unique and filepath is in top directory; do nothing.
2. Filename is globally unique and filepath is in nested directory; move to top directory.
3. Filename is _not_ globally unique; loop over the filepaths and move the files to the top directory, but not before appending a counter suffix to their name to prevent name clashes.


```python
def rename_files(top_dir):
    fpm = filename_paths_map(top_dir)
    for _, paths in fpm.items():
        # Filename in top dir does not clash with any other filename.
        # Do nothing.
        if len(paths) == 1 and paths[0].parent == top_dir:
            print(f'{paths[0]} => No action necessary')
            continue

        # Filename in nested dir does not clash with any other filename.
        # Move the file to the top directory.
        if len(paths) == 1 and paths[0].parent != top_dir:
            new_name = top_dir / paths[0].name
            print(f'{paths[0]} => {new_name}')
            paths[0].rename(new_name)
            continue

        # Since we are renaming the top directory file _and_ any files with
        # the same file in any subdirectory, we can just loop over all files
        # and move them to the top directory with a running counter added to
        # their filename to ensure uniqueness.
        for idx, path in enumerate(paths, start=1):
            base_name = suffixless_name(path)
            suff = suffix(path)
            counter = counter_suffix(idx, len(paths))
            new_name = top_dir / (base_name + counter + suff)
            print(f'{path} => {new_name}')
            path.rename(new_name)
```

And that does it!

### Putting It All Together

Here, I'm putting all the previous parts together to create a very simple Python script that can be used as a CLI.

```python
#!/usr/local/bin/python3
#
# Script that flattens a directory without overwriting files that share a
# name. Takes absolute path to directory as input.
#
# All files in any subdirectory of the user-provided directory, regardless
# of depth, are moved to the user-provided directory. When filenames clash,
# special care is taken by adding a counter to the filename (e.g., '_001').
#
# Linux only. Tested only on Python 3.7. Minimum version is 3.6.
#
# This has NOT been tested extensively. Use at your own risk.

import pathlib
import sys


def flatten_directory(path):
    if not _is_valid_path(path):
        return 1

    _rename_files(path)
    return 0


def _is_valid_path(path):
    if not isinstance(path, pathlib.Path):
        print('"path" argument must be instance of "pathlib.Path"')
        return False

    if not path.is_absolute():
        print('Provided path must be an absolute path')
        return False

    if not path.is_dir():
        print('Provided path must be a directory')
        return False

    return True


def _top_dir_files(top_dir):
    return {path for path in top_dir.glob('*') if path.is_file()}


def _nested_dir_files(top_dir):
    return {path for path in top_dir.glob('**/*')
            if path.is_file() and path.parent != top_dir}


def _filename_paths_map(path):
    top_dir_files = _top_dir_files(path)
    nested_dir_files = _nested_dir_files(path)

    filename_paths_map = dict()
    for file in top_dir_files:
        filename_paths_map[file.name] = [file]

    for file in nested_dir_files:
        if file.name in filename_paths_map:
            filename_paths_map[file.name].append(file)
        else:
            filename_paths_map[file.name] = [file]

    return filename_paths_map


# Returns a suffixless filename.
# 'myfile.tar.gz' => 'myfile'
def _suffixless_name(path):
    return path.name.split('.')[0]


# Returns the suffixes combined into a string.
# 'myfile.tar.gz' => '.tar.gz'
def _suffix(path):
    return ''.join(path.suffixes)


# Returns a zero-padded counter suffix.
def _counter_suffix(current, total):
    return '_' + str(current).zfill(len(str(total)))


def _rename_files(top_dir):
    filename_paths_map = _filename_paths_map(top_dir)

    for _, paths in filename_paths_map.items():
        # Filename in top dir does not clash with any other filename.
        # Do nothing.
        if len(paths) == 1 and paths[0].parent == top_dir:
            print(f'{paths[0]} => No action necessary')
            continue

        # Filename in nested dir does not clash with any other filename.
        # Move the file to the top directory.
        if len(paths) == 1 and paths[0].parent != top_dir:
            new_name = top_dir / paths[0].name
            print(f'{paths[0]} => {new_name}')
            paths[0].rename(new_name)
            continue

        # Since we are renaming the top directory file _and_ any files with
        # the same file in any subdirectory, we can just loop over all
        # files and move them to the top directory with a running counter
        # added to their filename to ensure uniqueness.
        for idx, path in enumerate(paths, start=1):
            base_name = _suffixless_name(path)
            suffix = _suffix(path)
            counter = _counter_suffix(idx, len(paths))
            new_name = top_dir / (base_name + counter + suffix)
            print(f'{path} => {new_name}')
            path.rename(new_name)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Need one arg: the absolute path to the directory')
        sys.exit(1)

    path = pathlib.Path(sys.argv[1])
    sys.exit(flatten_directory(path))
```

Save this file as `flatten.py`, make it executable (`chmod +x flatten.py`) and run it by providing an absolute path to the directory to be flattened as the first argument (e.g., `./flatten.py /home/louis/messy-dir`).
