import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import styled, { css } from 'styled-components';

const FoldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  z-index: 4;

  background: rgb(54, 89, 122);
  color: rgb(255, 255, 255);
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  ${props => props.bottom
    && css`
      box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px -4px 5px 0px rgba(0, 0, 0, 0.14),
        0px -1px 10px 0px rgba(0, 0, 0, 0.12);
    `}

  font-family: Raleway, sans-serif;
  font-weight: 300;
  text-align: center;

  ${props => props.interactive
    && css`
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
