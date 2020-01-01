import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

class SearchEngineOptimization extends React.Component {
  constructor(props) {
    super(props);

    const {
      author,
      defaultAuthor,
      description,
      defaultDescription,
      title,
      siteUrl,
      slug,
    } = this.props;

    this.seo = {
      author: author || defaultAuthor,
      description: description || defaultDescription,
      title: title || undefined,
      url: `${siteUrl}${slug || ''}`,
    };
  }

  render() {
    const {
      article,
      defaultTitle,
      googleSiteVerificationCode,
      siteUrl,
      titleTemplate,
    } = this.props;

    return (
      <React.Fragment>
        <Helmet
          defaultTitle={defaultTitle}
          title={this.seo.title}
          titleTemplate={titleTemplate}
        >
          <meta name="google-site-verification" content={googleSiteVerificationCode} />

          <meta name="author" content={this.seo.author} />
          <meta name="description" content={this.seo.description} />

          {this.seo.description
            && <meta property="og:description" content={this.seo.description} />
          }
          {siteUrl && <meta property="og:site_name" content={siteUrl} />}
          {this.seo.title
            ? <meta property="og:title" content={`${this.seo.title} | ${defaultTitle}`} />
            : <meta property="og:title" content={defaultTitle} />
          }
          {article && <meta property="og:type" content="article" />}
          {this.seo.url && <meta property="og:url" content={this.seo.url} />}
        </Helmet>
      </React.Fragment>
    );
  }
}

SearchEngineOptimization.propTypes = {
  article: PropTypes.bool,
  author: PropTypes.string,
  defaultAuthor: PropTypes.string.isRequired,
  description: PropTypes.string,
  defaultDescription: PropTypes.string.isRequired,
  googleSiteVerificationCode: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
  slug: PropTypes.string,
  title: PropTypes.string,
  defaultTitle: PropTypes.string.isRequired,
  titleTemplate: PropTypes.string.isRequired,
};

SearchEngineOptimization.defaultProps = {
  article: false,
  author: undefined,
  description: undefined,
  slug: undefined,
  title: undefined,
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultAuthor: author
        defaultDescription: description
        defaultTitle: title
        siteUrl
        googleSiteVerificationCode
        titleTemplate
      }
    }
  }
`;

export default props => (
  <StaticQuery
    query={query}
    render={data => <SearchEngineOptimization {...data.site.siteMetadata} {...props} />}
  />
);
