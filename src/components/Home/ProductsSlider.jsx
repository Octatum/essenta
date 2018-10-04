import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Link } from '@reach/router';

import { screenBreakpoints } from './../../utilities/device';

const SliderArrow = styled.i`
  font-size: 3em;
  z-index: 10;
  cursor: pointer;
  color: ${({ theme }) => theme.color.black};
`;

const LeftArrow = SliderArrow.extend`
  left: -2.5rem;
`;

const RightArrow = SliderArrow.extend`
  right: -2.5rem;
`;

const SlickPrevArrow = ({ className, onClick }) => (
  <LeftArrow className="fa fa-chevron-left" onClick={onClick} />
);

const SlickNextArrow = ({ className, style, onClick }) => (
  <RightArrow className="fa fa-chevron-right" onClick={onClick} />
);

const ImageWrapper = styled.div`
  width: 220px;
  max-height: 220px;
  max-width: 220px;
  height: auto;
  position: relative;
`;

const ProductWrapper = styled(Link)`
  display: inline-flex !important;
  justify-content: center;
`;

const ProductSlider = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplaySpeed: 3000,
    autoplay: true,
    prevArrow: <SlickPrevArrow />,
    nextArrow: <SlickNextArrow />,
    responsive: [
      {
        breakpoint: screenBreakpoints.laptop,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: screenBreakpoints.tablet,
        settings: {
          slidesToShow: 2,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: screenBreakpoints.mobile,
        settings: {
          slidesToShow: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };
  return (
    <Slider style={{ position: 'relative', height: '100%' }} {...settings}>
      {products &&
        products.map(item => (
          <ProductWrapper
            to={`/producto${item.path}/${item.gender.toLowerCase()}`}
            key={item.key}
          >
            <ImageWrapper>
              <Img
                fluid={item.fluid}
                style={{ maxWidth: '220px', maxHeight: '220px' }}
              />
            </ImageWrapper>
          </ProductWrapper>
        ))}
    </Slider>
  );
};

export default ProductSlider;
