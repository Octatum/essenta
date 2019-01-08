import React from 'react';
import styled from 'styled-components';
import ReactPopup from 'reactjs-popup';

import { device } from '../utilities/device';

const Container = styled.div`
  background: ${({ theme }) => theme.color.black};
  color: white;
  display: flex;
  flex-direction: column;
  width: 40vw;
  box-sizing: border-box;
  padding: 1.5rem;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 0.5em;

  ${device.tablet} {
    width: 60vw;
  }

  ${device.mobile} {
    width: 80vw;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  font-size: 3rem;
  line-height: 0.5em;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
`;

const IconDisplay = styled.img`
  margin-bottom: 1.5rem;
  width: 3em;
`;

const contentStyle = {
  padding: '0',
  border: '0',
  background: 'transparent',
  width: 'initial',
};

const PopupContent = styled.div`
  font-size: calc(1rem + 0.5vw);
  text-align: center;
  font-family: ${props => props.theme.fonts.secondary};
`;

function Popup({ icon, popupText, ...rest }) {
  return (
    <ReactPopup contentStyle={contentStyle} modal {...rest}>
      {close => (
        <Container>
          <CloseButton onClick={close}>&times;</CloseButton>
          <div>
            <IconDisplay src={icon} alt="Popup icon" />
          </div>
          <PopupContent>{popupText}</PopupContent>
        </Container>
      )}
    </ReactPopup>
  );
}

export default Popup;
