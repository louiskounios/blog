---
title: "Hello, World"
date: "2019-01-02"
summary: "My first, and hopefully not last, blog post."
---

!["Hello, World" in Emojicode](images/hello-world-emojicode.png "\"Hello, World\" in Emojicode.")

Hello, everyone.

My name is Loizos Kounios, but everyone calls me "Louis".
I'm a Software Engineer living in the small island of Cyprus.
This is my first post – I have finally started the blog I've always been meaning start.

As I'm writing this, I'm realising that this first post is actually far more important than I initially imagined.
Not so much because I have anything important or meaningful to say, but rather because finishing it will allow me to make it past the gatekeeper in my mind that won't let me publish the blog until I have written at least one post.
And since I'm not particularly good at talking about myself, I'll just talk a bit about what this blog will be about, and why and how I created it.

## The What

Code, software, technology.
Short and sweet.
I'm hoping that this will be a way for me to document my learning process / journey.

## The Why

My motivations for creating this blog were almost purely educational.
See, one thing that always bothered me was knowing the name of a technology, but having no idea what it does or is used for.
If we were to borrow from Donald Rumsfeld, this list of technologies would be my [known unknowns](https://en.wikipedia.org/wiki/There_are_known_knowns).
Many technologies relating to front-end development were becoming part of my known unknowns list.
And due to the rapid pace at which the field of web development is evolving, that list kept growing at an alarming rate.
So I decided to do something about it by working on a side project that was outside my comfort zone.
And thus this blog was born.

Any extra motivation came from the opportunity to network and / or help other people.
When being stuck on an issue for hours and on the brink of bashing my head against the keyboard, other people's blog posts came to my rescue.
So I'm hoping that through the magic of search engines, one of my posts ends up having the same effect on someone else.

## The How

The core technologies used are [React](https://reactjs.org) and [Gatsby](https://gatsbyjs.org).

I used a few different technologies to style this site:

* [normalize.css](https://necolas.github.io/normalize.css/) is used to give a more consistent starting point.
* [Typography.js](https://kyleamathews.github.io/typography.js/) is used to set up the basis for things like font sizes and margins.
* [styled-components](https://www.styled-components.com) is used for a taste of some sweet CSS-in-JS controversy. Oh, and I used it for styling everything else too.

The header / banner uses [Trianglify](https://github.com/qrohlf/trianglify) to generate a new cool background every time it is re-rendered.
The version of Trianglify that's used on this site is [my own fork](https://github.com/loizoskounios/trianglify).
The fork removes a lot of the rendering functionality provided by the original library.
I found this to be necessary as Gatsby was not able to bundle static binaries.
Essentially, the fork makes it so I'm provided with the paths for the background and I use those paths in React to generate an `<svg>` component.
A demo site showcasing Trianglify is available [here](https://trianglify.io).

Posts are written in Markdown and converted to HTML using [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) which uses [remark](https://remark.js.org) under the hood. Code blocks are handled by [Prism](https://prismjs.com) with Solarized Dark as the [theme](https://github.com/michaeljdeeb/prism-solarized-dark).

For typefaces, I'm using
* [Crimson Text](https://fonts.google.com/specimen/Crimson+Text) as my main font (serif);
* [Raleway](https://fonts.google.com/specimen/Raleway) as my secondary font used on headings, buttons, etc (sans-serif);
* [Fira Mono](https://fonts.google.com/specimen/Fira+Mono) as the monospace font used in code blocks and inline code.

As a substitute for people telling me how bad my code is, I'm using [ESLint](https://eslint.org) with the [Airbnb ruleset](https://www.npmjs.com/package/eslint-config-airbnb).

I have published the source code for this blog under the MIT license on [GitHub](https://github.com/loizoskounios/blog).

## The Future

Looking ahead, the most important thing is to keep posting.

Beyond that, I'm looking into adding some type of comment section.
I was planning on starting with something like [Disqus](https://disqus.com) as that'd at least give me something until I figure out exactly what I want.
But GDPR makes things a bit too complicated for my liking.
I don't really understand GDPR well enough to make any proper decision right now.
Another alternative I found is [Utterances](https://utteranc.es) which essentially automates the process of creating a GitHub issue for every blog post and using the issue as a comment section.
I'll keep digging.

Lastly, I'm planning on improving how the blog looks and feels, especially on mobile as I don't feel I spent the appropriate amount of time on that task.
