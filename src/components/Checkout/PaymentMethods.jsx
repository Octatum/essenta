import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const SubsectionHeader = styled.h3`
  font-family: ${({theme}) => theme.fonts.secondary};
  font-weight: 700;
  font-size: 1.2em;
  color: ${({theme}) => theme.color.black};
  margin: 1rem 0;
`;

function PaymentMethods ({
  visibleOption,
  handleChange,
  cardName,
  cardExpiry,
  cardNumber,
  cardCvc,
  cardFocused
}) {
  return (
    <div>
      <div hidden={visibleOption !== 'SPEI'}>
        <SubsectionHeader>Pago por transferencia Bancaria</SubsectionHeader>
      </div>
      <div hidden={visibleOption !== 'OXXO'}>
        <SubsectionHeader>Pago en OXXO</SubsectionHeader>
      </div>
      <div hidden={visibleOption !== 'CARD'}>
        <SubsectionHeader>Pago por tarjeta</SubsectionHeader>
        <Cards 
          name={cardName}
          number={cardNumber}
          cvc={cardCvc}
          focused={cardFocused}
          expiry={cardExpiry}
        />
      </div>
    </div>
  )
}

PaymentMethods.propTypes = {
  visibleOption: PropTypes.string.isRequired
};

export default PaymentMethods;