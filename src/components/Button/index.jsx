import styled from 'styled-components';

const Button = styled.button.attrs({
  style: ({style}) => ({...style})
})`
  background: ${props => props.theme.color.orange};
  color: ${props => props.theme.color.white};
  border: none;
  box-sizing: border-box;
  font-family: ${props => props.theme.fonts.secondary};
  text-transform: uppercase;
  font-size: ${({small}) => small ? '1' : '1.5'}em;
  border-radius: 6px;
  transition: 0.3s ease all;
  -webkit-box-shdow: 0px 0.2em 1em -0.2em rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0.2em 1em -0.2em rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0.2em 1em -0.2em rgba(0, 0, 0, 0.3);
  padding: 0.6em;

  &:active {
    -webkit-box-shadow: 0px 0.3em 1em -0.2em rgba(0,0,0,0.65);
    -moz-box-shadow: 0px 0.3em 1em -0.2em rgba(0,0,0,0.65);
    box-shadow: 0px 0.3em 1em -0.2em rgba(0,0,0,0.65);
  }

  &:focus {
    background: ${props => props.theme.color.darkOrange};
  }
`;

export default Button;