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

const Layout = ({ children, data }) => (
  <ThemeProvider theme={globalTheme}>
    <AppLayout>
      <Helmet
        title={data.site.siteMetadata.title}
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
      <Navbar />
      <div>
        {children()}
      </div>
      {() => {
        if (window.netlifyIdentity) {
          window.netlifyIdentity.on("init", user => {
            if (!user) {
              window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
              });
            }
          })
        }
      }}
      <Footer />
    </AppLayout>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;