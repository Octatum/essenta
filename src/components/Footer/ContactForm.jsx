import React from 'react';
import styled from 'styled-components';
import { TextInput } from './../Input/index';
import Button from './../Button/index';

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

  handleSubmit = event => {
    event.preventDefault();
    this.setState(
      {
        ...this.initialValues,
        formSubmitted: true,
      },
      () => {
        alert('Tu mensaje ha sido enviado.');
      }
    );
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
        </Label>
        <Label>
          <TextLabel>Mensaje</TextLabel>
          <TextArea
            disabled={this.state.formSubmitted}
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </Label>
        <ButtonSpacer>
          <CustomButton disabled={this.state.formSubmitted}>
            Enviar
          </CustomButton>
        </ButtonSpacer>
      </Form>
    );
  }
}

export default ContactForm;
