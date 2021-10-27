import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import media from 'styling/media';
import { rhythm } from 'styling/typography';

const ContentContainer = styled.div`
  width: 100%;
  padding: ${rhythm(1.2)} ${rhythm(2)};
  ${media.phone`
    padding: ${rhythm(0.8)} ${rhythm(0.8)};
  `}

  z-index: 3;

  text-align: ${props => (props.children ? 'center' : 'unset')};

  & hr {
    height: 0;
    margin: 0 -${rhythm(2)} ${rhythm(0.8)} -${rhythm(2)};
    ${media.phone`
      margin: 0 -${rhythm(0.8)} ${rhythm(0.6)} -${rhythm(0.8)};
    `}

    border-top: 1px solid rgba(0, 0, 0, 0.1);

    text-align:center;
  }

  & p {
    margin-bottom: ${rhythm(0.8)};
    ${media.phone`
      margin-bottom ${rhythm(0.6)};
    `}
  }

  & blockquote {
    margin: 0 0 ${rhythm(0.8)} 0;
    ${media.phone`
      margin-bottom ${rhythm(0.6)};
    `}
    padding: ${rhythm(0.8)} ${rhythm(1)};
    /* Adjust for the left border. */
    padding-left: calc(${rhythm(1)} + 0.2em);

    background: #ededed;
    border-left: 0.2em solid rgb(54, 89, 122);
  }

  & .gatsby-resp-image-figure {
    margin: 0 -${rhythm(2)} 0 -${rhythm(2)};
    ${media.phone`
      margin: 0 -${rhythm(0.8)} 0 -${rhythm(0.8)};
    `}
  }

  /**
   * Remove top padding from post if we're using a featured image at the top of
   * the post.

   * This is very hacky as, for some reason, the image thumbnails generated by
   * gatsby-remark-images are surrounded by two <p></p> tags with their own
   * margin-bottom, but no content. So here we add a negative top margin that's
   * equal to the sum of the top padding of the post and the bottom-margin of
   * the paragraph.
   *
   * Note that this css will only apply to the featured image, as in an element
   * of class gatsby-resp-image-figure that is the 2nd child of the post content
   * container. And it is the 2nd child due to the empty paragraph tag that
   * precedes it.
   */
  & .gatsby-resp-image-figure:nth-child(2) {
    margin-top: calc(-${rhythm(1.6)} - ${rhythm(0.8)});
    ${media.phone`
      margin-top: calc(-${rhythm(1.3)} - ${rhythm(0.6)});
    `}
  }

  & .gatsby-resp-image-figcaption {
    margin: ${rhythm(0.4)} ${rhythm(1.5)} 0 ${rhythm(1.5)};

    font-family: 'Raleway', 'sans-serif';
    font-size: 0.8rem;
    font-style: italic;
    text-align: center;
  }

  /**
   * Override some of the styling for inline code and code blocks.
   * Forces inline code to stay within its parent container using overflow-wrap.
   * Uses GitHub styling for inline code.
   * Ensures that code blocks are not doubly colored (once for <pre>, once for
   * <code>), and removes wrapping to allow for horizontal scrolling.
   * Uses gatsby-remark-prismjs's solution for proper line highlighting.
   * Sets maximum height for code blocks.
   **/
  & code[class*='language-'],
  & pre[class*='language-'] {
    font-family: 'Fira Mono', monospace;
    font-size: 0.75em;
  }

  & * :not(pre) > code[class*='language-'] {
    padding: 0.2em 0.4em;
    margin: 0;

    background: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    color: black;

    overflow-wrap: break-word;
    white-space: pre-wrap;

    ::selection {
      background: rgb(215, 216, 216);
    }
  }

  & .gatsby-highlight pre[class*='language-'],
  & .gatsby-highlight pre[class*='language-'] code[class*='language-'] {
    min-width: 100%;
    margin: 0;
    padding: 0;
    float: left;
    overflow: initial;

    font-size: 0.7rem;
    white-space: pre;
  }

  & .gatsby-highlight pre[class*='language-'] {
    padding: 1.3em ${rhythm(2)} 1.3em ${rhythm(2)};
    ${media.phone`
      padding: 0.8em ${rhythm(0.8)} 0.8em ${rhythm(0.8)};
    `}
  }

  & .gatsby-highlight {
    max-height: 400px;
    margin: 0 -${rhythm(2)} 1rem -${rhythm(2)};
    ${media.phone`
      margin-left: -${rhythm(0.8)};
      margin-right: -${rhythm(0.8)};
    `}
    overflow: auto;

    /* Solarized dark background color. */
    background: #002b36;

    *::selection {
      background: #0098bf;
      color: black;
    }
  }

  & .gatsby-highlight-code-line {
    display: block;

    box-sizing: border-box;
    margin-left: -${rhythm(2)};
    margin-right: -${rhythm(2)};
    ${media.phone`
      margin-left: -${rhythm(0.8)};
      margin-right: -${rhythm(0.8)};
    `}
    /* Adjust for the left border */
    padding-left: calc(${rhythm(2)} - 0.25em);
    padding-right: calc(${rhythm(2)} - 0.25em);
    ${media.phone`
      padding-left: calc(${rhythm(0.8)} - 0.25em);
      padding-right: calc(${rhythm(0.8)} - 0.25em);
    `}

    background: #003b4a;
    border-left: 0.25em solid #0098bf;
  }

  & video {
    width: 100%;

    margin: 0 auto ${rhythm(0.8)} auto;
    ${media.phone`
      margin-bottom ${rhythm(0.6)};
    `}
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;

const Content = (props) => {
  const inputProps = {};
  const { children, html } = props;
  if (html) {
    inputProps.dangerouslySetInnerHTML = { __html: html };
  }

  return <ContentContainer {...inputProps}>{children}</ContentContainer>;
};

Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  html: PropTypes.string,
};

Content.defaultProps = {
  children: undefined,
  html: undefined,
};

export default Content;
