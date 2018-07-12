const path = require("path");

const policyTemplate = path.resolve(`src/templates/policy.jsx`);
const productTemplate = path.resolve('src/template/product.jsx');

const getAllFilesQuery = `
query GetAllContentFiles {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
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

  createPage({
    path: node.frontmatter.path,
    component: getTemplateByPath(node.frontmatter.path),
    context: {}, // additional data can be passed via context
  });
}

function getTemplateByPath(path) {
  return policyTemplate;
}