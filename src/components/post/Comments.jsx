import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';

import media from 'styling/media';
import { rhythm } from 'styling/typography';

const CommentsWrapper = styled.div`
  width: 100%;
  margin-top: ${rhythm(1)};
  padding: ${rhythm(0.6)} ${rhythm(1)};
  ${media.phone`
    padding: ${rhythm(0.3)} ${rhythm(0.5)};
  `}
  z-index: 3;

  border-top: 1px solid rgba(0, 0, 0, 0.5);
`;

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.commentsEl = React.createRef();
    this.state = { status: 'pending' };
  }

  componentDidMount() {
    const { commentsRepository } = this.props;

    /* https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx */
    const scriptEl = document.createElement('script');
    scriptEl.onload = () => this.setState({ status: 'success' });
    scriptEl.onerror = () => this.setState({ status: 'failed' });
    scriptEl.async = true;
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.setAttribute('repo', commentsRepository);
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('theme', 'github-light');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    this.commentsEl.current.appendChild(scriptEl);
  }

  render() {
    const { status } = this.state;

    return (
      <CommentsWrapper>
        {status === 'failed' && <div>Was unable to load comments. Please try again.</div>}
        {status === 'pending' && <div>Loading script...</div>}
        <div ref={this.commentsEl} />
      </CommentsWrapper>
    );
  }
}

Comments.propTypes = {
  commentsRepository: PropTypes.string.isRequired,
};

const query = graphql`
  query CommentsRepositoryQuery {
    site {
      siteMetadata {
        commentsRepository
      }
    }
  }
`;

export default () => (
  <StaticQuery query={query} render={data => <Comments {...data.site.siteMetadata} />} />
);
