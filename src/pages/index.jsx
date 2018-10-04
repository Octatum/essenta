import React from 'react';
import { graphql } from 'gatsby';

import Home from '../components/Home';

function getHighlightedContainers(containers) {
  if (!containers) return [];

  const listOfContainers = containers.edges.map(
    ({ node: { category, colores, gender } }) => {
      const filteredProducts = [];
      const { path } = category;

      colores.forEach(color => {
        if (!color.highlighted || !color.image) return;

        filteredProducts.push({
          key: color.id,
          fluid: color.image.fluid,
          colorName: color.colorName,
          gender,
          path,
        });
      });
      return filteredProducts;
    }
  );

  return listOfContainers.reduce(
    (accumulator, current) => [...accumulator, ...current],
    []
  );
}

function HomeContainer({ data }) {
  const {
    recommendedImage,
    slideshowImagesResult,
    allContainers: containerProductResults,
  } = data;
  const slideshowImages = slideshowImagesResult.edges.map(({ node }) => ({
    ...node,
    key: node.id
  }));
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
    recommendedImage: contentfulImagen(usage: { eq: "Recomendaciones" }) {
      id
      alt
      path
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }

    slideshowImagesResult: allContentfulImagen(
      filter: { usage: { eq: "Slideshow" } }
    ) {
      edges {
        node {
          id
          alt
          path
          image {
            fluid {
              ...GatsbyContentfulFluid
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
          gender
          colores {
            id
            highlighted
            colorName
            image {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  }
`;
