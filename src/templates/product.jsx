import React from 'react';

import ProductPickerContainer from '../components/Product';
import AppLayout from '../components/AppLayout';

function getCleanFragancesData(fragancesResult) {
  return fragancesResult.edges.map(({node}) => ({...node}));
}

function groupFragancesByFamily(fragances) {
  const families = {};

  fragances.forEach(fragance => {
    if(!!!families[fragance.family]) {
      families[fragance.family] = [];
    }
    console.log(families);

    families[fragance.family].push(fragance);
  });

  return families;
}

// Gets product and fragance data and passes it into the corresponding view
function ProductPickerTemplate({data}) {
  const { product, fragancesResults } = data;
  const fragances = getCleanFragancesData(fragancesResults);
  const groupedFragances = groupFragancesByFamily(fragances);
  
  return (
    <AppLayout>
      <ProductPickerContainer 
        data={{
          fragances: groupedFragances,
          product
        }}
      />
    </AppLayout>
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

