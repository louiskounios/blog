import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import media from 'styling/media';
import { rhythm } from 'styling/typography';
import Comments from './Comments';
import Content from './Content';
import Fold from './Fold';
import Header from './Header';

const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 3;

  background-color: rgb(255, 255, 255);
  outline: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14),
    0px 3px 3px -2px rgba(0, 0, 0, 0.12);

  margin-bottom: ${rhythm(1.6)};
  ${media.phone`
    margin-bottom: ${rhythm(1)};
  `}

  &:last-child {
    margin-bottom: 0;
  }
`;

const Post = (props) => {
  const {
    date,
    html,
    mrDate,
    slug,
    summary,
    title,
  } = props;

  return (
    <PostContainer>
      <Header
        date={date}
        interactive={summary !== undefined}
        mrDate={mrDate}
        slug={slug ? '/' + slug : '/'}
        title={title}
      />

      <Content html={html}>
        {summary && <p>{summary}</p>}
      </Content>
      {html && <Comments />}

      <Fold bottom interactive slug={slug ? '/' + slug : '/'}>
        {summary ? 'Read More' : 'Back Home'}
      </Fold>
    </PostContainer>
  );
};

Post.propTypes = {
  date: PropTypes.string.isRequired,
  html: PropTypes.string,
  mrDate: PropTypes.string.isRequired,
  slug: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Post.defaultProps = {
  html: undefined,
  slug: undefined,
  summary: undefined,
};

export default Post;
