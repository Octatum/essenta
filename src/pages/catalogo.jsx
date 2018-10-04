import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';

import { device } from '../utilities/device';
import GatsbyImg from 'gatsby-image';
import AppLayout from './../components/AppLayout';

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
  color: ${({ theme }) => theme.color.black};
  position: relative;

  ::after {
    content: '';
    display: block;
    margin: 0.1em 0;
    height: 2px;
    background-color: ${({ theme }) => theme.color.orange};
  }

  ${device.tablet} {
    font-size: 2em;
  }
`;

const ProductLink = styled(Link)`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({ theme }) => theme.color.black};
  font-weight: 700;
  text-align: center;
  margin: 0.5em 0;
  flex: 1;

  @supports not (display: grid) {
    min-width: 33%
    max-width: 33%
    box-sizing: border-box;
  }
`;

const ProductCardName = styled.div`
  font-size: 1.5em;
`;

const PrductListDisplay = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  display: grid;
  grid-gap: 5vw;
  grid-auto-rows: auto;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
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

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductCardBannerDiv = styled.div`
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductCardBanner = styled(GatsbyImg)`
  --size: 15em;
  width: var(--size);
  height: var(--size);
`;

function Catalogo({ data: { productResults } }) {
  const allProducts = productResults.edges.map(({ node }) => ({ ...node }));

  return (
    <AppLayout>
      <Layout>
        <PageTitle>Nuestros Productos</PageTitle>
        <PrductListDisplay>
          {allProducts.map(product => (
            <ProductLink
              key={product.id}
              to={`/producto${product.path}/general`}
              width={400}
              height={400}
            >
              <ProductCard>
                <ProductCardBannerDiv>
                  <ProductCardBanner sizes={product.image.sizes} />
                </ProductCardBannerDiv>
                <ProductCardName>Diseña tu {product.title}</ProductCardName>
              </ProductCard>
            </ProductLink>
          ))}
        </PrductListDisplay>
      </Layout>
    </AppLayout>
  );
}

export default Catalogo;

export const query = graphql`
  query AllProducts {
    productResults: allContentfulCategoria {
      edges {
        node {
          id
          title
          path
          image {
            sizes {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
  }
`;
