import React from 'react';
import styled from 'styled-components';

import NewsForm from './NewsForm';
import AppLink from '../AppLink';
import { device } from '../../utilities/device';
import ContactForm from './ContactForm';
import throttle from './../../utilities/throttle';

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

const JoinUsButton = styled.div.attrs({
  style: ({ show }) => ({
    transform: `translateY(${show ? 100 : 0}%)`,
  }),
})`
  position: fixed;
  bottom: 0;
  align-self: center;
  text-transform: uppercase;
  background: ${props => props.theme.background.secondary};
  padding: 1rem 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  width: 15em;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  transition: transform 100ms ease;

  ${AppLink} {
    color: ${props => props.theme.color.white};
  }

  ${device.tablet} {
    font-size: 1.5rem;
  }

  ${device.mobile} {
    font-size: 1.2rem;
  }
`;

const RelevantInformation = styled.div`
  font-family: ${props => props.theme.fonts.main};
  display: grid;
  padding: 4rem 7rem;
  grid-template: auto auto / repeat(3, 1fr);
  grid-template-areas:
    'about policy contact'
    'copyright terms privacy';

  ${device.tablet} {
    padding: 4rem 2rem;
    grid-template: auto auto auto / repeat(2, 1fr);
    grid-template-areas:
      'about policy'
      'copyright contact'
      'privacy .';
  }

  ${device.mobile} {
    padding: 4rem 2rem;
    grid-template: repeat(5, auto) / 1fr;
    grid-template-areas:
      'about'
      'policy'
      'contact'
      'copyright'
      'terms'
      'privacy';
  }
`;

const SectionHeader = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.black};
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

  ${device.tablet} {
    jusify-self: flex-start;
  }
`;

const Policy = InformationSection.extend`
  grid-area: policy;

  ${device.tablet} {
    justify-self: flex-start;
  }
`;

const AditionalInformationSection = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  margin: 4rem 0;
  color: ${props => props.theme.color.black};

  ${device.tablet} {
    margin: 2rem 0;
  }
`;

const Copyright = AditionalInformationSection.extend`
  grid-area: copyright;
`;

const TermsNConditions = AditionalInformationSection.extend`
  grid-area: terms;
  justify-self: center;

  ${device.tablet} {
    justify-self: flex-start;
  }
`;

const Privacy = AditionalInformationSection.extend`
  grid-area: privacy;
  justify-self: flex-end;

  ${device.tablet} {
    justify-self: flex-start;
  }
`;

const ContactDisplay = styled(InformationSection)`
  grid-area: contact;
`;

const delta = 5;

class Footer extends React.Component {
  state = {
    showNav: true,
    lastScrollTop: 0,
    didScroll: true,
  };

  constructor(props) {
    super(props);

    this.hideHeader = this.hideHeader.bind(this);
    this.showHeader = this.showHeader.bind(this);
    this.hasScrolled = this.hasScrolled.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.handleScroll = throttle(this.handleScroll, 1000 / 10);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  hideHeader() {
    this.setState({
      showNav: false,
    });
  }

  showHeader() {
    this.setState({
      showNav: true,
    });
  }

  getDocHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }

  hasScrolled() {
    const st = window.scrollY;

    // Make sure they scroll more than delta
    if (Math.abs(this.state.lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > this.state.lastScrollTop) {
      // Scroll Down
      this.hideHeader();
    } else {
      // Scroll Up
      if (st < this.getDocHeight()) {
        this.showHeader();
      }
    }

    this.setState({
      lastScrollTop: st,
    });
  }

  handleScroll() {
    this.setState(() => {
      return {
        didScroll: true,
      };
    });

    this.hasScrolled();
  }

  render() {
    return (
      <Layout>
        <ContactInfo>
          <NewsForm />
        </ContactInfo>
        <RelevantInformation>
          <About>
            <SectionHeader>Acerca de Essenta</SectionHeader>
            <Link to="/unete">Empleos</Link>
            <Link to="/">Nosotros</Link>
          </About>
          <Policy>
            <SectionHeader>Políticas</SectionHeader>
            <Link to="/politica/pedidos">Pedidos</Link>
            <Link to="/politica/envios">Políticas de envío</Link>
            <Link to="/politica/aceptacion">Aviso y aceptación</Link>
            <Link to="/politica/devolucion">Políticas de devolución</Link>
          </Policy>
          <ContactDisplay>
            <SectionHeader>Contacto</SectionHeader>
            <ContactForm />
          </ContactDisplay>
          <Copyright>© 2018 ESSENTA Fragancias</Copyright>
          <TermsNConditions>
            <Link to="/politica/terminos" />
          </TermsNConditions>
          <Privacy>
            <Link to="/politica/privacidad">Aviso de privacidad</Link>
          </Privacy>
        </RelevantInformation>
        <JoinUsButton show={this.state.showNav}>
          <AppLink to="/unete">Únete a nosotros</AppLink>
        </JoinUsButton>
      </Layout>
    );
  }
}

export default Footer;
