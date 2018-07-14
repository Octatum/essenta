const path = require("path");
const fs = require('fs');
const { 
  GraphQLInt,
  GraphQLString
} = require('graphql/type');
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