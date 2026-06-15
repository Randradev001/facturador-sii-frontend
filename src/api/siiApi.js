import api from './api';

export const getCompanies = async (filters = {}) => {
  const response = await api.post('/dte/getCompanies', {
    params: filters
  });

  return response.data;
};

export const createCompany = async (payload) => {
  const response = await api.post('/dte/createCompany', payload);

  return response.data;
};

export const getComunas = async () => {
  const response = await api.post('/dte/getComunas');

  return response.data;
};