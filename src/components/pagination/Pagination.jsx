import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { rhythm } from 'styling/typography';
import Button from './Button';

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: ${rhythm(1.8)};
  z-index: 3;

  font-family: Raleway, sans-serif;
  font-weight: 300;
  font-size: 0.9rem;

  color: rgb(255, 255, 255);
`;

class Pagination extends React.Component {
  static wrapLink(component, wrap, link) {
    if (wrap) {
      return <Link to={link}>{component}</Link>;
    }

    return component;
  }

  render() {
    const {
      currentPage,
      numPages,
      isFirst,
      isLast,
      previousPage,
      nextPage,
    } = this.props;

    const previous = <Button disabled={isFirst}>Previous</Button>;
    const next = <Button disabled={isLast}>Next</Button>;
    return (
      <Container ariaLabel="Blog posts pagination">
        {Pagination.wrapLink(previous, !isFirst, previousPage)}
        <span>{`${currentPage} of ${numPages}`}</span>
        {Pagination.wrapLink(next, !isLast, nextPage)}
      </Container>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  previousPage: PropTypes.string.isRequired,
  nextPage: PropTypes.string.isRequired,
};

export default Pagination;
