module.exports = {
  siteMetadata: {
    title: 'Essenta',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    'gatsby-plugin-react-next',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/content/products`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `policies`,
        path: `${__dirname}/content/policies`,
      },
    },
    `gatsby-transformer-remark`,
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify-cms'
  ],
}
