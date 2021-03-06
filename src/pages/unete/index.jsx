import React from 'react';
import styled from 'styled-components';

import Breadcrumbs from '../../components/Breadcrumbs';
import JoinForm from './JoinForm';
import { device } from '../../utilities/device';
import AppLayout from '../../components/AppLayout';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.color.gray};
`;

const TitleBanner = styled.div`
  background: ${props => props.theme.color.orange};
  padding: 2rem 0;
  display: flex;
  justify-content: center;
`;

const TitleBlock = styled.div`
  max-width: 70%;
  font-size: 4.5rem;
  text-align: center;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  color: ${props => props.theme.color.black};
  font-family: ${props => props.theme.fonts.main};

  ${device.laptop} {
    max-width: 80%;
  }

  ${device.tablet} {
    max-width: initial;
    font-size: 3rem;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormDescription = styled.div`
  padding: 2rem 0;
  text-align: center;
  width: 65%;
  font-size: 1.5rem;
  color: ${props => props.theme.color.black};
  font-family: ${props => props.theme.fonts.main};
  line-height: 2rem;
`;

const Spacer = styled.div`
  width: 65%;
  height: 0.1rem;
  background: ${props => props.theme.color.orange};
`;

function Unete() {
  return (
    <AppLayout>
      <Layout>
        <Breadcrumbs />
        <TitleBanner>
          <TitleBlock>Inicia tu propio negocio hoy</TitleBlock>
        </TitleBanner>
        <FormContent>
          <FormDescription>
            Llena este formulario con los datos tal y como aparecen en tu
            documentación probatoria (acta de nacimiento, CURP, IFE y
            comprobante de domicilio reciente).
          </FormDescription>
          <Spacer />
          <JoinForm />
        </FormContent>
      </Layout>
    </AppLayout>
  );
}

export default Unete;
