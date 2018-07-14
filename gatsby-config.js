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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fragances`,
        path: `${__dirname}/content/fragances`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 400,
      }
    },
    `gatsby-transformer-remark`,
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify-cms',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ],
}
