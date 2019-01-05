import styled, { css } from 'styled-components';

import media from 'styling/media';
import { rhythm } from 'styling/typography';

const Button = styled.button`
  width: 140px;
  ${media.phone`
    width: 120px;
  `}
  padding: ${rhythm(0.3)} ${rhythm(0.5)};
  ${media.phone`
    padding: ${rhythm(0.5)} ${rhythm(0.3)};
  `}
  margin: 0 ${rhythm(0.1)};
  z-index: 3;

  background: rgb(54, 89, 122);
  color: rgb(255, 255, 255);
  border: 0;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14),
    0px 3px 3px -2px rgba(0, 0, 0, 0.12);

  font-family: Raleway, sans-serif;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;

  cursor: pointer;

  transition-duration: 0.5s;

  ${props => !props.disabled
    && css`
      &:active {
        transform: scale(0.95);
        box-shadow: unset;
      }

      &:focus,
      &:hover {
        background: rgb(255, 255, 255);
        color: rgb(54, 89, 122);
      }
    `}

  ${props => props.disabled
    && css`
      opacity: 0.3;
      cursor: default;
    `}
`;

export default Button;
