import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import ConditionalLink from '../ConditionalLink'
import MostSold from './MostSold'
import HomeHeader from './HomeHeader'
import SlideshowLayout from './SlideshowLayout'
import AppLayout from '../AppLayout'

const Layout = styled.div`
  color: ${props => props.theme.mainLightText};
  font-family: ${props => props.theme.fonts.main};
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  background: ${props => props.theme.background.main};
  padding-top: 1.5rem;
`

const ViewMore = styled(Link)`
  color: ${props => props.theme.color.orange};
  font-size: 0.5em;
  letter-spacing: 0em;
  padding-left: 0.5em;
  text-decoration: none;
`

const SuggestedProducts = styled.div`
  margin: 5rem 0;
`

const SuggestedProductsImage = styled.div`
  height: 36rem;
  overflow: hidden;
`

const imgStyle = {
  width: 'auto',
  height: '36rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
}

function Home({ data }) {
  const { recommendedImage, slideshowImages, highlightedProducts } = data

  return (
    <AppLayout>
      <Layout>
        <MostSold products={highlightedProducts} />
        <SlideshowLayout items={slideshowImages} />
        <SuggestedProducts>
          <HomeHeader>
            Recomendaciones
            <ViewMore to={recommendedImage.path}>ver más</ViewMore>
          </HomeHeader>
          <SuggestedProductsImage>
            <ConditionalLink
              to={recommendedImage.path}
              condition={
                recommendedImage.path && recommendedImage.path.length > 0
              }
            >
              <Img
                sizes={recommendedImage.image.sizes}
                imgStyle={imgStyle}
                position="absolute"
              />
            </ConditionalLink>
          </SuggestedProductsImage>
        </SuggestedProducts>
      </Layout>
    </AppLayout>
  )
}

export default Home
