import React from 'react';
import styled from 'styled-components';

import Slideshow from '../../components/Slideshow';

const Layout = styled.div`
  margin-top: 2rem;
  height: 33rem;
  position: relative;
`;

const SlideshowItemRender = styled.div`
  height: 100%;
  width: 100%;
  background: ${props => props.background};
`;

function SlideshowLayout ({items}) {
  return (
    <Layout>
      <Slideshow 
        items={items}
        defaultElementRender={(data) => <SlideshowItemRender {...data}/>}
        timeBetweenSlides={5000}/>
    </Layout>
  )
}

export default SlideshowLayout;