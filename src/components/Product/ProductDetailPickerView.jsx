import React, { Component } from 'react';
import styled from 'styled-components';
import GatsbyImg from 'gatsby-image';

import { Select } from '../Input';
import Button from '../Button/index';
import { device } from '../../utilities/device';

const ProductLayout = styled.div`
  display: flex;
  width: 80%;
  min-height: 35em;
  align-self: center;
  justify-content: space-between;
  align-items: center;

  ${device.tablet} {
    flex-direction: column;
    margin-bottom: 3em;
  }
`;

const ProductImage = styled.div`
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

class ProductDetailPickerView extends Component {
  initialState = {
    currentSize: 0,
    currentColor: 0,
  }

  state = {
    ...this.initialState
  }

  handleSizeChange = e => {
    this.setState({
      currentSize: e.target.value,
      currentColor: 0
    });
  }

  render () {
    const {
      product,
      addProduct,
      fragance
    } = this.props;

    return (
      <ProductLayout>
        <ProductImage>
        </ProductImage>
        <ProductInfo>
          <ProductTitle>{fragance.displayName}</ProductTitle>
          <ProductPrice></ProductPrice>
          <ProductPickerLabel>
            <Select
              onChange={this.handleSizeChange}
              orange
              required
            >
              {product.sizes.map((size, index) => (
                <option key={size.id} value={index}>
                  {size.label}
                </option>
              ))}
            </Select>
            <span>Tamaño</span>
          </ProductPickerLabel>
          <ProductPickerLabel>
            <Select
              orange
              required
            >
              {product.sizes[this.state.currentSize].colores.map((color, index) => (
                <option key={color.id} value={index}>
                  {color.colorName}
                </option>
              ))}
            </Select>
            <span>Color</span>
          </ProductPickerLabel>
          <Button
            style={{fontSize: '0.9rem', borderRadius: '0'}}
            onClick={() => addProduct({})}
          >
            Añadir al carrito
          </Button>
        </ProductInfo>
      </ProductLayout>
    )
  }
}

export default ProductDetailPickerView;