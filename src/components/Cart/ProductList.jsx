import React from 'react';
import styled from 'styled-components';
import GatsbyImg from 'gatsby-image';

import { device } from '../../utilities/device';
import { inject, observer } from 'mobx-react';

const ProductCard = styled.div`
  margin-top: 2rem;
  padding: 1rem 3rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.color.darkGray};
  display: flex;
  position: relative;

  ${device.mobile} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const ProductThumbnailArea = styled.div`
  width: 10em;
  height: 10em;

  align-self: flex-start;

  ${device.mobile} {
    align-self: center;
  }
`;

const ProductData = styled.div`
  padding-left: 1em;
  flex: 3;

  ${device.mobile} {
    padding: 0;
  }

  ${device.mobile} {
    > * {
      margin: 0.3em 0;
    }
  }
`;

const ProductDataTitle = styled.h3`
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.black};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 700;
  padding-bottom: 0.5em;
  font-size: 1.5em;
`;

const ProductDataRow = styled.div`
  color: ${({ theme }) => theme.color.black};
  font-family: ${({ theme }) => theme.fonts.main};
  padding-bottom: 1em;
`;

const ProductBigCell = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ProductDataCell = styled.div`
  flex: 2;
  color: ${({ theme }) => theme.color.black};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.2em;
  text-align: center;
`;

const ProducDataCellTitle = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`;

const ProductDataCounter = styled.div`
  display: flex;
  height: 2em;
  align-items: center;
  justify-content: center;

  > *:not(:last-child):not(:first-child) {
    margin: 0 1.5em;

    ${device.laptop} {
      margin: 0 1em;
    }
  }
`;

const ProductCounterChangeButton = styled.button`
  border: 1px solid ${({ theme }) => theme.color.black};
  background: #505362;
  color: white;
  padding: 0.5em 1.5em;
  height: 100%;
  box-sizing: border-box;
  min-width: 1em;
  max-width: 4em;
`;

const RemoveProductIcon = styled.div`
  font-size: 2em;
  line-height: 0.5em;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  cursor: pointer;
`;

function ProductList({ cartStore }) {
  return (
    <React.Fragment>
      {cartStore.products.map(
        ({ name, color, size, fragance, thumbnail, price, amount }) => {
          const productKey = `${name}-${color}-${size}-${fragance}`;

          return (
            <ProductCard key={productKey}>
              <ProductThumbnailArea>
                <GatsbyImg width="160" height="160" sizes={thumbnail} />
              </ProductThumbnailArea>
              <ProductData>
                <ProductDataTitle>{name}</ProductDataTitle>
                <ProductDataRow>Color {color}</ProductDataRow>
                <ProductDataRow>Tamaño {size}</ProductDataRow>
                <ProductDataRow>Fragancia {fragance}</ProductDataRow>
                {/* 
              <Button
                style={{fontSize: '0.8rem', borderRadius: '0'}}
              >
                Eliminar producto
              </Button>
              */}
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
                      onClick={() =>
                        cartStore.decreaseAmountOfProduct(productKey)
                      }
                    >
                      -
                    </ProductCounterChangeButton>
                    <div>{amount}</div>
                    <ProductCounterChangeButton
                      onClick={() =>
                        cartStore.increaseAmountOfProduct(productKey)
                      }
                    >
                      +
                    </ProductCounterChangeButton>
                  </ProductDataCounter>
                </ProductDataCell>
              </ProductBigCell>
              <RemoveProductIcon
                onClick={() => cartStore.removeProduct(productKey)}
              >
                &times;
              </RemoveProductIcon>
            </ProductCard>
          );
        }
      )}
    </React.Fragment>
  );
}

export default inject('cartStore')(observer(ProductList));
