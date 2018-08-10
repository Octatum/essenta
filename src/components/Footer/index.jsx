import React from 'react';
import styled from 'styled-components';

import ContactForm from './ContactForm';
import AppLink from '../AppLink';

const Layout = styled.div`
  display: flex;
  background: ${props => props.theme.background.main};
  flex-direction: column;
  justify-content: flex-end;
`;

const ContactInfo = styled.div`
  display: grid;
  padding: 1rem;
  border: 2px solid ${props => props.theme.background.secondary};
  border-left: 0px;
  border-right: 0px;
`;

const JoinUsButton = styled.div`
  align-self: center;
  text-transform: uppercase;
  background: ${props => props.theme.background.secondary};
  padding: 1rem 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  width: 30rem;
  color: white;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};

  ${AppLink} {
    color: ${props => props.theme.color.white};
  }
`;

const RelevantInformation = styled.div`
  font-family: ${props => props.theme.fonts.main};
  display: grid;
  padding: 4rem 7rem;
  grid-template: auto auto / repeat(3, 1fr);
  grid-template-areas: 
    "about policy ."
    "copyright terms privacy";
`;

const SectionHeader = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Link = AppLink.extend`
  text-transform: capitalize;
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.color.black};
  font-size: 1.4rem;
`;

const InformationSection = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin: 1rem 0;
  }


  & :first-child {
    margin-top: 0;
  }
`;

const About = InformationSection.extend`
  grid-area: about;
`;

const HowToBuy = InformationSection.extend`
  grid-area: how-to-buy;
  justify-self: center;
`;

const Policy = InformationSection.extend`
  grid-area: policy;
  justify-self: center;
`;

const AditionalInformationSection = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  margin: 4rem 0;
  color: ${props => props.theme.color.black};
`;

const Copyright = AditionalInformationSection.extend`
  grid-area: copyright;
`;

const TermsNConditions = AditionalInformationSection.extend`
  grid-area: terms;
  justify-self: center;
`;

const Privacy = AditionalInformationSection.extend`
  grid-area: privacy;
  justify-self: flex-end;
`;

function Footer() {
  return (
    <Layout>
      <ContactInfo><ContactForm /></ContactInfo>
      <RelevantInformation>
        <About>
          <SectionHeader>Acerca de Essenta</SectionHeader>
          <Link to="/unete">Empleos</Link>
          <Link to="/">Nosotros</Link>
          <Link to="/">Nuestras causas</Link>
          <Link to="/">Nuestros fundadores</Link>
        </About>
        <Policy>
          <SectionHeader>Políticas</SectionHeader>
          <Link to="/pedidos">Pedidos</Link>
          <Link to="/envios">Políticas de envío</Link>
          <Link to="/aceptacion">Aviso y aceptación</Link>
          <Link to="/devolucion">Políticas de devolución</Link>
        </Policy> 
        <Copyright>© 2018 ESSENTA Fragancias</Copyright>
        <TermsNConditions><Link to="/terminos">Términos y Condiciones</Link></TermsNConditions>
        <Privacy><Link to="/privacidad">Privacidad y Seguridad</Link></Privacy>
      </RelevantInformation>
      <JoinUsButton><AppLink to="/unete">Únete a nosotros</AppLink></JoinUsButton>
    </Layout>
  );
}

export default Footer;