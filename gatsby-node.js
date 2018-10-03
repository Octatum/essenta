const path = require("path");

const productComponent = path.resolve('src/templates/category.jsx');
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

    categories: allContentfulCategoria {
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
      return Promise.reject(result.errors);
    }

    result.data.policies.edges.forEach(({node}) => createCustomPage(node, createPage, '/politica', policyComponent, {}));
    result.data.categories.edges.forEach(({node}) => createCategoryPage(node, createPage, '/producto', productComponent, {}));
  });
};

function createCategoryPage({ path }, createPage, prefix, component, context) {
  const oldPath = path;
  if(!path.startsWith('/')) {
    path = `/${path}`;
  }

  createPage({
    path: `${prefix}${path}`,
    matchPath: `${prefix}${path}/*`,
    component,
    context: {
      ...context,
      route: oldPath
    }
  })
}

function createCustomPage({ path }, createPage, prefix, component, context) {
  const oldPath = path;
  if(!path.startsWith('/')) {
    path = `/${path}`;
  }

  createPage({
    path: `${prefix}${path}`, 
    component,
    context: {
      ...context,
      route: oldPath
    }
  })
}