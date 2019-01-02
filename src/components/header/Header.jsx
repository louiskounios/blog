import React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SizeMe } from 'react-sizeme';

import shuffle from 'utils/rand';
import Background from './Background';
import Nameplate from './Nameplate';

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 30vh;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;

  background-color: rgb(255, 255, 255);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.nameplateRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    this.nameplateRef.current.blur();
    navigate('/');
  }

  handleKeyPress(e) {
    const code = e.charCode || e.keyCode;
    if (code === 13 || code === 32) {
      this.handleClick();
    }
  }

  render() {
    return (
      <SizeMe monitorHeight>
        {({ size }) => {
          const { width, height } = size;
          const { author } = this.props;
          const palette = ['#31587a', '#36597a', '#1b4e7a', '#17334c', '#2d3a47'];

          return (
            <Container>
              <Background
                width={Math.ceil(width) || 1}
                height={Math.ceil(height) || 1}
                cell_size={Math.floor(Math.random() * 51) + 30}
                variance={Math.random() / 2 + 0.5}
                x_colors={shuffle(palette)}
                y_colors={shuffle(palette)}
              />

              <Nameplate
                onClick={this.handleClick}
                onKeyPress={this.handleKeyPress}
                ref={this.nameplateRef}
                role="link"
                tabIndex={0}
              >
                {author}
              </Nameplate>
            </Container>
          );
        }}
      </SizeMe>
    );
  }
}

Header.propTypes = {
  author: PropTypes.string.isRequired,
};

const query = graphql`
  query AuthorQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`;

export default () => (
  <StaticQuery query={query} render={data => <Header {...data.site.siteMetadata} />} />
);
