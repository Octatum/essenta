import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

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
  position: relative;

  ::after {
    content: "";
    display: block;
    margin: 0.1em 0;
    height: 2px;
    background-color: ${({theme}) => theme.color.orange};
  }

  ${device.tablet} {
    font-size: 2em;
  }
`;

const ProductLink = styled(Link)`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({theme}) => theme.color.black};
  font-size: 1.5em;
  font-weight: 700;
  text-align: center;
  margin: 0.5em 0;
`;

const PrductListDisplay = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  display: grid;
  grid-gap: 5vw;
  grid-auto-rows: auto;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  margin: 3em 0;

  ${device.laptop} {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  ${device.tablet} {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  ${device.mobile} {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
`;

function Catalogo ({
  data: { productResults }
}) {
  const allProducts = productResults.edges.map(({node}) => ({...node}));

  return (
    <Layout>
      <PageTitle>Nuestros Productos</PageTitle>
      <PrductListDisplay>
        {allProducts.map(product => (
          <ProductLink
            key={product.id}
            to={`/producto${product.path}`}
          >
            Diseña tu {product.title}
          </ProductLink>
        ))}
      </PrductListDisplay>
    </Layout>
  )
}

export default Catalogo;

export const query = graphql`
  query AllProducts {
    productResults: allContentfulProducto {
      edges {
        node {
          id
          title
          path
        }
      }
    } 
  }
`;