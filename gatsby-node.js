const path = require('path');

const policyComponent = path.resolve(`src/templates/policy.jsx`);

const getAllFilesQuery = `
  query GetAllContentFiles {
    policies: allContentfulPolitica {
      edges {
        node {
          path
        } 
      }
    }
  }
`;

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(getAllFilesQuery).then(result => {
    if (result.errors) {
      return reject(result.errors);
    }

    result.data.policies.edges.forEach(({ node }) =>
      createCustomPage(node, createPage, '/politica', policyComponent, {})
    );
  });
};

function createCustomPage({ path }, createPage, prefix, component, context) {
  const oldPath = path;
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  createPage({
    path: `${prefix}${path}`,
    component,
    context: {
      ...context,
      route: oldPath,
    },
  });
}
