import React from 'react';
import styled from 'styled-components';
import _DatePicker from 'react-datepicker';
import moment from 'moment';

import { TextInput as _TextInput, Select as _Select } from './../../components/Input/index';
import Button from './../../components/Button/index';

import 'react-datepicker/dist/react-datepicker.css';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5rem 0;
`;

const FormBlock = styled.form`
  width: 82%;
  height: 100%;
  counter-reset: fieldset;
  display: flex;
  flex-direction: column;
`;

const Legend = styled.legend`
  padding: 1em 0;
  font-size: 2.4rem;
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.color.black};
  font-weight: 700;
  position: relative;

  &::before {
    counter-increment: fieldset;
    position: absolute;
    left: -1.3em;
    content: counter(fieldset) ". ";
  }
`;

const Label = styled.label`
  font-size: 1.8rem;
  width: 100%;
  font-family: ${props => props.theme.fonts.main};
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.color.black};
  padding: 0.5em 0;

  &[required] > span::after {
    content: "*";
    color: ${props => props.theme.color.orange};
  }

  & > input {
    padding-left: 0.2em;
  }

  & > input, 
  & > select, 
  & > div {
    box-sizing: border-box;
    width: 40%;
  }

  & .react-datepicker-wrapper,
  & .react-datepicker__input-container {
    width: 100%;

    & input {
      box-sizing: border-box;      
      padding-left: 0.2em;      
      width: 100%;
    }
  }
`;

const TextInput = _TextInput.extend`
  font-size: 1.1rem;
  padding: 0.5em 0;
  border-radius: 5px;
`;

const Select = _Select.extend`
  font-size: 1.1rem;
  padding: 0.5em 0;
  border-radius: 5px;
`;

const DatePicker = styled(_DatePicker)`
  background: transparent;
  border: 1px solid ${props => props.theme.color.black};
  color: ${props => props.theme.color.black};
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  padding: 0.5em 0;
  border-radius: 5px;
`;

class JoinForm extends React.Component {
  state = {
    nombre: '',
    apellido: '',
    nacimiento: moment(),
    correo: '',
    verificacion: '',
    telefono: '',
    sexo: '',
    lineaUno: '',
    lineaDos: '',
    estado: '',
  }

  handleChange = ({target}) => {
    this.setState({[target.name]: target.value});
  }

  handleEmailChange = ({target}) => {
    
  }

  handleBirthdateChange = (date) => {
    this.setState({nacimiento: date});
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <Layout>
        <FormBlock netlify name="unete">
          <fieldset>
            <Legend>Información General</Legend>
            <Label required>
              <span>Nombre(s)</span>
              <TextInput type="text" onChange={this.handleChange} name="nombre" value={this.state.nombre} required/>
            </Label>
            <Label required>
              <span>Apellidos</span>
              <TextInput type="text" onChange={this.handleChange} name="apellido" value={this.state.apellido} required/>
            </Label>
            <Label required>
              <span>Fecha de nacimiento</span>
              <DatePicker
                selected={this.state.nacimiento}
                onChange={this.handleBirthdateChange}
                showMonthDropdown
                showYearDropdown
              />
            </Label>
            <Label required>
              <span>Correo</span>
              <TextInput type="email" onChange={this.handleChange} name="correo" value={this.state.correo} required/>
            </Label>
            <Label required>
              <span>Verificacion de correo</span>
              <TextInput type="email" onChange={this.handleChange} name="verificacion" value={this.state.verificacion} required/>
            </Label>
            <Label required>
              <span>Teléfono</span>
              <TextInput type="text" onChange={this.handleChange} name="telefono" value={this.state.telefono} required/>
            </Label>
            <Label required>
              <span>Sexo</span>
              <Select value={this.state.value} onChange={this.handleChange}>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
              </Select>
            </Label>
            <Label required>
              <span>Dirección</span>
              <TextInput type="text" onChange={this.handleChange} name="lineaUno" value={this.state.lineaUno} required/>
            </Label>
          </fieldset>
          <Button 
            type="submit"
            style={{
              alignSelf: 'flex-end',
              marginTop: '1em',
              width: '10em',
              minWidth: '10em',
            }}
          >
            Enviar
          </Button>
        </FormBlock>
      </Layout>
    );
  }
}

export default JoinForm;