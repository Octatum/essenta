import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import { device } from '../../utilities/device';

const SubsectionHeader = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 700;
  font-size: 1.2em;
  color: ${({ theme }) => theme.color.black};
  margin: 1rem 0;
`;

const PaymentSection = styled.div`
  width: 70%;

  ${device.laptop} {
    width: 90%;
  }

  ${device.tablet} {
    width: 100%;
  }
`;

const CardOption = styled.div`
  display: flex;
  margin-top: 1em;

  ${device.tablet} {
    flex-direction: column;
  }
`;

const CardInputForm = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 700;
  min-width: 19em;
`;

const CardDisplay = styled.div`
  flex: 1;
  min-width: 19em;
  margin-right: 1em;

  ${device.tablet} {
    margin: 1em 0;
    margin-bottom: 2em;
  }

  ${device.tablet} {
    margin: 0.5em 0;
    margin-bottom: 1em;
  }
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1em;
  line-height: 1.3em;
  color: ${({ theme }) => theme.color.black};
  text-align: justify;
`;

function PaymentMethods({
  visibleOption,
  cardName,
  cleanCardNumber,
  cardCvc,
  inputFocus,
  cardChildren,
  cleanCardExpiry,
}) {
  return (
    <div>
      <PaymentSection hidden={visibleOption !== 'SPEI'}>
        <SubsectionHeader>Pago por transferencia Bancaria</SubsectionHeader>
        <Paragraph>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
          error, numquam at odio nulla accusamus esse eius praesentium!
          Veritatis sit ducimus omnis numquam. Dolore, repellendus quae.
        </Paragraph>
      </PaymentSection>
      <PaymentSection hidden={visibleOption !== 'OXXO'}>
        <SubsectionHeader>Pago en OXXO</SubsectionHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
          voluptatum excepturi maiores asperiores eligendi saepe ipsum aut
          facere vero adipisci.
        </Paragraph>
      </PaymentSection>
      <PaymentSection hidden={visibleOption !== 'CARD'}>
        <SubsectionHeader>Pago por tarjeta</SubsectionHeader>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
          explicabo, sint laborum vero dicta, quisquam quasi autem provident
          molestiae atque repellendus? Enim, harum.
        </Paragraph>
        <CardOption>
          <CardDisplay>
            <Cards
              name={cardName}
              number={cleanCardNumber}
              cvc={cardCvc}
              focused={inputFocus}
              expiry={cleanCardExpiry}
            />
          </CardDisplay>
          <CardInputForm>{cardChildren}</CardInputForm>
        </CardOption>
      </PaymentSection>
    </div>
  );
}

PaymentMethods.propTypes = {
  visibleOption: PropTypes.string.isRequired,
  cardChildren: PropTypes.element.isRequired,
};

export default PaymentMethods;
