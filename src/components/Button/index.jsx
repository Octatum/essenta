import styled from 'styled-components';

const Button = styled.button.attrs({
  style: ({style}) => ({...style})
})`
  background: ${props => props.theme.color.orange};
  color: ${props => props.theme.color.white};
  border: none;
  font-family: ${props => props.theme.fonts.secondary};
  text-transform: uppercase;
  font-size: 1.5em !important;
  border-radius: 6px;
  transition: 0.3s ease all;
  -webkit-box-shdow: 0px 10px 60px -15px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 10px 60px -15px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 10px 60px -15px rgba(0, 0, 0, 0.3);
  padding: 1rem;

  &:active {
    -webkit-box-shadow: 0px 10px 60px -15px rgba(0,0,0,0.50);
    -moz-box-shadow: 0px 10px 60px -15px rgba(0,0,0,0.50);
    box-shadow: 0px 10px 60px -15px rgba(0,0,0,0.50);
  }

  &:focus {
    background: ${props => props.theme.color.darkOrange};
  }
`;

export default Button;