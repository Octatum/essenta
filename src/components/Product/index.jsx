import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';

import FragancePickerView from './FragancePickerView';
import ProductDetailPickerView from './ProductDetailPickerView';
import Breadcrumbs from './../Breadcrumbs';
import { device } from '../../utilities/device';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  padding: 3em 5em;

  ${device.tablet} {
    padding: 2em;
  }

  ${device.mobile} {
    padding: 2em 1em;
  }
`;

class ProductPickerContainer extends Component {
  initialState = {
    currentStep: 0,
    selectedFragance: null,
  };

  state = {
    ...this.initialState,
  };

  addProduct = product => {
    this.props.cartStore.addProduct(product);
  };

  startOver = () => {
    this.setState({ ...this.initialState });
  };

  onFraganceClick = fragance => {
    this.setState(() => {
      return {
        currentStep: 1,
        selectedFragance: fragance,
      };
    });
  };

  handleFilterChange = ({ target }) => {
    const { value } = target;
  };

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        <Breadcrumbs />
        <Layout>
          <Router>
            <FragancePickerView
              path="/producto/perfume/:fraganceFilter/:productFilter"
              fragances={data.fragances}
              handleFilterChange={this.handleFilterChange}
              onFraganceClick={this.onFraganceClick}
            />
            {this.state.currentStep === 1 && (
              <ProductDetailPickerView
                product={data.product}
                goBack={this.startOver}
                fragance={this.state.selectedFragance}
                addProduct={this.addProduct}
              />
            )}
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default inject('cartStore')(ProductPickerContainer);
