import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { globalTheme } from './themes';
import './index.css';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: ${props => props.theme.color.gray};
`;

function getProductsUrlsFromEdges(edges) {
  const data = edges.map(({node}) => ({
    name: node.childMarkdownRemark.frontmatter.title,
    path: node.childMarkdownRemark.frontmatter.path,
  }));

  return data;
}

function netlifyIdentiy () {
  if (typeof window !== 'undefined' && window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    })
  }

  return "";
}

const Layout = ({ children, data }) => {
  const productsUrls = getProductsUrlsFromEdges(data.productEdges.edges);

  return (
    <ThemeProvider theme={globalTheme}>
      <AppLayout>
        <Helmet
          title={data.siteTitle.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          link={[
            {
              rel:"stylesheet",
              href:"https://use.fontawesome.com/releases/v5.1.0/css/all.css", 
              integrity:"sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt", 
              crossorigin:"anonymous"
            }
          ]}
          script={[
            {
              src:"https://identity.netlify.com/v1/netlify-identity-widget.js"
            }
          ]}
        />
        <Navbar urls={productsUrls}/>
        <div>
          {children()}
        </div>
        {netlifyIdentiy()}
        <Footer />
      </AppLayout>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query PageData {
    siteTitle: site {
      siteMetadata {
        title
      }
    }
    
    productEdges: allFile(filter: {sourceInstanceName: {eq: "products"}}){
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  }
`;