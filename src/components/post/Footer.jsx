import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { rhythm } from 'styling/typography';
import Fold from './Fold';

const Container = styled.div`
  padding: ${rhythm(0.4)} 0;

  font-family: Lato, sans-serif;
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
`;

const Footer = (props) => {
  const { children } = props;

  return (
    <Fold bottom interactive {...props}>
      <Container>{children}</Container>
    </Fold>
  );
};

Footer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  slug: PropTypes.string,
};

Footer.defaultProps = {
  slug: undefined,
};

export default Footer;
