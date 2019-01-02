module.exports = {
  siteMetadata: {
    author: 'Loizos Kounios',
    copyright: '2019',
    description: 'Blog of Software Engineer, Loizos Kounios',
    repository: 'https://github.com/loizoskounios/blog',
    title: 'Blog | Loizos Kounios',
    titleTemplate: '%s | Blog | Loizos Kounios',
    url: 'https://cergos.io',
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
              maxWidth: 800,
              showCaptions: true,
              quality: 100,
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
    'gatsby-plugin-offline', // Must be loaded after `gatsby-plugin-manifest`
  ],
};
