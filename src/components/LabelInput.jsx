import React from 'react';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withInputStyle, TextInput } from './Input';
import { device } from '../utilities/device';

const ErrorField = styled(ErrorMessage)`
  color: darkred;
  font-size: 1rem;
  text-align: right;
`;

const FormikInput = withInputStyle(Field);

const Label = styled.label`
  font-size: 1.8rem;
  width: 100%;
  font-family: ${props => props.theme.fonts.main};
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.color.black};
  padding: 0.5em 0;

  ${device.tablet} {
    flex-direction: column;
    padding: 0;
    font-size: 1.4rem;
  }

  &[required] > span::after {
    content: '*';
    color: ${props => props.theme.color.orange};
  }
`;

const InputSpace = styled('div')`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > input {
    padding: 0.5rem;
    padding-left: 0.2em;
    font-size: 1.1rem;

    ${device.tablet} {
      margin-top: 1em;
    }
  }

  & > input,
  & > select,
  & .react-datepicker-wrapper,
  & > div {
    box-sizing: border-box;
    width: 60%;
    font-size: 1.1rem;

    ${device.tablet} {
      width: 100%;
    }
  }

  & .react-datepicker__input-container {
    width: 100%;
    transform: translateY(-12.5%);

    & input {
      box-sizing: border-box;
      padding-left: 0.2em;
      width: 100%;
    }
  }
`;

const LabelText = styled('div')`
  flex: 1;
`;

export const GenericLabelInput = ({
  text,
  InputComponent,
  name,
  formikField,
  ...rest
}) => {
  return (
    <Label as="label">
      <LabelText>{text}</LabelText>
      <InputSpace>
        <InputComponent name={name} {...rest} />
        {formikField && <ErrorField name={name} component={'div'} />}
      </InputSpace>
    </Label>
  );
};

GenericLabelInput.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

GenericLabelInput.defaultProps = {
  formikField: false,
};

export default props => (
  <GenericLabelInput InputComponent={TextInput} {...props} />
);

export const FormikLabelInput = props => (
  <GenericLabelInput
    InputComponent={FormikInput}
    formikField={true}
    {...props}
  />
);
