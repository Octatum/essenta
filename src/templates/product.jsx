import React, { Component } from 'react';
import styled from 'styled-components';
import GatsbyImg from 'gatsby-image';
import { inject } from 'mobx-react';

import Breadcrumbs from './../components/Breadcrumbs';
import { Select } from '../components/Input';
import Button from './../components/Button/index';
import { device } from '../utilities/device';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductLayout = styled.div`
  display: flex;
  width: 80%;
  min-height: 35em;
  justify-content: space-between;
  align-items: center;

  ${device.tablet} {
    flex-direction: column;
    margin-bottom: 3em;
  }
`;

const ProductView = styled.div`
  flex: 4;
  min-width: 400px;
`;

const ProductInfo = styled.div`
  font-family: ${props => props.theme.fonts.main};
  box-sizing: border-box;
  flex: 6;
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

const Img = styled(GatsbyImg)`
  width: 100%;
  max-width: 400px;
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

  addProduct = (product) => {
    this.props.cartStore.addProduct(product);
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
            <Button
              style={{fontSize: '0.9rem', borderRadius: '0'}}
              onClick={() => this.addProduct({
                productId: product.id,
                color: colors[this.state.colorIndex],
                size: product.sizes[this.state.sizeIndex].sizeName,
                sizeId: product.sizes[this.state.sizeIndex].id,
                fragance: fragances.edges[this.state.fraganceIndex].node.name,
                name: product.title,
                price: product.sizes[this.state.sizeIndex].sizePrice,
                thumbnail: product.sizes[this.state.sizeIndex].image.thumbnail.src
              })}
            >
              Añadir al carrito
            </Button>
          </ProductInfo>
        </ProductLayout>
      </Layout>
    );
  }
}

export default inject("cartStore")(Product);

export const dataQuery = graphql`
  query ProductByPath($path: String!) {
    product: contentfulProductosEssenta (path: { eq: $path }) {
      id
      title
      path
      sizes {
        id
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
          thumbnail: resize(width: 160, height: 160) {
            src
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

