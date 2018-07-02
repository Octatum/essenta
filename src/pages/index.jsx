import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import ProductSlider from './../components/ProductsSlider';
import Slideshow from './../components/Slideshow';

// todo 
const itemsToRender = [
  {
    key: 1,
    background: "darkred",
  },
  {
    key: 2,
    background: "teal",
  },
  {
    key: 3,
    background: "gray"
  }
];

// todo 
const mostSoldProducts = [
  {
    key: "darkred",
    product: "darkred",
  },
  {
    key: "chocolate",
    product: "chocolate",
  },
  {
    key: "steelblue",
    product: "steelblue",
  },
  {
    key: "mistyrose",
    product: "mistyrose",
  },
  {
    key: "teal",
    product: "teal",
  },
  {
    key: "darkgreen",
    product: "darkgreen",
  },
  {
    key: "navajoWhite",
    product: "navajoWhite",
  },
  {
    key: "white",
    product: "white",
  }
]

const Layout = styled.div`
  color: ${props => props.theme.mainLightText};
  font-family: ${props => props.theme.fonts.main};
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  background: ${props => props.theme.background.main};
`;

const AboutUsBanner = styled.div`
  background: chocolate;
  text-transform: uppercase;
  color: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: calc(100% - 4em);
  font-size: 2.7rem;
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: bold;
  min-height: 12rem;
  height: 27vh;
  padding: 1em 2em;
`;

const Spacer = styled.div`
  width: 100%;
  background: ${props => props.theme.background.secondary};
  height: 2px;
  margin: 1rem 0;
`;

const MostSold = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 22rem;
  height: 55vh;
`;

const MostSoldHeader = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: bold;
  font-size: 2rem;
  padding: 1rem 3rem;
  color: ${props => props.theme.color.black};
  text-transform: uppercase;
  letter-spacing: -0.1em;
`;

const ViewMore = styled(Link)`
  color: ${props => props.theme.color.orange};
  font-size: 0.5em;
  letter-spacing: 0em;
  padding-left: 0.5em;
  text-decoration: none;
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

const SlideshowLayout = styled.div`
  margin-top: 2rem;
  height: 33rem;
  position: relative;
`;

const SlideshowItemRender = styled.div`
  height: 100%;
  width: 100%;
  background: ${props => props.background};
`;

const SuggestedProducts = styled.div`
  margin: 6.5rem 0;
`;

const SuggestedProductsImage = styled.div`
  height: 36rem;
  background: blue;
`;

const Home = () => (
  <Layout>
    <AboutUsBanner>Nosotros</AboutUsBanner>
    <Spacer />
    <MostSold>
      <MostSoldHeader>
        Lo más vendido
        <ViewMore to="/">ver más</ViewMore>
      </MostSoldHeader>
      <ProductsLayout>
        <ProductSlider products={mostSoldProducts} />
      </ProductsLayout>
    </MostSold>
    <SlideshowLayout>
      <Slideshow 
        items={itemsToRender}
        defaultElementRender={(data) => <SlideshowItemRender {...data}/>}
        timeBetweenSlides={5000}/>
    </SlideshowLayout>
    <SuggestedProducts>
      <MostSoldHeader>
        Recomendaciones
        <ViewMore to="/">ver más</ViewMore>
      </MostSoldHeader>
      <SuggestedProductsImage />
    </SuggestedProducts>
  </Layout>
);

export default Home;