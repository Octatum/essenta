module.exports = {
  siteMetadata: {
    title: 'Essenta',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    'gatsby-plugin-react-next',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `iu9dhhqwkpjj`,
        accessToken: `b5b7e74f5a59301ba0ff99bdbe83c448504d915237ae6c2cfc948db341339fc0`,
      },
    },
    'gatsby-plugin-styled-components',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ],
}
