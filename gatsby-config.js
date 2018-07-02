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
        name: `markdown-pages`,
        path: `${__dirname}/src/pages/markdown`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
