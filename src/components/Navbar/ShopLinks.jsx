import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import NavbarLink from './NavbarLink'

const Layout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  > :not(:first-child) {
    position: relative;

    &::before {
      content: '';
      left: 0;
      height: 1.2rem;
      position: absolute;
      width: 2px;
      background-color: ${props => props.theme.color.black};
    }
  }
`

const ShopLinkContainer = styled.div`
  padding: 0.5em;
`

const I = styled.i`
  color: ${props => props.theme.color.black};
  font-size: 1.5rem;
  position: relative;
`

const ShoppingCart = I.extend.attrs({
  className: 'fas fa-shopping-cart',
})`
  position: relative;
  padding-right: 0.3rem;
`

const ShopLinks = ({ cartStore }) => (
  <Layout>
    <ShopLinkContainer>
      <NavbarLink to="/carrito">
        <ShoppingCart />({cartStore.products.length})
      </NavbarLink>
    </ShopLinkContainer>
    <ShopLinkContainer>
      <NavbarLink to="/politica/pedidos">Ayuda</NavbarLink>
    </ShopLinkContainer>
  </Layout>
)

export default inject('cartStore')(observer(ShopLinks))
