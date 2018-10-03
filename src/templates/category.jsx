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
  const { product, fragancesResults } = data;
  const fragances = getCleanFragancesData(fragancesResults);
  const groupedFragances = groupFragancesByFamily(fragances);

  return (
    <AppLayout>
      <ProductPickerContainer
        data={{
          fragances: groupedFragances,
          product,
        }}
      />
    </AppLayout>
  );
}

export default ProductPickerTemplate;

export const pageQuery = graphql`
  query CategoryByPath($route: String!) {
    containers: allContentfulRecipiente(
      filter: {category: {path: {eq: $route}}}
    ) {
      edges {
        node {
          category {
            path
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
