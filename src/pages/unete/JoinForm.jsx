import React from 'react';
import styled from 'styled-components';
import _DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import {
  TextInput as _TextInput,
  withSelectStyle,
} from './../../components/Input/index';
import Button from './../../components/Button/index';
import { device } from '../../utilities/device';
import { Formik, Field } from 'formik';
import encode from '../../utilities/encode';
import {
  FormikLabelInput,
  GenericLabelInput,
} from '../../components/LabelInput';
import validationSchema from '../../components/Unete/validationSchema';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5rem 0;

  ${device.tablet} {
    padding: 2rem 0;
  }
`;

const FormBlock = styled.form`
  width: 82%;
  height: 100%;
  counter-reset: fieldset;
  display: flex;
  flex-direction: column;

  ${device.tablet} {
    > * {
      margin: 0.5em 0;
    }
  }
`;

const FormikSelect = withSelectStyle(Field);

const ExtendedSelect = styled(FormikSelect)`
  padding: 0.5em 0;
  margin-right: 0;

  ${device.tablet} {
    flex: 1;
    margin-top: 1em;
  }
`;

const CustomButton = Button.extend`
  align-self: flex-end;
  margin-top: 1em;
  width: 10em;
  min-width: 10em;

  ${device.tablet} {
    width: 100%;
  }
`;

const DatePicker = styled(_DatePicker)`
  background: transparent;
  border: 1px solid ${props => props.theme.color.black};
  color: ${props => props.theme.color.black};
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  padding: 0.5em 0;
  font-size: 1.1rem;

  ${device.tablet} {
    margin-top: 1.5em;
  }
`;

function getInitialVaules() {
  const values = {
    nombre: '',
    apellido: '',
    nacimiento: moment(),
    correo: '',
    verificacion: '',
    telefono: '',
    sexo: 'mujer',
    lineaUno: '',
    lineaDos: '',
    estado: '',
  };

  return { ...values };
}

class JoinForm extends React.Component {
  handleBirthdateChange = date => {
    this.setState({ nacimiento: date });
  };
  render() {
    return (
      <Layout>
        <Formik
          initialValues={getInitialVaules()}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            const { verificacion, ...formValues } = values;
            try {
              const response = await fetch('/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: encode({
                  'form-name': 'contacto',
                  ...formValues,
                }),
              });
              alert(JSON.stringify(formValues));
            } catch (exception) {
            } finally {
              actions.setSubmitting(false);
            }
          }}
          render={props => (
            <FormBlock
              name="unete"
              onSubmit={props.handleSubmit}
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <FormikLabelInput text="Nombre(s)" name="nombre" />
              <FormikLabelInput text="Apellidos" name="apellido" />
              <GenericLabelInput
                text="Fecha de nacimiento"
                name="nacimiento"
                InputComponent={p => (
                  <Field
                    render={({ field }) => (
                      <DatePicker
                        selected={props.values[field.name]}
                        onChange={date => props.setFieldValue(field.name, date)}
                        dateFormat="DD/MM/YYYY"
                        name={field.name}
                        showMonthDropdown
                        showYearDropdown
                      />
                    )}
                    {...p}
                  />
                )}
                formikField={true}
              />
              <FormikLabelInput text="Correo" name="correo" />
              <FormikLabelInput
                text="Verificación de correo"
                name="verificacion"
              />
              <FormikLabelInput text="Teléfono" name="telefono" />
              <GenericLabelInput
                text="Sexo"
                name="sexo"
                InputComponent={p => (
                  <ExtendedSelect component="select" {...p}>
                    <option value="mujer">Mujer</option>
                    <option value="hombre">Hombre</option>
                  </ExtendedSelect>
                )}
                formikField={true}
              />
              <FormikLabelInput text="Dirección" name="direccion" />
              <CustomButton type="submit">Enviar</CustomButton>
            </FormBlock>
          )}
        />
      </Layout>
    );
  }
}

export default JoinForm;
