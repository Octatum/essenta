import styled from 'styled-components'

import { device } from '../utilities/device'

const PageHeader = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({ theme }) => theme.color.black};
  position: relative;
  ${({ underline }) =>
    underline &&
    `::after {
      content: "";
      display: block;
      margin: 0.1em 0;
      height: 2px;
      background-color: ${({ theme }) => theme.color.orange};
    }`} ${device.tablet} {
    font-size: 2em;
  }
`

export default PageHeader
