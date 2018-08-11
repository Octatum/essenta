import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import Button from './../components/Button/index';
import { device } from '../utilities/device';

const Layout = styled.div`
  display: flex;
  position: relative;
  padding: 3rem 0;

  ${device.tablet} {
    flex-direction: column-reverse;
  }
`;

const ProductsLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  padding-right: 3rem;

  ${device.laptop} {
    padding-right: 0;
  }
`;

const CheckoutLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  margin: 0 3rem;
  
  ${device.laptop} {
    margin: 0 1rem;
  }
`;

const Header = styled.h1`
  font-family: ${props => props.theme.fonts.main};
  font-size: 3em;
  color: ${props => props.theme.color.black};
  margin-bottom: 1rem;
  padding-left: 3rem;
`;

const ProductCard = styled.div`
  margin-top: 2rem;
  padding: 1rem 3rem;
  box-sizing: border-box;
  background: rgb(81, 83, 98, 0.18);
  display: flex;
`;

const Subtotal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4em 0;
  text-align: center;
  font-size: 1.2em;
`;

const ProductThumbnail = styled.img`
  max-width: 10em;
  max-height: 10em;
  align-self: flex-start;
  background: white;
`;

const ProductData = styled.div`
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

const ProductDataTitle = styled.h3`
  text-transform: uppercase;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fonts.main};
  font-weight: 700;
  font-size: 1.5em;
`;

const ProductDataRow = styled.div`
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fonts.main};
`;

const ProductBigCell = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ProductDataCell = styled.div`
  flex: 2;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fonts.main};
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  text-align: center;
  justify-content: space-between;
`;

const ProducDataCellTitle = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`;

const ProductDataCounter = styled.div`
  display: flex;
  height: 2em;
  align-items: center;

  > * {
    flex: 1;
  }
`;

const ProductCounterChangeButton = styled.button`
  border: 1px solid ${({theme}) => theme.color.black};
  background: #505362;
  color: white;
  margin: 0 1em;
  padding: 0.5em 0;
  height: 100%;
`;

const ProductSubtotal = styled.div`
  display: flex;
  width: 33%;
  min-width: 19em;
  align-self: flex-end;
  text-align: center;
  flex-direction: column;
`;

const ProductSubtotalHeader = styled.div`  
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fonts.main};
  text-align: center;
  font-size: 1.2em;
  font-weight: 700;
  padding: 0.5em 0;
`;

const ProductSubtotalPrice = ProductSubtotalHeader.extend`
  font-weight: unset;
  font-size: 1.3em;
`;

function Carrito ({cartStore}) {
  return (
    <Layout>
      <ProductsLayout>
        <Header>Carrito</Header>
          {cartStore.products.map(({
            name,
            color,
            size,
            fragance,
            thumbnail,
            price,
            amount
          }) => {
            const productKey = `${name}-${color}-${size}-${fragance}`;

            return (
              <ProductCard key={productKey}>
                <ProductThumbnail
                  src={thumbnail}
                  width="160"
                  height="160"
                />
                <ProductData>
                  <ProductDataTitle>
                    {name}
                  </ProductDataTitle>
                  <ProductDataRow>
                    Color {color}
                  </ProductDataRow>
                  <ProductDataRow>
                    Tamaño {size}
                  </ProductDataRow>
                  <ProductDataRow>
                    Fragancia {fragance}
                  </ProductDataRow>
                  <Button
                    style={{fontSize: '0.8rem', borderRadius: '0'}}
                    onClick={() => cartStore.removeProduct(productKey)}
                  >
                    Eliminar producto
                  </Button>
                </ProductData>
                <ProductBigCell>
                  <ProductDataCell>
                    <ProducDataCellTitle>Precio</ProducDataCellTitle>
                    <div>${price}</div>
                  </ProductDataCell>
                  <ProductDataCell>
                    <ProducDataCellTitle>Cantidad</ProducDataCellTitle>
                    <ProductDataCounter>
                      <ProductCounterChangeButton 
                        onClick={() => cartStore.decreaseAmountOfProduct(productKey)}
                      >
                        -
                      </ProductCounterChangeButton>
                      <div>{amount}</div>
                      <ProductCounterChangeButton
                        onClick={() => cartStore.increaseAmountOfProduct(productKey)}
                      >
                        +
                      </ProductCounterChangeButton>
                    </ProductDataCounter>
                  </ProductDataCell>
                </ProductBigCell>
              </ProductCard>
            )
          })}
        <ProductSubtotal>
          <ProductSubtotalHeader>
            Subtotal
          </ProductSubtotalHeader>
          <ProductSubtotalPrice>
            ${cartStore.total}.00
          </ProductSubtotalPrice>
        </ProductSubtotal>
      </ProductsLayout>
      <CheckoutLayout>
        <Subtotal>
          <ProductSubtotalHeader>
            Subtotal
          </ProductSubtotalHeader>
          <ProductSubtotalPrice>
            ${cartStore.total}.00
          </ProductSubtotalPrice>
          <Button
            style={{fontSize: '1.1rem', borderRadius: '0'}}
            onClick={() => alert("Esta opción está desabilitada de momento")}
          >
            Proceder a pago
          </Button>
        </Subtotal>
      </CheckoutLayout>
    </Layout>
  )
}

export default inject("cartStore")(observer(Carrito));