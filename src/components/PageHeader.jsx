import React from 'react';
import styled from 'styled-components';

import { device } from '../utilities/device';

const withUnderline = StyledComponent => styled(StyledComponent)`
  &::after {
    content: '';
    display: block;
    margin: 0.1em 0;
    height: 2px;
    background-color: ${({ theme }) => theme.color.orange};
  }
`;

const StyledPageHeader = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${({ theme }) => theme.color.black};
  position: relative;

  ${device.tablet} {
    font-size: 2em;
  }
`;

const UnderlinedPageHeader = withUnderline(StyledPageHeader);

const UnderlinedSection = withUnderline(styled.div`
  width: ${({ full }) => full && '100%'};
`);

function PageHeader({ children, text, full, ...rest }) {
  return (
    <UnderlinedSection full>
      <StyledPageHeader {...rest}>{text}</StyledPageHeader>
      {children}
    </UnderlinedSection>
  );
}

export {
  StyledPageHeader as PageHeaderStyledComponent,
  withUnderline as withHeaderUnderline,
};

export default PageHeader;
