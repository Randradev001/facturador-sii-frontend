import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import SaveOutlined from '@ant-design/icons/SaveOutlined';
import ClearOutlined from '@ant-design/icons/ClearOutlined';

import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  rut: Yup.string()
    .trim()
    .required('El RUT es obligatorio')
    .matches(/^(\d{1,2}\.?\d{3}\.?\d{3}-[\dkK])$/, 'Ingrese un RUT válido. Ej: 76.123.456-7'),

  razonSocial: Yup.string()
    .trim()
    .required('La razón social es obligatoria')
    .min(2, 'Debe ingresar al menos 2 caracteres')
    .max(150, 'La razón social no puede superar 150 caracteres'),

  giro: Yup.string()
    .trim()
    .required('El giro es obligatorio')
    .min(3, 'Debe ingresar al menos 3 caracteres')
    .max(120, 'El giro no puede superar 120 caracteres'),

  direccion: Yup.string()
    .trim()
    .required('La dirección es obligatoria')
    .min(3, 'Debe ingresar al menos 3 caracteres')
    .max(200, 'La dirección no puede superar 200 caracteres'),

  comunaId: Yup.string().required('La comuna es obligatoria'),

  ciudad: Yup.string()
    .trim()
    .required('La ciudad es obligatoria')
    .max(100, 'La ciudad no puede superar 100 caracteres'),

  email: Yup.string()
    .trim()
    .email('Ingrese un email válido')
    .max(150, 'El email no puede superar 150 caracteres')
    .nullable(),

  telefono: Yup.string()
    .trim()
    .matches(/^$|^[0-9+\s-]{8,20}$/, 'Ingrese un teléfono válido')
});

const EmpresasForm = ({ comunas = [], initialData = null, onSubmit, onCancel }) => {
  const initialValues = {
    rut: initialData?.Rut || '',
    razonSocial: initialData?.RazonSocial || '',
    giro: initialData?.Giro || '',
    direccion: initialData?.Direccion || '',
    comunaId: initialData?.ComunaId || '',
    ciudad: initialData?.Ciudad || '',
    email: initialData?.Email || '',
    telefono: initialData?.Telefono || '',
    activo: initialData?.Activo ?? true
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        const payload = {
          rut: values.rut.trim(),
          razonSocial: values.razonSocial.trim(),
          giro: values.giro.trim(),
          direccion: values.direccion.trim(),
          comunaId: values.comunaId,
          ciudad: values.ciudad.trim(),
          email: values.email.trim(),
          telefono: values.telefono.trim(),
          activo: values.activo
        };

        onSubmit(payload);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
        isSubmitting
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                id="rut"
                name="rut"
                label="RUT Empresa"
                value={values.rut}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="76.123.456-7"
                variant="outlined"
                error={Boolean(touched.rut && errors.rut)}
                helperText={touched.rut && errors.rut ? errors.rut : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                id="razonSocial"
                name="razonSocial"
                label="Razón Social"
                value={values.razonSocial}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Empresa Demo SpA"
                variant="outlined"
                error={Boolean(touched.razonSocial && errors.razonSocial)}
                helperText={touched.razonSocial && errors.razonSocial ? errors.razonSocial : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                id="giro"
                name="giro"
                label="Giro"
                value={values.giro}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Desarrollo de software"
                variant="outlined"
                error={Boolean(touched.giro && errors.giro)}
                helperText={touched.giro && errors.giro ? errors.giro : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                id="direccion"
                name="direccion"
                label="Dirección"
                value={values.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Av. Principal 123"
                variant="outlined"
                error={Boolean(touched.direccion && errors.direccion)}
                helperText={touched.direccion && errors.direccion ? errors.direccion : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                id="comunaId"
                name="comunaId"
                label="Comuna"
                value={values.comunaId}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                error={Boolean(touched.comunaId && errors.comunaId)}
                helperText={touched.comunaId && errors.comunaId ? errors.comunaId : ''}
              >
                <MenuItem value="">
                  <em>Seleccione comuna</em>
                </MenuItem>

                {comunas.map((comuna) => (
                  <MenuItem key={comuna.Id} value={comuna.Id}>
                    {comuna.ComNombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                id="ciudad"
                name="ciudad"
                label="Ciudad"
                value={values.ciudad}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Rancagua"
                variant="outlined"
                error={Boolean(touched.ciudad && errors.ciudad)}
                helperText={touched.ciudad && errors.ciudad ? errors.ciudad : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                id="telefono"
                name="telefono"
                label="Teléfono"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+56 9 1234 5678"
                variant="outlined"
                error={Boolean(touched.telefono && errors.telefono)}
                helperText={touched.telefono && errors.telefono ? errors.telefono : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="contacto@empresa.cl"
                variant="outlined"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email ? errors.email : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.activo}
                    onChange={(event) => {
                      setFieldValue('activo', event.target.checked);
                    }}
                  />
                }
                label="Empresa activa"
              />
            </Grid>

            <Grid size={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<ClearOutlined />}
                  onClick={() => {
                    resetForm();

                    if (onCancel) {
                      onCancel();
                    }
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveOutlined />}
                  disabled={isSubmitting}
                >
                  Guardar Empresa
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default EmpresasForm;