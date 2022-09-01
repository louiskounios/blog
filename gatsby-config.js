module.exports = {
  siteMetadata: {
    author: 'Loizos Kounios',
    commentsRepository: 'louiskounios/blog-comments-tracker',
    copyright: '2019–2022',
    description: 'Blog of Software Engineer, Loizos Kounios',
    googleSiteVerificationCode: 'qE1qvfEFHJDkbM1_v1oO_c1HWRf_owWzmF6KfwizcOc',
    repository: 'https://github.com/louiskounios/blog',
    siteUrl: 'https://cergos.io',
    title: 'Blog | Loizos Kounios',
    titleTemplate: '%s | Blog | Loizos Kounios',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        omitGoogleFont: true,
        pathToConfigModule: 'src/styling/typography',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-smartypants',
          'gatsby-remark-external-links',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs', // Must be loaded after `gatsby-remark-autolink-headers`
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'files',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
              linkImagesToOriginal: true,
              maxWidth: 780,
              showCaptions: true,
              markdownCaptions: true,
              quality: 50,
              withWebp: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Loizos Kounios – Blog',
        short_name: 'LKounios',
        start_url: '/?app=1',
        background_color: '#36597a',
        theme_color: '#36597a',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap', // Must be loaded after `gatsby-plugin-manifest`.
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
        serialize: ({ site, allSitePage }) => allSitePage.edges.map(edge => ({
          url: `${site.siteMetadata.siteUrl}${edge.node.path}`,
          changefreq: 'daily',
          priority: 0.7,
        })),
      },
    },
  ],
};
