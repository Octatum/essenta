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

  ${device.mobile} {
    flex-direction: column;
  }
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

  ${device.mobile} {
    padding: 0;
    flex-direction: column;
    justify-content: center;
  }
`;

const CallUs = styled.div`
  font-family: ${props => props.theme.fonts.secondary};

  ${device.mobile} {
    min-width: 100%;
  }
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

const CustomButton = Button.extend`
  flex: 4;
  margin-left: 1em;
  font-size: 1.3rem;
  text-align: center;

  ${device.mobile} {
    margin: 0;
  }
`;

const CustomTextInput = TextInput.extend`
  flex: 6;
  font-size: 1rem;
  text-align: center;

  ${device.mobile} {
    padding: 0.5em 0;
    margin-bottom: 1em;
  }
`;

const SocialButtons = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;

  ${device.tablet} {
    padding-top: 0.5em;
    width: 100%;
  }
`;

class ContactForm extends React.Component {
  state = {
    email: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  submitForm = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Layout>
        <Form action="" name="contacto" netlify>
          <CustomTextInput
            type="email"
            placeholder="Recibe las últimas noticias de ESSENTA"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <CustomButton onClick={this.submitForm}>Suscríbete</CustomButton>
        </Form>
        <ContactInfo>
          <CallUs>
            <Bold>LLÁMANOS:</Bold>
            &nbsp;&nbsp;55-1000-2866
          </CallUs>
          <SocialButtons>
            <SocialButton target="_blank" href="https://facebook.com/essentamx">
              <i className="fab fa-facebook-f" />
            </SocialButton>
            {/* <SocialButton target="_blank" href="/"><i className="fab fa-twitter"/></SocialButton>
            <SocialButton target="_blank" href="/"><i className="fab fa-youtube"/></SocialButton> */}
          </SocialButtons>
        </ContactInfo>
      </Layout>
    );
  }
}

export default ContactForm;
