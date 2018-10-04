import React from 'react';
import styled from 'styled-components';

import { device } from '../utilities/device';

const LayoutComponent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 0;

  ${device.tablet} {
    padding: 2rem 0;
  }
`;

export const withHorizontalPadding = component => styled(component)`
  padding-left: 5rem;
  padding-right: 5rem;

  ${device.tablet} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

function PageLayout({ fluid, ...other }) {
  let Component = LayoutComponent;
  if (!fluid) {
    Component = withHorizontalPadding(Component);
  }
  return <Component {...other} />;
}

export default PageLayout;
