import styled from 'styled-components';
import { device } from '../../utilities/device';
import { withHeaderUnderline } from '../PageHeader';

const HomeHeader = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: bold;
  font-size: 2rem;
  padding: 1rem 3rem;
  color: ${props => props.theme.color.black};
  text-transform: uppercase;
  letter-spacing: -0.1em;

  ${device.tablet} {
    font-size: 1.5rem;
  }
`;

export default (HomeHeader);
