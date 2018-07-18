import React from 'react';
import styled from 'styled-components';

import ProductSlider from './ProductsSlider';
import HomeHeader from './HomeHeader';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 22rem;
  height: 55vh;
`;

const ProductsLayout = styled.div`
  padding: 1rem 7rem;
  margin-top: 2rem;
  height: 14rem;
  max-height: 14rem;

  & > .slick-slider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    & > div, 
    & > div > div {
      height: 100%;
      width: 100%;
    }
  }
`;

function MostSold ({products}) {

  return (
    <Layout>
      <HomeHeader>
        Lo más vendido
      </HomeHeader>
      <ProductsLayout>
        <ProductSlider products={products} />
      </ProductsLayout>
    </Layout>
  )
}

export default MostSold;