import React from 'react';

import Home from '../components/Home'

function getRecommendedImageData(recommendedImages) {
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
    const filteredProducts = [];
    sizes.forEach(({colores}) => {
      colores.forEach((color) => {
        if(!color.highlighted || !color.image) return;

        filteredProducts.push({
          key: color.id,
          imageSizes: color.image.sizes,
          colorName: color.colorName,
          path
        });
      })
    })
    return filteredProducts;
  });

  return listOfProducts.reduce((accumulator, current) => [...accumulator, ...current], []);
}

function HomeContainer({data}) {
  const { 
    recommendedImages: recommendedResult,
    slideshowImages: slideshowImagesResult,
    categoriesWithHighlightedProducts: highlightedProductsResult
  } = data;
  const recommendedImage = getRecommendedImageData(recommendedResult);
  const slideshowImages = getSlideshowImagesFromData(slideshowImagesResult);
  const highlightedProducts = getHighlightedProductsFromCategories(highlightedProductsResult);

  return <Home data={{
    recommendedImage,
    slideshowImages,
    highlightedProducts
  }} />
}

export default HomeContainer;

export const dataQuery = graphql`
  query HomeImages {
    recommendedImages: allContentfulImagenGeneral (
      filter: {usage: {eq: "Recomendados"}}
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
  
    slideshowImages: allContentfulImagenGeneral(
      filter: {usage: {eq: "Slideshow"}}
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
  
    categoriesWithHighlightedProducts: allContentfulProducto {
      edges {
        node {
          path
          sizes {
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
  }
`;