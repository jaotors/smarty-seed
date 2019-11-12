import { Request } from './client';

export const login = async params => {
  const data = await Request.post('/login', { params });
  return data;
};

export const getUser = async token => {
  const data = await Request.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAllProjects = async () => {
  const data = Request.get('/projects');
  return data;
};

export const getProject = async projectId => {
  const data = Request.get(`/projects/${projectId}`);
  return data;
};
