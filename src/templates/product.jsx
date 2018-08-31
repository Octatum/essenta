import React from 'react';

import ProductPickerContainer from '../components/Product';

function getCleanFragancesData(fragancesResult) {
  return fragancesResult.edges.map(({node}) => ({...node}));
}

// Gets product and fragance data and passes it into the corresponding view
function ProductPickerTemplate({data}) {
  const { product, fragancesResults } = data;
  const fragances = getCleanFragancesData(fragancesResults);
  
  return (
    <ProductPickerContainer 
      data={{
        fragances,
        product
      }}
    />
  );
}

export default ProductPickerTemplate;

export const dataQuery = graphql`
  query ProductByPath($route: String!) {
    product: contentfulProducto (path: { eq: $route }) {
      title
      sizes {
        id
        label
        sizePrice
        colores {
          id
          colorName
          image {
            sizes	(maxWidth: 500) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }

    fragancesResults: allContentfulFragancia {
      edges {
        node {
          id
          displayName
          gender
          family
          image {
            sizes {
              ...GatsbyContentfulSizes
            }
          }
          suggestions {
            suggestions
          }
          description {
            description
          }
        }
      }
    }
  }
`;

