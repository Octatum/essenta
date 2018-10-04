module.exports = {
  siteMetadata: {
    title: 'Essenta',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `iu9dhhqwkpjj`,
        accessToken: `b5b7e74f5a59301ba0ff99bdbe83c448504d915237ae6c2cfc948db341339fc0`,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/producto/*`] },
    },
    'gatsby-plugin-styled-components',
  ],
};
