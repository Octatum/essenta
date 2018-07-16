module.exports = {
  siteMetadata: {
    title: 'Essenta',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    'gatsby-plugin-react-next',
    'gatsby-plugin-netlify-cms',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/content/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/static/content/products`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `policies`,
        path: `${__dirname}/static/content/policies`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fragances`,
        path: `${__dirname}/static/content/fragances`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
            }
          },
        ]
      }
    },
    'gatsby-plugin-styled-components',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ],
}
