import React, { Component } from 'react'
import styled from 'styled-components'
import GatsbyImg from 'gatsby-image'

import { Select } from '../Input'
import Button from '../Button/index'
import { device } from '../../utilities/device'

const ProductLayout = styled.div`
  display: flex;
  width: 80%;
  min-height: 30em;
  align-self: center;
  justify-content: space-between;
  align-items: center;

  ${device.tablet} {
    flex-direction: column;
    margin-bottom: 3em;
  }
`

const BackButton = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({ theme }) => theme.color.black};
  font-size: 1.5em;
  font-weight: 700;
  align-self: start;
  cursor: pointer;

  ::before {
    content: '\u276E ';
    display: inline;
  }
`

const ProductImage = styled.div`
  flex: 2;
  min-width: 300px;

  ${device.tablet} {
    margin: 2em 0;
  }
`

const ProductInfo = styled.div`
  font-family: ${props => props.theme.fonts.main};
  box-sizing: border-box;
  flex: 3;
  padding-left: 3em;
`

const ProductTitle = styled.div`
  color: ${props => props.theme.color.black};
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 700;
`

const ProductPrice = styled.div`
  font-size: 1.6rem;
`

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
    text-transform: capitalize;
  }

  span {
    padding-top: 0.5em;
    box-sizing: border-box;
    text-align: center;
    flex: 1;
    align-items: center;
    vertical-align: middle;
  }
`

const Option = styled.option`
  background: white;
  font-weight: 700;
  text-transform: capitalize;
`

const Img = styled(GatsbyImg)`
  width: 100%;
  max-width: 400px;
`

const FraganceData = styled.section`
  line-height: 2em;
  width: 80%;
  align-self: center;

  ${device.tablet} {
    width: 90%;
  }

  ${device.mobile} {
    width: 100%;
  }
`

const FraganceDataHeader = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({ theme }) => theme.color.black};
  font-size: 1.5em;
  font-weight: 700;
  margin: 0.2em 0;
`

const FraganceDataContent = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({ theme }) => theme.color.black};
  font-weight: 700;
  text-align: justify;
`

class ProductDetailPickerView extends Component {
  initialState = {
    currentSize: 0,
    currentColor: 0,
  }

  state = {
    ...this.initialState,
  }

  handleSizeChange = e => {
    this.setState({
      currentSize: e.target.value,
      currentColor: 0,
    })
  }

  handleColorChange = e => {
    this.setState({
      currentColor: e.target.value,
    })
  }

  render() {
    const { product, addProduct, fragance, goBack } = this.props
    const { currentSize, currentColor } = this.state

    return (
      <React.Fragment>
        <BackButton onClick={() => goBack()}>Regresar</BackButton>
        <ProductLayout>
          <ProductImage>
            <Img
              sizes={
                product.sizes[currentSize].colores[currentColor].image.sizes
              }
            />
          </ProductImage>
          <ProductInfo>
            <ProductTitle>{fragance.displayName}</ProductTitle>
            <ProductPrice />
            <ProductPickerLabel>
              <Select onChange={this.handleSizeChange} orange required>
                {product.sizes.map((size, index) => (
                  <Option key={size.id} value={index}>
                    {size.label}
                  </Option>
                ))}
              </Select>
              <span>Tamaño</span>
            </ProductPickerLabel>
            <ProductPickerLabel>
              <Select onChange={this.handleColorChange} orange required>
                {product.sizes[currentSize].colores.map((color, index) => (
                  <Option key={color.id} value={index}>
                    {color.colorName}
                  </Option>
                ))}
              </Select>
              <span>Color</span>
            </ProductPickerLabel>
            <Button
              style={{ fontSize: '0.9rem', borderRadius: '0' }}
              onClick={() =>
                addProduct({
                  name: `${product.title} ${fragance.displayName}`,
                  color:
                    product.sizes[currentSize].colores[currentColor].colorName,
                  size: product.sizes[currentSize].label,
                  fragance: fragance.displayName,
                  thumbnail:
                    product.sizes[currentSize].colores[currentColor].image
                      .sizes,
                  price: product.sizes[currentSize].sizePrice,
                })
              }
            >
              Añadir al carrito
            </Button>
          </ProductInfo>
        </ProductLayout>
        <FraganceData>
          <FraganceDataHeader>Descripción</FraganceDataHeader>
          <FraganceDataContent>
            {fragance.description.description}
          </FraganceDataContent>
          <FraganceDataHeader>Sugerencias</FraganceDataHeader>
          <FraganceDataContent>
            {fragance.suggestions.suggestions}
          </FraganceDataContent>
        </FraganceData>
      </React.Fragment>
    )
  }
}

export default ProductDetailPickerView
