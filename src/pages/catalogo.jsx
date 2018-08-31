import React from 'react';
import styled from 'styled-components';

import { device } from '../utilities/device';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em 5em;

  ${device.tablet} {
    padding: 2em;
  }

  ${device.mobile} {
    padding: 2em;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({theme}) => theme.color.black};
`;

function Catalogo () {
  return (
    <Layout>
      <PageTitle>Nuestros Productos</PageTitle>
    </Layout>
  )
}

export default Catalogo;