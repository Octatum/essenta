import React from 'react';
import styled from 'styled-components';

import PageLayout from '../components/PageLayout';
import PageHeader from '../components/PageHeader';
import { withHorizontalPadding } from './../components/PageLayout';
import { device } from '../utilities/device';
import { TextInput } from '../components/Input';
import PaymentMethods from '../components/Checkout/PaymentMethods';


const GraySection = styled.section`
  background: ${({theme}) => theme.color.darkGray};
  flex: 1;
`;

const GraySectionWithPadding = withHorizontalPadding(GraySection.extend`
  padding-top: 1em;
  padding-bottom: 1em;
`);

const FormContentSection = styled.section`
  width: 60%;
`;

const PageHeaderWithPadding = withHorizontalPadding(PageHeader.extend`
  padding-bottom: 3rem;

  ${device.tablet} {
    padding-bottom: 2em;
  }
`);

const Spacer = styled.div`  
  background: ${({theme}) => theme.color.black};
  height: 1px;  
  flex: 1;
`;

const Paragraph = styled.p`
  font-family: ${({theme}) => theme.fonts.main};
  font-size: 1em;
  line-height: 1.5em;
  color: ${({theme}) => theme.color.black};
`;

const SubsectionHeader = styled.h2`
  font-family: ${({theme}) => theme.fonts.secondary};
  font-weight: 700;
  font-size: 1.5em;
  color: ${({theme}) => theme.color.black};
`;

const UserDataForm = styled.form`
  margin: 1em 0;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  width: 90%;
  font-family: ${({theme}) => theme.fonts.main};
  justify-content: space-between;
  margin: 1.5em 0;
`;

const LabelText = styled.div`
  font-size: 1.2em;
`;

const Input = TextInput.extend`
  width: 65%;
  border-radius: 0.2em;
  background: ${({theme}) => theme.color.darkGray};
  padding: 0.5em;
  line-height: 1.5em;
  box-sizing: border-box;

  ::placeholder {
    color: white;
  }
`;

const PaymentOptions = styled.div`
  display: flex;
`;

class Checkout extends React.Component {
  state = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddressLine1: '',
    customerAddressLine2: '',
    customerCity: '',
    customerState: '',

    paymentMethod: "SPEI",
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    cardFocused: false
  }

  handleChange = ({target}) => {
    const {name, value} = target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <PageLayout fluid>
        <PageHeaderWithPadding>Checkout</PageHeaderWithPadding>
        <GraySectionWithPadding>
          <FormContentSection>
            <SubsectionHeader>
              Dirección de envío
            </SubsectionHeader>
            <Paragraph>
              Introduce la información sobre la dirección de envío donde se 
              recogerán tus productos Essenta.
            </Paragraph>
            <UserDataForm>
              <InputLabel>
                <LabelText>Nombre</LabelText>
                <Input 
                  value={this.state.customerName} 
                  onChange={this.handleChange}
                  name="customerName"
                />
              </InputLabel>
              <InputLabel>
                <LabelText>Correo</LabelText>
                <Input 
                  value={this.state.customerEmail} 
                  onChange={this.handleChange}
                  name="customerEmail"
                />
              </InputLabel>
              <InputLabel>
                <LabelText>Teléfono</LabelText>
                <Input 
                  value={this.state.customerPhone} 
                  onChange={this.handleChange}
                  name="customerPhone"
                />
              </InputLabel>
              <InputLabel>
                <LabelText>Calle y número</LabelText>
                <Input 
                  value={this.state.customerAddressLine1} 
                  onChange={this.handleChange}
                  name="customerAddressLine1"
                />
              </InputLabel>
              <InputLabel>
                <LabelText>Colonia y CP</LabelText>
                <Input 
                  value={this.state.customerAddressLin2} 
                  onChange={this.handleChange}
                  name="customerAddressLin2"
                />
              </InputLabel>
              <InputLabel>
                <LabelText>Ciudad</LabelText>
                <Input 
                  value={this.state.customerCity} 
                  onChange={this.handleChange}
                  name="customerCity"
                />
              </InputLabel>
              <InputLabel>
                <LabelText>Estado o provincia</LabelText>
                <Input 
                  value={this.state.customerState} 
                  onChange={this.handleChange}
                  name="customerState"
                />
              </InputLabel>
            </UserDataForm>
          </FormContentSection>
        </GraySectionWithPadding>
        <Spacer />
        <GraySectionWithPadding>
          <SubsectionHeader>
            Método de envío
          </SubsectionHeader>
          <Paragraph>
            Selecciona tu método de envío.
          </Paragraph>
        </GraySectionWithPadding>
        <Spacer />
        <GraySectionWithPadding>
          <FormContentSection>
            <SubsectionHeader>
              Opciones de pago
            </SubsectionHeader> 
            <Paragraph>
              Selecciona tu método de pago preferido.
            </Paragraph>
            <PaymentOptions>
              <InputLabel>
                <input 
                  type="radio"
                  name="paymentMethod"
                  value="SPEI"
                  checked={this.state.paymentMethod === 'SPEI'} 
                  onChange={this.handleChange}
                />
              </InputLabel>
              <InputLabel>
                <input 
                  type="radio"
                  name="paymentMethod"
                  value="OXXO"
                  checked={this.state.paymentMethod === 'OXXO'} 
                  onChange={this.handleChange}
                />
              </InputLabel>
              <InputLabel>
                <input 
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={this.state.paymentMethod === 'CARD'} 
                  onChange={this.handleChange}
                />
              </InputLabel>
            </PaymentOptions>
          </FormContentSection>
          <PaymentMethods 
            visibleOption={this.state.paymentMethod} 
            {...this.state}
            handleChange={this.handleChange}
          />
        </GraySectionWithPadding>
      </PageLayout>
    );
  }
}



export default Checkout;