const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const policyTemplate = path.resolve(`src/templates/policy.jsx`);

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: policyTemplate,
        context: {}, // additional data can be passed via context
      });
    });
  });
};