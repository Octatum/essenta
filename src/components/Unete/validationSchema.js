import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'Este campo es requerido')
    .required('Este campo es requerido'),
  apellido: Yup.string()
    .min(2, 'Este campo es requerido')
    .required('Este campo es requerido'),
  nacimiento: Yup.string()
    .min(2, 'Este campo es requerido')
    .required('Este campo es requerido'),
  correo: Yup.string()
    .min(2, 'Este campo es requerido')
    .required('Este campo es requerido'),
  verificacion: Yup.string().test('match', 'Los correos no coinciden', function(
    emailConfirmation
  ) {
    return emailConfirmation === this.parent.correo;
  }),
  telefono: Yup.string()
    .min(2, 'Este campo es requerido')
    .required('Este campo es requerido'),
  sexo: Yup.string()
    .min(2, 'Este campo es requerido')
    .required('Este campo es requerido'),
  direccion: Yup.string()
    .min(2, 'Este campo es requerido')
    .required('Este campo es requerido'),
});

export default validationSchema;
