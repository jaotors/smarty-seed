import { Request } from './client';

export const login = async params => {
  const token = await Request.post('/login', { params });
  return token;
};

export const getAllProjects = async () => {
  const data = Request.get('/projects');
  return data;
};
