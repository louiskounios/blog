import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import styled, { css } from 'styled-components';

import { rhythm } from 'styling/typography';

const FoldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: ${rhythm(0.4)};
  z-index: 4;

  background: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.9);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  ${props => props.bottom
    && css`
      border: unset;
      border-top: 1px solid rgba(0, 0, 0, 0.5);
    `}

  font-family: Raleway, sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;

  ${props => props.interactive
    && css`
      background: rgb(54, 89, 122);
      color: rgb(255, 255, 255);
      border: unset;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      ${props.bottom && css`
        box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px -4px 5px 0px rgba(0, 0, 0, 0.14),
          0px -1px 10px 0px rgba(0, 0, 0, 0.12);
      `}

      cursor: pointer;
      user-select: none;

      transition-duration: 0.4s;

      &:active {
        background: rgb(45, 73, 100);
        box-shadow: unset;
      }

      &:focus,
      &:hover {
        opacity: 0.85;
      }
    `}
`;

class Fold extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    const { slug } = this.props;
    navigate(slug);
  }

  handleKeyPress(e) {
    const { slug } = this.props;
    const code = e.charCode || e.keyCode;
    if (code === 13 || code === 32) {
      navigate(slug);
    }
  }

  render() {
    const { children, interactive } = this.props;

    const inputProps = {};
    if (interactive) {
      inputProps.onClick = this.handleClick;
      inputProps.onKeyPress = this.handleKeyPress;
      inputProps.role = 'link';
      inputProps.tabIndex = 0;
    }

    return (
      <FoldContainer {...this.props} {...inputProps}>
        {children}
      </FoldContainer>
    );
  }
}

Fold.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  interactive: PropTypes.bool.isRequired,
  slug: PropTypes.string,
};

Fold.defaultProps = {
  slug: undefined,
};

export default Fold;
