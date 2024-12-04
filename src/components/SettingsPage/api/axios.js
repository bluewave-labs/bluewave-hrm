import globalAxios from 'axios';

export const axios = globalAxios.create({
  baseURL: 'http://localhost:3000/api/', // Base URL for all requests
});