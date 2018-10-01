import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import Button from './../components/Button/index'
import { device } from '../utilities/device'
import ProductList from '../components/Cart/ProductList'
import PageHeader from './../components/PageHeader'
import AppLayout from '../components/AppLayout'

const Layout = styled.div`
  display: flex;
  position: relative;
  padding: 3rem 0;

  ${device.tablet} {
    flex-direction: column-reverse;
  }

  ${device.mobile} {
    padding-top: 0;
  }
`

const ProductsLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  padding-right: 3rem;

  ${device.laptop} {
    padding-right: 0;
  }
`

const CheckoutLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  margin: 0 3rem;

  ${device.laptop} {
    margin: 0 1rem;
  }
`

const CustomPageHeader = PageHeader.extend`
  padding: 0 5rem;

  ${device.tablet} {
    padding: 0 2rem;
  }
`

const Subtotal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4em 0;
  text-align: center;
  font-size: 1.2em;
`

const ProductSubtotal = styled.div`
  display: flex;
  width: 33%;
  min-width: 19em;
  align-self: flex-end;
  text-align: center;
  flex-direction: column;

  ${device.mobile} {
    width: 100%;
  }
`

const ProductSubtotalHeader = styled.div`
  color: ${({ theme }) => theme.color.black};
  font-family: ${({ theme }) => theme.fonts.main};
  text-align: center;
  font-size: 1.2em;
  font-weight: 700;
  padding: 0.5em 0;
`

const ProductSubtotalPrice = ProductSubtotalHeader.extend`
  font-weight: unset;
  font-size: 1.3em;
`

const LinkButton = Button.withComponent(Link).extend`
  text-decoration: none;
`

function Carrito({ cartStore }) {
  return (
    <AppLayout>
      <Layout>
        <ProductsLayout>
          <CustomPageHeader>Carrito</CustomPageHeader>
          <ProductList products={cartStore.products} />
          <ProductSubtotal>
            <ProductSubtotalHeader>Subtotal</ProductSubtotalHeader>
            <ProductSubtotalPrice>
              ${cartStore.total}
              .00
            </ProductSubtotalPrice>
          </ProductSubtotal>
        </ProductsLayout>
        <CheckoutLayout>
          <Subtotal>
            <ProductSubtotalHeader>Subtotal</ProductSubtotalHeader>
            <ProductSubtotalPrice>
              ${cartStore.total}
              .00
            </ProductSubtotalPrice>
            <LinkButton
              style={{ fontSize: '1.1rem', borderRadius: '0' }}
              to="/checkout"
            >
              Proceder a pago
            </LinkButton>
          </Subtotal>
        </CheckoutLayout>
      </Layout>
    </AppLayout>
  )
}

export default inject('cartStore')(observer(Carrito))
