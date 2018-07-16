import React, { Component } from 'react';
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
  display: flex;
  align-items: center;
  width: 35%;
  height: 100%;
`;

const ProductInfo = styled.div`
  font-family: ${props => props.theme.fonts.main};
  box-sizing: border-box;
  width: 57%;
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

const Img = styled.img`
  max-width: 100%;
  width: 100%;
`;

function getFragancesDataFromEdges(edges) {
  return edges.map(({node}) => ({
    title: node.childMarkdownRemark.frontmatter.title,
    label: node.childMarkdownRemark.frontmatter.label
  }));
}

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fraganceIndex: 0,
      sizeIndex: 0,
      colorIndex: 0
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {target} = event;
    console.log(target.value)

    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    const { markdownRemark, fragances } = this.props.data;
    const { frontmatter } = markdownRemark;
    const { colors } = frontmatter;
    const fragancesData = getFragancesDataFromEdges(fragances.edges);

    return (
      <Layout>
        <Breadcrumbs />
        <ProductLayout>
          <ProductView><Img src={markdownRemark.frontmatter.sizes[this.state.sizeIndex].image} /></ProductView>
          <ProductInfo>
            <ProductTitle>Arma tu {frontmatter.title}</ProductTitle>
            <ProductPrice>${frontmatter.sizes[this.state.sizeIndex].price}</ProductPrice>
            <ProductDescription>{frontmatter.description}</ProductDescription>
            <ProductPickerLabel>
              <Select 
                onChange={this.handleChange} 
                orange 
                required 
                name="fraganceIndex" 
                value={this.state.fraganceIndex}
              >
                {fragancesData.map(({title, label}, index) => (
                  <option key={title} value={index}>{label}</option>
                ))}
              </Select>
              <span>Fragancia</span>
            </ProductPickerLabel>
            <ProductPickerLabel>
              <Select 
                onChange={this.handleChange} 
                orange 
                required 
                name="sizeIndex" 
                value={this.state.sizeIndex}
              >
                {frontmatter.sizes.map(({size}, index) => (
                  <option key={size} value={index}>{size}</option>
                ))}
              </Select>
              <span>Tamaño</span>
            </ProductPickerLabel>
            <ProductPickerLabel>
              <Select 
                onChange={this.handleChange} 
                orange 
                required 
                name="colorIndex" 
                value={this.state.colorIndex}
              >
                {colors.map(({name}, index) => (
                  <option key={name} value={index}>{name}</option>
                ))}
              </Select>
              <span>Color</span>
            </ProductPickerLabel>
            <Button style={{fontSize: '0.9rem', borderRadius: '0'}}>Añadir al carrito</Button>
          </ProductInfo>
        </ProductLayout>
      </Layout>
    );
  }
}

export default Product;

export const dataQuery = graphql`
  query ProductByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        sizes {
          image
          price
          size
        }
        colors {
          name
        }
      }
    }

    fragances: allFile(filter: {sourceInstanceName: {eq: "fragances"}}) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              label
            } 
          }
        }
      }
    }

    siteTitle: site {
      siteMetadata {
        title
      }
    }
  }
`;

