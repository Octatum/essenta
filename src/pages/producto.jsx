import React from 'react';
import { graphql } from 'gatsby';

import ProductPickerContainer from '../components/Product';
import AppLayout from '../components/AppLayout';

function getCleanFragancesData(fragancesResult) {
  return fragancesResult.edges.map(({ node }) => ({ ...node }));
}

function groupFragancesByFamily(fragances) {
  const families = {};

  fragances.forEach(fragance => {
    if (!!!families[fragance.family]) {
      families[fragance.family] = [];
    }

    families[fragance.family].push(fragance);
  });

  return families;
}

// Gets product and fragance data and passes it into the corresponding view
function ProductPickerTemplate({ data }) {
  const { containers, fragancesResults } = data;
  const fragances = getCleanFragancesData(fragancesResults);
  const groupedFragances = groupFragancesByFamily(fragances);
  const cleanContainersData = containers.edges.map(({ node }) => ({ ...node }));

  return (
    <AppLayout>
      <ProductPickerContainer
        data={{
          fragances: groupedFragances,
          containers: cleanContainersData,
        }}
      />
    </AppLayout>
  );
}

export default ProductPickerTemplate;

export const pageQuery = graphql`
  query AllProductsAndFragances {
    containers: allContentfulRecipiente {
      edges {
        node {
          id
          label
          gender
          category {
            path
            title
          }
          colores {
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

    fragancesResults: allContentfulFragancia {
      edges {
        node {
          id
          displayName
          objectiveGender
          family
          image {
            fluid {
              ...GatsbyContentfulFluid
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
