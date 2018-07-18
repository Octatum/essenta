import styled from "styled-components";

const HomeHeader = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: bold;
  font-size: 2rem;
  padding: 1rem 3rem;
  color: ${props => props.theme.color.black};
  text-transform: uppercase;
  letter-spacing: -0.1em;
`;

export default HomeHeader;