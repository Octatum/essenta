import styled from 'styled-components';

export const withInputStyle = component => styled(component)`
  background: rgba(255, 255, 255, 0);
  border: 1px solid ${props => props.theme.color.black};
  color: ${props => props.theme.color.black};
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  transition: 0.3s ease background-color;

  :focus {
    background: rgba(255, 255, 255, 0.7);
  }

  :disabled {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const TextInput = withInputStyle('input');

export const withSelectStyle = component => styled(component)`
  background: ${props =>
    props.orange ? props.theme.color.orange : 'transparent'};
  border: 1px solid ${props => props.theme.color.black};
  color: ${props => props.theme.color.black};
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  transition: 0.3s ease background-color;
  margin-right: 1em;

  & > option {
    font-size: 1.1em;
    font-weight: inherit;
  }

  :focus {
    background: ${props =>
      props.orange ? props.theme.color.darkOrange : 'white'};
  }
`;

export const Select = withSelectStyle('select');
