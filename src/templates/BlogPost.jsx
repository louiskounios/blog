import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Blog from 'components/blog';
import Post from 'components/post';
import SearchEngineOptimization from 'components/search-engine-optimization';

const BlogPost = ({ data: { markdownRemark: post } }) => (
  <Blog>
    <SearchEngineOptimization
      article
      description={post.frontmatter.summary}
      slug={post.fields.slug}
      title={post.frontmatter.title}
    />
    <Post
      date={post.frontmatter.date}
      mrDate={post.frontmatter.mrDate}
      title={post.frontmatter.title}
      html={post.html}
    />
  </Blog>
);

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
        mrDate: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogPost;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        mrDate: date(formatString: "YYYY-MM-DD")
        summary
        title
      }
      fields {
        slug
      }
    }
  }
`;
