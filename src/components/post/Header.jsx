import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { rhythm } from 'styling/typography';
import Fold from './Fold';

const Container = styled.div`
  padding: ${rhythm(1.5)} ${rhythm(2)};
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: ${rhythm(0.3)};

  color: rgb(255, 255, 255);

  font-size: 1.65rem;
  font-weight: inherit;
`;

const StyledTime = styled.span`
  margin: 0;

  color: rgb(212, 212, 212);

  font-size: 1.1rem;
  font-weight: inherit;
`;

const Time = (props) => {
  const { datetime, children } = props;

  return (
    <time dateTime={datetime}>
      <StyledTime>{children}</StyledTime>
    </time>
  );
};

Time.propTypes = {
  datetime: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const Header = (props) => {
  const { date, mrDate, title } = props;

  return (
    <Fold {...props}>
      <Container>
        <Title>{title}</Title>
        <Time datetime={mrDate}>{date}</Time>
      </Container>
    </Fold>
  );
};

Header.propTypes = {
  date: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
  mrDate: PropTypes.string.isRequired,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  slug: undefined,
};

export default Header;
