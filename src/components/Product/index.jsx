import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Router } from '@reach/router';

import FragancePickerView from './FragancePickerView';
import ProductDetailPickerView from './ProductDetailPickerView';
import Breadcrumbs from './../Breadcrumbs';

class ProductPickerContainer extends Component {
  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        <Breadcrumbs />
        <Router>
          <FragancePickerView
            path="/producto/:categoryPath/:genderFilter"
            fragances={data.fragances}
          />
          <ProductDetailPickerView
            path="/producto/:categoryPath/:genderFilter/:fraganceId"
            containers={data.containers}
            fragances={data.fragances}
          />
        </Router>
      </React.Fragment>
    );
  }
}

export default inject('cartStore')(ProductPickerContainer);
