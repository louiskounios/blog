import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'normalize.css';

import media from 'styling/media';
import Footer from 'components/footer';
import GlobalStyle from 'styling/global-style';
import Header from 'components/header';
import MainContent from 'components/main-content';
import Pagination from 'components/pagination';
import SearchEngineOptimization from 'components/search-engine-optimization';
import SiteBaseMetadata from 'components/site-base-metadata';

const Site = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  z-index: 1;
`;

const SiteContent = styled.div`
  flex: 1 0 auto;

  margin-top: 25vh;
  ${media.tablet`
    margin-top: 30vh;
  `}
  ${media.phone`
    margin-top: 30vh;
  `}
  z-index: 1;
`;

const Blog = ({ children, pagination }) => (
  <React.Fragment>
    <SiteBaseMetadata />
    <SearchEngineOptimization />
    <GlobalStyle />
    <Site>
      <Header />
      <SiteContent>
        <MainContent>
          {children}
          {pagination && <Pagination {...pagination} />}
        </MainContent>
      </SiteContent>
      <Footer />
    </Site>
  </React.Fragment>
);

Blog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    isFirst: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired,
    previousPage: PropTypes.string.isRequired,
    nextPage: PropTypes.string.isRequired,
  }),
};

Blog.defaultProps = {
  pagination: undefined,
};

export default Blog;
