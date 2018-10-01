import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  width: 100%;
  min-height: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.background.secondary};
  color: ${props => props.theme.color.white};
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.35rem;
  text-align: center;
`

const Header = () => <StyledHeader>conoce los métodos de pago</StyledHeader>

export default Header
