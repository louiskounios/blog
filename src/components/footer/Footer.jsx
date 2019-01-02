import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { rhythm } from 'styling/typography';

const Container = styled.footer`
  display: flex;
  flex-direction: column;

  flex-shrink: 0;

  padding: ${rhythm(0.3)} ${rhythm(0.6)};
  z-index: 1;

  background: rgb(54, 89, 122);
  color: rgb(255, 255, 255);
  box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.2), 0px -1px 1px 0px rgba(0, 0, 0, 0.14),
    0px -2px 1px -1px rgba(0, 0, 0, 0.12);

  font-family: Lato, sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  text-align: center;
  word-spacing: ${rhythm(0.05)};
`;

const Link = styled.a`
  padding: 0.1em 0;

  color: rgb(255, 255, 255);

  text-decoration: underline;

  transition-duration: 0.4s;

  &:visited {
    color: rgb(255, 255, 255);
  }

  &:focus,
  &:hover {
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);

    text-decoration: none;
  }
`;

const Footer = ({ author, copyright, repository }) => (
  <Container>
    <div>
      {`© ${copyright} ${author}`}
      {' · '}
      <Link href={repository} target="blank" rel="nofollow noopener noreferrer">
        Source
      </Link>
      {' · '}
      Powered by
      {' '}
      <Link href="https://gatsbyjs.org" target="blank" rel="nofollow noopener noreferrer">
        Gatsby
      </Link>
    </div>
  </Container>
);

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  copyright: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

const query = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        author
        copyright
        repository
      }
    }
  }
`;

export default () => (
  <StaticQuery query={query} render={data => <Footer {...data.site.siteMetadata} />} />
);
