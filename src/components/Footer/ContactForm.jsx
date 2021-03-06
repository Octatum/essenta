import React from 'react';
import styled from 'styled-components';

import { TextInput } from './../Input/index';
import Button from './../Button/index';
import Popup from '../Popup';
import iconAsset from './assets/send.svg';
import encode from '../../utilities/encode';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const TextArea = TextInput.withComponent('textarea');

const TextLabel = styled.div`
  font-size: 1.4em;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.color.black};
`;

const ButtonSpacer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
`;

const CustomButton = styled(Button)`
  font-size: 1rem;
  border-radius: none;
`;

class ContactForm extends React.Component {
  initialValues = {
    name: '',
    message: '',
    email: '',
    modalOpen: false,
  };

  state = {
    ...this.initialValues,
    formSubmitted: false,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { modalOpen: _, ...state } = this.state;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contacto',
        ...state,
      }),
    })
      .then(() => {
        this.setState({
          ...this.initialValues,
          formSubmitted: true,
        });

        this.openModal();
      })
      .catch(error => {
        this.formError = error;
      });
  };

  render() {
    return (
      <Form
        name="contacto"
        onSubmit={this.handleSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <p hidden>
          <label>
            Don’t fill this out:{' '}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </p>
        <Label>
          <TextLabel>Nombre</TextLabel>
          <TextInput
            disabled={this.state.formSubmitted}
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Label>
        <Label>
          <TextLabel>Correo</TextLabel>
          <TextInput
            disabled={this.state.formSubmitted}
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </Label>
        <Label>
          <TextLabel>Mensaje</TextLabel>
          <TextArea
            disabled={this.state.formSubmitted}
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
        </Label>
        <ButtonSpacer>
          <Popup
            trigger={
              <CustomButton disabled={this.state.formSubmitted}>
                Enviar
              </CustomButton>
            }
            open={this.state.modalOpen}
            onClose={this.closeModal}
            popupText="Tu mensaje ha sido enviado."
            icon={iconAsset}
          />
        </ButtonSpacer>
      </Form>
    );
  }
}

export default ContactForm;
