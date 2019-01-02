import styled from 'styled-components';

import media from 'styling/media';
import { rhythm } from 'styling/typography';

const Nameplate = styled.h1`
  padding: ${rhythm(0.7)} ${rhythm(1.2)};
  ${media.phone`
    padding: ${rhythm(0.35)} ${rhythm(0.6)};
  `}
  z-index: 2;

  background: rgba(45, 58, 71, 0.7);
  color: rgb(255, 255, 255);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);

  font-size: 3rem;
  ${media.phone`
    font-size: 2.3rem;
  `}
  font-weight: 300;
  text-transform: uppercase;
  word-spacing: ${rhythm(0.5)};
  ${media.phone`
    word-spacing: ${rhythm(0.2)};
  `}
  white-space: nowrap;

  cursor: pointer;
  user-select: none;

  &:focus,
  &:hover {
    box-shadow: 0 0 40px 5px rgb(255, 255, 255);

    transition: box-shadow ease 0.5s;
  }
`;

export default Nameplate;
