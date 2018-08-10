import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import CartStore from '../stores/CartStore'
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
    name: node.title,
    path: node.path,
  }));

  return data;
}

const cartStore = new CartStore();

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
        />
        <Provider cartStore={cartStore}>
          <div>
            <Navbar urls={productsUrls}/>
            {children()}
            <DevTools />
          </div>
        </Provider>
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
    
    productEdges: allContentfulProductosEssenta {
      edges {
        node {
          title
          path
        }
      }
    }
  }
`;