import React from 'react';
import styled from 'styled-components';
import Img from "gatsby-image";

import Breadcrumbs from './../components/Breadcrumbs';
import { Select } from '../components/Input';
import Button from './../components/Button/index';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductLayout = styled.div`
  display: flex;
  width: 70rem;
  height: 45rem;
  justify-content: space-between;
  align-items: center;
`;

const ProductView = styled.div`
  width: 35%;
  height: 100%;
  background: black;
  opacity: 0.2;
`;

const ProductInfo = styled.div`
  font-family: ${props => props.theme.fonts.main};
  box-sizing: border-box;
  width: 57%;
`;

const ProductTitle = styled.div`
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 700;
`;

const ProductPrice = styled.div`
  font-size: 1.6rem;
`;

const ProductDescription = styled.div`
  font-size: 1.5rem;
  margin: 2rem 0;
`;

const ProductPickerLabel = styled.label`
  display: flex;
  width: 60%;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${props => props.theme.color.black};
  margin: 2rem 0;

  ${Select} {
    border: 1px solid transparent;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.5em 1em;
    width: 9rem;

    option {
      background: white;
      font-weight: 700;
    }
  }

  span {
    padding-top: 0.5em;
    box-sizing: border-box;
    text-align: center;
    flex: 1;
    align-items: center;
    vertical-align: middle;
  }
`;

function getFragancesDataFromEdges(edges) {
  return edges.map(({node}) => ({
    title: node.childMarkdownRemark.frontmatter.title,
    label: node.childMarkdownRemark.frontmatter.label
  }));
}

function Product({data}) {
  const { markdownRemark, fragances } = data;
  const { frontmatter } = markdownRemark;
  const fragancesData = getFragancesDataFromEdges(fragances.edges);

  return (
    <Layout>
      <Breadcrumbs />
      <ProductLayout>
        <ProductView><img src={markdownRemark.frontmatter.sizes[1].image} /></ProductView>
        <ProductInfo>
          <ProductTitle>Sexy Lady</ProductTitle>
          <ProductPrice>$60.00</ProductPrice>
          <ProductDescription>Lorem ipsum dolor sit amet.</ProductDescription>
          <ProductPickerLabel>
            <Select orange required>
              {fragancesData.map(({title, label}) => (
                <option>{label}</option>
              ))}
            </Select>
            <span>Fragancia</span>
          </ProductPickerLabel>
          <ProductPickerLabel>
            <Select orange required>
              {frontmatter.sizes.map(({size}) => (
                <option>
                  {size}
                </option>
              ))}
            </Select>
            <span>Tamaño</span>
          </ProductPickerLabel>
          <ProductPickerLabel>
            <Select orange required>
              <option>Rojo</option>
              <option>Verde</option>
              <option>Azul</option>
            </Select>
            <span>Color</span>
          </ProductPickerLabel>
          <Button style={{fontSize: '0.9rem', borderRadius: '0'}}>Añadir al carrito</Button>
        </ProductInfo>
      </ProductLayout>
      
    </Layout>
  );
}

export default Product;

export const dataQuery = graphql`
  query ProductByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        sizes {
          image
          price
          size
        }
        colors {
          name
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
  }
`;

