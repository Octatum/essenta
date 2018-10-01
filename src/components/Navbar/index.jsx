import React from 'react'
import styled from 'styled-components'

import ShopLinks from './ShopLinks'
import NavbarLink from './NavbarLink'

import logo from './assets/logo_horizontal.png'
import { device } from '../../utilities/device'

const NavLayout = styled.nav`
  display: flex;
  width: calc(100%);
  flex-direction: column;
  justify-content: space-between;
  background: ${props => props.theme.background.main};
`

const LogoSection = styled.div`
  display: flex;
  padding: 1rem 3.5rem;
  align-items: space-between;
  justify-content: flex-start;
  color: white;
  box-sizing: border-box;

  ${device.tablet} {
    justify-content: center;
  }
`

const LinksSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: ${props => props.theme.fonts.secondary};
  position: relative;
  justify-content: space-between;
  flex: 6;

  > *:not(:last-child) {
    flex: 1;
    text-align: center;
  }
`

const BackgroundNavbarLink = NavbarLink.extend`
  padding: 0.5em 0;
  flex: 1;
  transition: 0.3s ease-in-out all;
  box-sizing: border-box;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background: ${({ theme }) => theme.color.darkOrange};
  }
`

const HoverableItem = NavbarLink.extend`
  font-size: 1.2em;
  color: ${props => props.theme.color.black};
  text-transform: uppercase;
  position: relative;

  &::after {
    content: '';
  }

  ${device.tablet} {
    ::after {
      display: none;
    }
  }

  &::before {
    content: '';
    height: 120%;
    width: 300%;
    position: absolute;
    left: -100%;
    bottom: -120%;
  }

  &:hover ~ .navbar,
  & ~ .navbar:hover,
  & ~ .navbar:focus-within {
    pointer-events: auto;
    z-index: 1;
    opacity: 1;
  }
`

const NavlinksSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3.5em;
  font-weight: bold;
  background: ${({ theme }) => theme.color.orange};

  ${device.tablet} {
    height: auto;
    padding: 0;
    flex-direction: column;
  }
`

const ShopLinksSection = styled.div`
  flex: 3;
`

const Img = styled.img`
  max-width: 100%;
`

const Spacer = styled.div`
  width: 100%;
  background: ${props => props.theme.background.secondary};
  height: 2px;
`

const DropdownMenu = styled.div`
  background-color: ${props => props.theme.background.secondary};
  display: flex;
  align-items: center;
  position: absolute;
  pointer-events: none;
  bottom: -3.5em;
  transition: opacity 0.5s ease, z-index 0.1s linear;
  opacity: 0;
  height: 3em;
  width: 100vw;
  left: -3.5em;
  padding-left: 3.5rem;
  overflow-y: hidden;
  box-sizing: border-box;
  z-index: 0;
  -webkit-box-shadow: 0px 0.5em 1em 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0.5em 1em 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0.5em 1em 0px rgba(0, 0, 0, 0.25);

  > * {
    padding: 1em 1.5em;
    transition: ease 0.3s background-color;
    background: rgba(255, 255, 255, 0);

    :hover,
    :focus {
      background: rgba(255, 255, 255, 0.2);
    }

    :focus & {
      opacity: 1;
    }
  }

  ${device.tablet} {
    display: none;
  }
`

const LogoLink = NavbarLink.extend`
  width: 25%;
  min-width: 15em;
`

const CustomNavbarLink = NavbarLink.extend`
  color: ${({ theme }) => theme.color.white};
`

function loseFocus({ target }) {
  target.blur()
}

function Navbar({ urls }) {
  return (
    <NavLayout>
      <LogoSection>
        <LogoLink to="/">
          <Img src={logo} alt="logo" />
        </LogoLink>
      </LogoSection>
      <NavlinksSection>
        <LinksSection>
          <BackgroundNavbarLink to="/producto/perfume/mujer">
            Diseña tu perfume
          </BackgroundNavbarLink>
          <BackgroundNavbarLink to="/catalogo">Catálogo</BackgroundNavbarLink>
          <BackgroundNavbarLink to="/unete">
            Únete a nosotros{' '}
          </BackgroundNavbarLink>
          {/* 
          <DropdownMenu className="navbar">
            {urls.map(({name, path}) => (
              <CustomNavbarLink key={path} onClick={loseFocus} to={path}>{name}</CustomNavbarLink>
            ))}
          </DropdownMenu>
          */}
        </LinksSection>
        <ShopLinksSection>
          <ShopLinks />
        </ShopLinksSection>
      </NavlinksSection>
      <Spacer />
    </NavLayout>
  )
}

export default Navbar
