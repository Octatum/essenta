import styled from 'styled-components';

export const TextInput = styled.input.attrs({
  style: ({ style }) => ({ ...style }),
})`
  background: rgba(255, 255, 255, 0);
  border: 1px solid ${props => props.theme.color.black};
  color: ${props => props.theme.color.black};
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  transition: 0.3s ease background-color;

  :focus {
    background: rgba(255, 255, 255, 0.7);
  }
`;

export const Select = styled.select.attrs({
  style: ({ style }) => ({ ...style }),
})`
  background: ${props =>
    props.orange ? props.theme.color.orange : 'transparent'};
  border: 1px solid ${props => props.theme.color.black};
  color: ${props => props.theme.color.black};
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  transition: 0.3s ease background-color;
  margin-right: 1em;

  :focus {
    background: ${props =>
      props.orange ? props.theme.color.darkOrange : 'white'};
  }
`;
