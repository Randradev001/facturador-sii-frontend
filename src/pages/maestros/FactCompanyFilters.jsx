import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import SearchOutlined from '@ant-design/icons/SearchOutlined';
import ClearOutlined from '@ant-design/icons/ClearOutlined';

import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  rut: Yup.string()
    .trim()
    .matches(
      /^$|^(\d{1,2}\.?\d{3}\.?\d{3}-[\dkK])$/,
      'Ingrese un RUT válido. Ej: 76.123.456-7'
    ),

  nombre: Yup.string()
    .trim()
    .min(2, 'Debe ingresar al menos 2 caracteres')
    .max(150, 'La razón social no puede superar 150 caracteres'),

  comunaId: Yup.mixed().nullable()
});

const FactCompanyFilters = ({ comunas = [], onSearch }) => {
  return (
    <Formik
      initialValues={{
        rut: '',
        nombre: '',
        comunaId: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const filters = {
          rut: values.rut.trim(),
          nombre: values.nombre.trim(),
          comunaId: values.comunaId
        };

        onSearch(filters);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                id="rut"
                name="rut"
                label="RUT"
                value={values.rut}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="76.123.456-7"
                variant="outlined"
                error={Boolean(touched.rut && errors.rut)}
                helperText={touched.rut && errors.rut ? errors.rut : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                id="nombre"
                name="nombre"
                label="Razón Social"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Buscar por nombre"
                variant="outlined"
                error={Boolean(touched.nombre && errors.nombre)}
                helperText={touched.nombre && errors.nombre ? errors.nombre : ''}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
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
                  <em>Todas</em>
                </MenuItem>

                {comunas.map((comuna) => (
                  <MenuItem key={comuna.Id} value={comuna.Id}>
                    {comuna.ComNombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="small"
                  startIcon={<SearchOutlined />}
                  
                >
                  Buscar
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<ClearOutlined />}
                  sx={{ height: 40, minWidth: 56 }}
                  onClick={() => {
                    resetForm();

                    onSearch({
                      rut: '',
                      nombre: '',
                      comunaId: ''
                    });
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default FactCompanyFilters;