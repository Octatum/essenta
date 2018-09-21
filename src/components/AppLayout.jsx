import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import { StaticQuery, graphql } from "gatsby";

import CartStore from '../stores/CartStore'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { globalTheme } from '../utilities/themes';
import './assets/index.css';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: ${props => props.theme.color.gray};
`;

function getProductsUrlsFromEdges(edges) {
  const data = edges.map(({node}) => ({
    name: node.title,
    path: node.path,
  }));

  return data;
}

const cartStore = new CartStore();

const AppLayout = ({ children }) => {

  return (
    <StaticQuery 
      query={graphql`
        query PageData {
          siteTitle: site {
            siteMetadata {
              title
            }
          }
          
          productEdges: allContentfulProducto {
            edges {
              node {
                title
                path
              }
            }
          }
        }
      `}
      render={data => {
        const productsUrls = getProductsUrlsFromEdges(data.productEdges.edges);

        return (
          <ThemeProvider theme={globalTheme}>
            <Layout>
              <Helmet
                title={data.siteTitle.siteMetadata.title}
                meta={[
                  { name: 'description', content: 'Sample' },
                  { name: 'keywords', content: 'sample, something' },
                ]}
                link={[{
                  rel:"stylesheet",
                  href:"https://use.fontawesome.com/releases/v5.1.0/css/all.css", 
                  integrity:"sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt", 
                  crossorigin:"anonymous"
                }, {
                  rel: "shortcut icon",
                  href: "/favicon.ico",
                  type: "image/x-icon"
                }, {
                  rel: "icon",
                  href: "/favicon.ico",
                  type: "image/x-icon"
                }]}
              />
              <html lang="es" />
              <Provider cartStore={cartStore}>
                <div>
                  <Navbar urls={productsUrls}/>
                  {children}
                </div>
              </Provider>
              <Footer />
            </Layout>
          </ThemeProvider>
        )
      }}
    />
    
  );
}

AppLayout.propTypes = {
  children: PropTypes.func,
};

export default AppLayout;