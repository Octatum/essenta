const path = require("path");

const productComponent = path.resolve('src/templates/product.jsx');
const policyComponent = path.resolve(`src/templates/policy.jsx`);

const getAllFilesQuery = `
  query GetAllContentFiles {
    allMarkdownRemark(filter: {frontmatter: {type: {regex: "/policy|product/"}}}) {
      edges {
        node {
          frontmatter {
            type
            path
          }
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

    result.data.allMarkdownRemark.edges.forEach(({node}) => createMarkdownPage(node, createPage));
  });
};

function createMarkdownPage(node, createPage) {
  if(!node.frontmatter.path) return;

  const templateComponent = getTemplateByType(node.frontmatter);

  createPage({
    path: node.frontmatter.path,
    component: templateComponent,
    context: {}, // additional data can be passed via context
  });
}

function getTemplateByType({type, path}) {
  switch(type) {
    case "product": 
      return productComponent;
    case "policy": 
      return policyComponent;
  }

  return null;
}