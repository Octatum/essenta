import styled from 'styled-components';
import Link from 'gatsby-link';

import { device } from '../../utilities/device';

const AppLink = styled(Link)`
  text-decoration: none;
  &:visited {
    text-decoration: none;
  }
`;

const NavbarLink = AppLink.extend`
  text-transform: uppercase;
  font-size: 1.2rem;
  color: ${props => props.theme.color.black};
  font-family: ${props => props.theme.fonts.secondary};
  ${device.mobile} {
    font-size: 0.9em;
  }
`;

export default NavbarLink;
