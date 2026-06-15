// material-ui
import { useState } from 'react';

// material-ui
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'components/MainCard';
import FactCompaniesGrid from './empresasGrid';
import FactCompanyFilters from './FactCompanyFilters';
import { getComunas } from '../../api/siiApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// ==============================|| EMPRESAS PAGE ||============================== //

const Empresas = () => {
  const [filters, setFilters] = useState({
    rut: '',
    nombre: '',
    comunaId: ''
  });
  const {
    data: comunas = [],
    isLoading: loadingComunas,
    isError: errorComunas
    } = useQuery({
    queryKey: ['comunas'],
    queryFn: getComunas
    });
  

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