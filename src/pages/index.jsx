import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Img from "gatsby-image";

import ConditionalLink from '../components/ConditionalLink';
import MostSold from '../components/home/MostSold';
import HomeHeader from '../components/home/HomeHeader';
import SlideshowLayout from '../components/home/SlideshowLayout';
import { device } from '../utilities/device';

const Layout = styled.div`
  color: ${props => props.theme.mainLightText};
  font-family: ${props => props.theme.fonts.main};
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  background: ${props => props.theme.background.main};
  padding-top: 1.5rem;
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
  overflow: hidden;
`;

function getRecommendedImageNode(recommendedImages) {
  if(!recommendedImages || recommendedImages.edges.length === 0) return null;

  return recommendedImages.edges[0].node;
}
function getSlideshowImagesFromData(slideImages) {
  if(!slideImages || slideImages.edges.length === 0) return [];

  return slideImages.edges.map(({node}) => {
    const {alt, id, path, image} = node;

    return {
      key: id,
      alt,
      path,
      src: image.sizes.src
    }
  });
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
    slideshowImages,
    categoriesWithHighlightedProducts
  } = data;
  const recommendedImageNode = getRecommendedImageNode(recommendedImages);
  const cleanSlideshowImages = getSlideshowImagesFromData(slideshowImages);
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
      <MostSold products={highlightedProducts} />
      <SlideshowLayout items={cleanSlideshowImages} />
      <SuggestedProducts>
        <HomeHeader>
          Recomendaciones
          <ViewMore to={recommendedImageNode.path}>ver más</ViewMore>
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
              ...GatsbyContentfulResolutions
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
          alt
          path
          image {
            sizes(maxWidth: 1300) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }

    slideshowImages: allContentfulImagenesEssenta(filter: {usage: {eq: "Slideshow"}}) {
      edges {
        node {
          id
          alt
          path
          image {
            sizes(maxWidth: 1300) {
              ...GatsbyContentfulSizes
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
                ...GatsbyContentfulSizes
              }
            } 
          }
        }
      }
    }
  }
`;