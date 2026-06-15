import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
  
  import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import { DataGrid } from '@mui/x-data-grid';
import EmpresasForm from './empresasForm';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import DialogContent from '@mui/material/DialogContent';


const FactCompaniesGrid = () => {
    const [openForm, setOpenForm] = useState(false);
      const handleOpenForm = () => {
            setOpenForm(true);
        };

        const handleCloseForm = () => {
            setOpenForm(false);
        };

        const handleSubmitCompany = async (payload) => {
            console.log('Empresa a guardar:', payload);

            // Aquí llamas tu API
            // await api.post('/companies', payload);

            handleCloseForm();

            // Aquí recargas la tabla
            // await getCompanies();
        };
        const comunas = [
            { Id: 1, ComNombre: 'Rancagua' },
            { Id: 2, ComNombre: 'Machalí' },
            { Id: 3, ComNombre: 'Santiago' }
            ];
  const rows = [
    {
      Id: 1,
      ComRut: '76.123.456-7',
      ComRazonSocial: 'Comercial Demo SpA',
      ComGiro: 'Venta al por menor',
      ComDireccion: 'Av. Siempre Viva 123',
      FactComunaNombre: 'Rancagua',
      ComActiva: true
    },
    {
      Id: 2,
      ComRut: '77.987.654-3',
      ComRazonSocial: 'Servicios Demo Ltda.',
      ComGiro: 'Servicios informáticos',
      ComDireccion: 'Los Carrera 456',
      FactComunaNombre: 'Machalí',
      ComActiva: false
    }
  ];

  const columns = [
    {
      field: 'ComRut',
      headerName: 'RUT',
      width: 150
    },
    {
      field: 'ComRazonSocial',
      headerName: 'Razón Social',
      flex: 1,
      minWidth: 220
    },
    {
      field: 'ComGiro',
      headerName: 'Giro',
      flex: 1,
      minWidth: 220
    },
    {
      field: 'ComDireccion',
      headerName: 'Dirección',
      flex: 1,
      minWidth: 220
    },
    {
      field: 'FactComunaNombre',
      headerName: 'Comuna',
      width: 150
    },
    {
      field: 'ComActiva',
      headerName: 'Estado',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Activa' : 'Inactiva'}
          color={params.value ? 'success' : 'default'}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary" onClick={() => console.log('Editar:', params.row)}>
            <EditOutlined />
          </IconButton>

          <IconButton size="small" color="error" onClick={() => console.log('Eliminar:', params.row)}>
            <DeleteOutlined />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <><Box>
          <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
              sx={{ mb: 2 }}
          >
              <Typography variant="h5">Listado de empresas</Typography>

              <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => handleOpenForm()}>
                  Nueva Empresa
              </Button>
          </Stack>

          <Box sx={{ height: 520, width: '100%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.Id}
                  pageSizeOptions={[5, 10, 25]}
                  initialState={{
                      pagination: {
                          paginationModel: {
                              page: 0,
                              pageSize: 10
                          }
                      }
                  }}
                  disableRowSelectionOnClick />
          </Box>
      </Box><Dialog
          open={openForm}
          onClose={handleCloseForm}
          fullWidth
          maxWidth="md"
      >
              <DialogTitle>Nueva Empresa</DialogTitle>

              <Divider />

              <DialogContent sx={{ p: 3 }}>
                  <EmpresasForm
                      comunas={comunas}
                      onSubmit={handleSubmitCompany}
                      onCancel={handleCloseForm} />
              </DialogContent>
          </Dialog></>
  );
};

export default FactCompaniesGrid;