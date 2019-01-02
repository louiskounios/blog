import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Blog from 'components/blog';
import Post from 'components/post';

const postComponents = edges => (
  edges.map(edge => (
    <Post
      key={edge.node.fields.slug}
      date={edge.node.frontmatter.date}
      mrDate={edge.node.frontmatter.mrDate}
      slug={edge.node.fields.slug}
      summary={edge.node.frontmatter.summary}
      title={edge.node.frontmatter.title}
    />
  ))
);

const BlogList = (props) => {
  const {
    data: {
      allMarkdownRemark: {
        edges,
      },
    },
    pageContext: {
      currentPage,
      numPages,
    },
  } = props;

  const pagination = {
    currentPage,
    numPages,
    isFirst: currentPage === 1,
    isLast: currentPage === numPages,
    previousPage: currentPage - 1 === 1 ? '/' : `/pages/${currentPage - 1}`,
    nextPage: `/pages/${currentPage + 1}`,
  };

  const posts = postComponents(edges);
  return (
    <Blog pagination={pagination}>
      <div>{posts}</div>
    </Blog>
  );
};

BlogList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            frontmatter: PropTypes.shape({
              date: PropTypes.string.isRequired,
              mrDate: PropTypes.string.isRequired,
              summary: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
  }).isRequired,
};

export default BlogList;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            mrDate: date(formatString: "YYYY-MM-DD")
            summary
            title
          }
        }
      }
    }
  }
`;
