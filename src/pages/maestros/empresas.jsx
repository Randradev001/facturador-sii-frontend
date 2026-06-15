// material-ui
import { useState } from 'react';

// material-ui
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'components/MainCard';
import FactCompaniesGrid from './empresasGrid';
import FactCompanyFilters from './FactCompanyFilters';

// ==============================|| EMPRESAS PAGE ||============================== //

const Empresas = () => {
  const [filters, setFilters] = useState({
    rut: '',
    nombre: '',
    comunaId: ''
  });

  const comunas = [
    {
      Id: 1,
      ComNombre: 'Santiago'
    },
    {
      Id: 2,
      ComNombre: 'Rancagua'
    },
    {
      Id: 3,
      ComNombre: 'Machalí'
    }
  ];

  const handleSearch = (newFilters) => {
    setFilters(newFilters);

    console.log('Filtros aplicados:', newFilters);

    // Más adelante aquí puedes llamar tu API:
    // getCompanies(newFilters);
  };

  return (
    <MainCard title="Registro de empresas">
      <Stack spacing={3}>
        <FactCompanyFilters comunas={comunas} onSearch={handleSearch} />

        <FactCompaniesGrid filters={filters} />
      </Stack>
    </MainCard>
  );
};

export default Empresas;