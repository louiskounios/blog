import React from 'react';

import Blog from 'components/blog';
import Post from 'components/post';

const Page = () => {
  const html = `
    <video autoplay height="200" loop muted style="display: block; margin: 0 auto; padding: 0.5rem 0;">
      <source src="https://media.giphy.com/media/7VHV66bRjGRSo/giphy.mp4" type="video/mp4" />
    </video>
    <p style="text-align: center;">Whoops! I can't seem to find the resource you're looking for.</p>
  `;

  return (
    <Blog>
      <Post date="January 01, 1970" title="404" html={html} />
    </Blog>
  );
};

export default Page;
