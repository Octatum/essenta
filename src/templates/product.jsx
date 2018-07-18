import React, { Component } from 'react';
import styled from 'styled-components';

import Breadcrumbs from './../components/Breadcrumbs';
import { Select } from '../components/Input';
import Button from './../components/Button/index';
import Img from 'gatsby-image';

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
  box-sizing: border-box;
  margin: 20% 0;
`;

const ProductInfo = styled.div`
  font-family: ${props => props.theme.fonts.main};
  box-sizing: border-box;
  width: 57%;
`;

const ProductTitle = styled.div`
  color: ${props => props.theme.color.black};
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

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fraganceIndex: 0,
      sizeIndex: 0,
      colorIndex: 0
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {target} = event;

    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    const { product, fragances } = this.props.data;
    const { colors } = product;

    return (
      <Layout>
        <Breadcrumbs />
        <ProductLayout>
          <ProductView>
            <Img 
              sizes={product.sizes[this.state.sizeIndex].image.sizes} 
              imgStyle={{top: '50%', transform: 'translateY(-50%)'}}
            />
          </ProductView>
          <ProductInfo>
            <ProductTitle>Arma tu {product.title}</ProductTitle>
            <ProductPrice>${product.sizes[this.state.sizeIndex].sizePrice}</ProductPrice>
            <ProductPickerLabel>
              <Select 
                onChange={this.handleChange} 
                orange 
                required 
                name="fraganceIndex" 
                value={this.state.fraganceIndex}
              >
                {fragances.edges.map(({node: {name}}, index) => (
                  <option key={name} value={index}>{name}</option>
                ))}
              </Select>
              <span>Fragancia</span>
            </ProductPickerLabel>
            <ProductPickerLabel>
              <Select 
                onChange={this.handleChange} 
                orange 
                required 
                name="sizeIndex" 
                value={this.state.sizeIndex}
              >
                {product.sizes.map(({sizeName}, index) => (
                  <option key={sizeName} value={index}>{sizeName}</option>
                ))}
              </Select>
              <span>Tamaño</span>
            </ProductPickerLabel>
            <ProductPickerLabel>
              <Select 
                onChange={this.handleChange} 
                orange 
                required 
                name="colorIndex" 
                value={this.state.colorIndex}
              >
                {colors.map((name, index) => (
                  <option key={name} value={index}>{name}</option>
                ))}
              </Select>
              <span>Color</span>
            </ProductPickerLabel>
            <Button style={{fontSize: '0.9rem', borderRadius: '0'}}>Añadir al carrito</Button>
          </ProductInfo>
        </ProductLayout>
      </Layout>
    );
  }
}

export default Product;

export const dataQuery = graphql`
  query ProductByPath($path: String!) {
    product: contentfulProductosEssenta (path: { eq: $path }) {
      title
      path
      sizes {
        sizeName
        sizePrice
        image {
          sizes(maxWidth: 400) {
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
      colors
    }

    fragances: allContentfulFragancias {
      edges {
        node {
          name
        }
      }
    }

    siteTitle: site {
      siteMetadata {
        title
      }
    }
  }
`;

