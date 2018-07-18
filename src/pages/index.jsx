import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Img from "gatsby-image";

import ConditionalLink from '../components/ConditionalLink';
import MostSold from './home/MostSold';
import HomeHeader from './home/HomeHeader';
import SlideshowLayout from './home/SlideshowLayout';

const Layout = styled.div`
  color: ${props => props.theme.mainLightText};
  font-family: ${props => props.theme.fonts.main};
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  background: ${props => props.theme.background.main};
  padding-top: 1.5rem;
`;

const AboutUsBanner = styled.div`
  background: chocolate;
  text-transform: uppercase;
  color: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: calc(100% - 4em);
  font-size: 2.7rem;
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: bold;
  min-height: 12rem;
  height: 27vh;
  padding: 1em 2em;
`;


const ViewMore = styled(Link)`
  color: ${props => props.theme.color.orange};
  font-size: 0.5em;
  letter-spacing: 0em;
  padding-left: 0.5em;
  text-decoration: none;
`;

const SuggestedProducts = styled.div`
  margin: 5rem 0;
`;

const SuggestedProductsImage = styled.div`
  height: 36rem;
`;

function getRecommendedImageNode(recommendedImages) {
  if(!recommendedImages || recommendedImages.edges.length === 0) return null;

  return recommendedImages.edges[0].node;
}

function getHighlightedProductsFromCategories(categories) {
  if (!categories) return [];

  const listOfProducts = categories.edges.map(({node: {path, sizes}}) => {
    const filteredSizes = sizes.filter(s => s.highlight);

    return filteredSizes.map(size => ({
      key: size.id,
      path,
      name: size.sizeName,
      imageSizes: size.image.sizes,
    }));
  });

  return listOfProducts.reduce((accumulator, current) => [...accumulator, ...current], []);
}

function Home({data}) {
  const { 
    allEssentaProducts, 
    recommendedImages, 
    categoriesWithHighlightedProducts 
  } = data;
  const recommendedImageNode = getRecommendedImageNode(recommendedImages);
  const highlightedProducts = getHighlightedProductsFromCategories(categoriesWithHighlightedProducts);
  const imgStyle = {
    width: 'auto', 
    height: '36rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0
  }

  return (
    <Layout>
      <MostSold products={highlightedProducts}/>
      <SlideshowLayout items={null}/>
      <SuggestedProducts>
        <HomeHeader>
          Recomendaciones
          <ViewMore to="/">ver más</ViewMore>
        </HomeHeader>
        <SuggestedProductsImage>
          <ConditionalLink to={recommendedImageNode.path} condition={recommendedImageNode.path && recommendedImageNode.path.length > 0}>
            <Img sizes={recommendedImageNode.image.sizes} imgStyle={imgStyle} position='absolute' />
          </ConditionalLink>
        </SuggestedProductsImage>
      </SuggestedProducts>
    </Layout>
  );
}

export default Home;

export const dataQuery = graphql`
  query HomeImages {
    allEssentaProducts: allContentfulProductosEssenta {
      edges {
        node {
          path
          sizes {
            highlight
            image {
              resolutions (width: 100) {
                src
              }
            }
          }
        }
      }
    }

    fragances: allFile(filter: {sourceInstanceName: {eq: "fragances"}}) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              label
            } 
          }
        }
      }
    }

    recommendedImages: allContentfulImagenesEssenta(filter: {usage: {eq: "Recomendados"}}) {
      edges {
        node {
          id
          usage
          alt
          path
          image{
            sizes(maxWidth: 1300) {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }

    categoriesWithHighlightedProducts: allContentfulProductosEssenta(filter: { sizes: { highlight: {eq: true}}} ) {
      edges {
        node {
          path
          sizes {
            id
            sizeName
            highlight
            image {
              sizes(maxWidth: 300) {
                base64
                tracedSVG
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            } 
          }
        }
      }
    }
  }
`;