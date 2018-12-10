import * as yup from 'yup';

const customerValidationSchema = yup.object().shape({
  customerName: yup.string().required("Por favor, llena el campo 'Nombre'"),
  customerEmail: yup.string().required("Por favor, llena el campo 'Correo'"),
  customerPhone: yup.string().required("Por favor, llena el campo 'Teléfono'"),
  customerAddressLine1: yup
    .string()
    .required("Por favor, llena el campo 'Calle y número'"),
  customerAddressLine2: yup
    .string()
    .required("Por favor, llena el campo 'Colonia y CP'"),
  customerCity: yup.string().required("Por favor, llena el campo 'Ciudad'"),
  customerState: yup
    .string()
    .required("Por favor, llena el campo 'Estado o provincia'"),
  customerCountry: yup.string().required("Por favor, llena el campo 'País'"),
});

export default customerValidationSchema;
