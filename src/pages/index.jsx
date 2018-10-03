import React from 'react';
import { graphql } from 'gatsby';

import Home from '../components/Home';

function getRecommendedImageData(recommendedImages) {
  if (!recommendedImages || recommendedImages.edges.length === 0) return null;

  return recommendedImages.edges[0].node;
}

function getSlideshowImagesFromData(slideImages) {
  if (!slideImages || slideImages.edges.length === 0) return [];

  return slideImages.edges.map(({ node }) => {
    const { alt, id, path, image } = node;

    return {
      key: id,
      alt,
      path,
      src: image.sizes.src,
    };
  });
}

function getHighlightedContainers(containers) {
  if (!containers) return [];

  const listOfContainers = containers.edges.map(({ node: { category, colores } }) => {
    const filteredProducts = [];
    const { path } = category;

    colores.forEach(color => {
      if (!color.highlighted || !color.image) return;

      filteredProducts.push({
        key: color.id,
        imageSizes: color.image.sizes,
        colorName: color.colorName,
        path,
      });
    });
    return filteredProducts;
  });

  return listOfContainers.reduce(
    (accumulator, current) => [...accumulator, ...current],
    []
  );
}

function HomeContainer({ data }) {
  const {
    recommendedImages: recommendedResult,
    slideshowImages: slideshowImagesResult,
    allContainers: containerProductResults,
  } = data;
  const recommendedImage = getRecommendedImageData(recommendedResult);
  const slideshowImages = getSlideshowImagesFromData(slideshowImagesResult);
  const highlightedProducts = getHighlightedContainers(containerProductResults);

  return (
    <Home
      data={{
        recommendedImage,
        slideshowImages,
        highlightedProducts,
      }}
    />
  );
}

export default HomeContainer;

export const dataQuery = graphql`
  query HomeImages {
    recommendedImages: allContentfulImagen(
      filter: { usage: { eq: "Recomendados" } }
    ) {
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

    slideshowImages: allContentfulImagen(
      filter: { usage: { eq: "Slideshow" } }
    ) {
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

    allContainers: allContentfulRecipiente {
      edges {
        node {
          category {
            path
          }
          colores {
            id
            highlighted
            colorName
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
