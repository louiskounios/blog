import React from 'react';

import Blog from 'components/blog';
import Post from 'components/post';

const Page = () => {
  const html = `
    <video autoplay loop muted>
      <source src="https://media.giphy.com/media/7VHV66bRjGRSo/giphy.mp4" type="video/mp4" />
    </video>
    <p style="text-align: center;">Whoops! I can't seem to find the resource you're looking for.</p>
  `;

  return (
    <Blog>
      <Post date="January 01, 1970" mrDate="1970-01-01" title="404" html={html} />
    </Blog>
  );
};

export default Page;
