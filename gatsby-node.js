const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// Enable absolute imports from `src`.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

// Create a slug for every Markdown file.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const filePath = createFilePath({
      node,
      getNode,
      basePath: 'content',
      trailingSlash: false,
    });

    // Content is organised in a <date>_<title> format. This will strip the date from the slug.
    // Ensures that any underscores and text that follows them that are a part of the actual title
    // are not discarded.
    // E.g., 1970-01-01_under_scores_in_title => under_scores_in_title
    const dateSeparator = '_';
    const slug = filePath.substring(filePath.indexOf(dateSeparator) + dateSeparator.length);

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

// Programmatically create pages for Markdown content and the paginated list of
// content.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }

      const posts = result.data.allMarkdownRemark.edges;

      // Create list for paginated list of content.
      const postsPerPage = 5;
      const numPages = Math.ceil(posts.length / postsPerPage);
      const blogListComponentPath = path.resolve(`${__dirname}/src/templates/BlogList.jsx`);

      for (let i = 0; i < numPages; i += 1) {
        createPage({
          path: i === 0 ? '/' : `/pages/${i + 1}`,
          component: blogListComponentPath,
          context: {
            numPages,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
          },
        });
      }

      // Create blog post pages from Markdown content.
      const blogPostComponentPath = `${__dirname}/src/templates/BlogPost.jsx`;
      posts.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(blogPostComponentPath),
          context: {
            slug: node.fields.slug,
          },
        });
      });

      resolve();
    });
  });
};
