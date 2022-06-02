import axios from 'axios';

import { CompanyAPI, JobOfferAPI, AspirantAPI } from './api';

const getAxiosInstance = () => {
  let headers = { 'Content-Type': 'application/json' };
  const idToken = localStorage.getItem('idToken');

  if (idToken) {
    headers = { ...headers, Authorization: `Bearer ${idToken}` };
  }

  return axios.create({
    headers,
    baseURL: import.meta.env.VITE_SERVER_URL,
  });
};

const useAPI = () => {
  const axiosInstance = getAxiosInstance();

  return {
    company: new CompanyAPI(axiosInstance),
    jobOffer: new JobOfferAPI(axiosInstance),
    aspirant: new AspirantAPI(axiosInstance),
  };
};

export default useAPI;
