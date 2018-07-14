import React from 'react';
import styled from 'styled-components';

import ShopLinks from './ShopLinks';
import NavbarLink from './NavbarLink';
import Header from './Header';

import logo from './assets/logo_horizontal.png';

const NavLayout = styled.nav`
  display: flex;
  width: calc(100%);
  padding-bottom: 1.5rem;
  flex-direction: column;
  justify-content: space-between;
  background: ${props => props.theme.background.main};
`;

const LogoSection = styled.div`
  display: flex;
  padding: 1.7rem 3.5rem;
  align-items: space-between;
  justify-content: flex-start;
  color: white;
  font-size: 1.5em;
  max-height: 9rem;
  box-sizing: border-box;
`;

const LinksSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: ${props => props.theme.fonts.secondary};
  position: relative;
  justify-content: space-between;
  min-width: 60%;
  max-width: 60%;
`;

const HoverableItem = styled.div`
  font-size: 1.2em;
  color: ${props => props.theme.color.black};
  text-transform: uppercase;
  position: relative;

  &::after {
    content: "▾";
  }

  &::before {
    content: "";
    height: 150%;
    width: 120%;
    position: absolute;
    left: -10%;
    bottom: -150%;
  }

  &:hover ~ .navbar,
  & ~ .navbar:hover,
  & ~ .navbar:focus-within {
    pointer-events: auto;
    z-index: 1;
    opacity: 1;
  }
`;

const NavlinksSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3.5em;
  height: 2em;
  font-weight: bold;
`;

const ShopLinksSection = styled.div`
  flex: 1;
`;

const Img = styled.img`
  max-height: 100%;
`;

const DropdownMenu = styled.div`
  background-color: ${props => props.theme.color.orange};
  display: flex;
  align-items: center;
  position: absolute;
  pointer-events: none;
  bottom: -4em;
  transition: opacity 0.5s ease, z-index 0.1s linear;
  opacity: 0;
  height: 3em;
  width: 100vw;
  left: -3.5em;
  padding-left: 3.5rem;
  overflow-y: hidden;
  z-index: 0;

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
`;

function loseFocus({target}) {
  target.blur();
}

function Navbar({urls}) {

  return (
    <NavLayout>
      <Header />
      <LogoSection><NavbarLink to="/"><Img src={logo} alt="logo"/></NavbarLink></LogoSection>
      <NavlinksSection>
        <LinksSection>
          <NavbarLink to="/perfume">Elabora tu perfume</NavbarLink>
          <HoverableItem>Catálogo</HoverableItem>
          <NavbarLink to="/unete">Únete a nosotros </NavbarLink>
          <DropdownMenu className="navbar">
            {urls.map(({name, path}) => (
              <NavbarLink onClick={loseFocus} to={path}>{name}</NavbarLink>
            ))}
          </DropdownMenu>
        </LinksSection>
        <ShopLinksSection>
          <ShopLinks />
        </ShopLinksSection>
      </NavlinksSection>
    </NavLayout>
  );
}

export default Navbar;