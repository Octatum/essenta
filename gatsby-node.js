const path = require("path");

const productComponent = path.resolve('src/templates/product.jsx');
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

    products: allContentfulProducto {
      edges {
        node {
          path
        }
      }
    }
  }
`;

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(getAllFilesQuery).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.policies.edges.forEach(({node}) => createCustomPage(node, createPage, '/politica', policyComponent, {}));
    result.data.products.edges.forEach(({node}) => createCustomPage(node, createPage, '/producto', productComponent, {}));
  });
};


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