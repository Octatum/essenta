import React from 'react';
import styled from 'styled-components';

import { TextInput } from '../Input/index';
import Button from '../Button/index';
import { device } from '../../utilities/device';

const Layout = styled.div`
  display: flex;

  ${device.laptop} {
    flex-direction: column;
  }
`;

const Form = styled.form`
  display: flex;
  flex: 3;
  justify-content: space-between;
`;

const ContactInfo = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  box-sizing: border-box;
  padding: 0 2rem;

  ${device.laptop} {
    margin-top: 1em;
  }
`;

const CallUs = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
`;

const SocialButton = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.color.gray};
  background: ${props => props.theme.color.orange};
  border-radius: 40%;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 2.3rem;
  transition: 300ms ease background-color;

  &:visited {
    text-decoration: none;
  }

  &:focus {
    background: ${props => props.theme.color.darkOrange};
  }
`;

const Bold = styled.span`
  font-weight: 700;
`;

class ContactForm extends React.Component {

  state = {
    email: '',
  };

  handleChange = ({target: {name, value}}) => {
    this.setState({[name]: value})
  }

  submitForm = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Layout>
        <Form action="" name="contacto" netlify>
          <TextInput
            style={{
              flex: '6',
              fontSize: '1rem',
              textAlign: 'center'
            }}
            type="email" 
            placeholder="Recibe las últimas noticias de ESSENTA" 
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
          />
          <Button
            onClick={this.submitForm}
            style={{
              flex: '4',
              marginLeft: '1em',
              fontSize: '1.3rem',
              textAlign: 'center'
            }}
          >
            Suscríbete
          </Button>
        </Form>
        <ContactInfo>
          <CallUs><Bold>LLÁMANOS:</Bold>&nbsp;&nbsp;55-1000-2866</CallUs>
          <SocialButton target="_blank" href="/"><i className="fab fa-twitter"/></SocialButton>
          <SocialButton target="_blank" href="/"><i className="fab fa-facebook-f"/></SocialButton>
          <SocialButton target="_blank" href="/"><i className="fab fa-youtube"/></SocialButton>
        </ContactInfo>
      </Layout>
    );
  }
}

export default ContactForm;