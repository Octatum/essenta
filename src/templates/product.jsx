import React from 'react';
import styled from 'styled-components';
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

function Product() {
  return (
    <Layout>
      <Breadcrumbs />
      <ProductLayout>
        <ProductView>AAA</ProductView>
        <ProductInfo>
          <ProductTitle>Sexy Lady</ProductTitle>
          <ProductPrice>$60.00</ProductPrice>
          <ProductDescription>Lorem ipsum dolor sit amet.</ProductDescription>
          <ProductPickerLabel>
            <Select orange required>
              <option>Madera</option>
              <option>Rosas</option>
              <option>Vainilla</option>
            </Select>
            <span>Fragancia</span>
          </ProductPickerLabel>
          <ProductPickerLabel>
            <Select orange required>
              <option>100 ml</option>
              <option>300 ml</option>
              <option>500 ml</option>
              <option>700 ml</option>
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