const path = require("path");
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require(`gatsby-source-filesystem`);

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

  const templateComponent = getTemplateByType(node.frontmatter.type);
  let path = node.frontmatter.path;
  
  if(!path.startsWith('/')) {
    path = `/${path}`;
  }

  createPage({
    path,
    component: templateComponent,
    context: {}, // additional data can be passed via context
  });
}

function getTemplateByType(type) {
  switch(type) {
    case "product": 
      return productComponent;
    case "policy": 
      return policyComponent;
  }

  return null;
}


exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  
  // Ensures we are processing only markdown files
  if (node.internal.type !== "MarkdownRemark" || !node.frontmatter.sizes) return;

  node.frontmatter.sizes.forEach((value, index) => {
    console.log(`image_${value.size}`);
    createNodeField({
      node,
      name: `image_${value.size}`,
      value: `.${value.image}`,
    });
  })
}