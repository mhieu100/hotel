import axios from './axios-customize';
/**
 *
Module User
 */


export const callUpdateUser = (
  id,
  fullname,
  address,
  phone, 
) => {
  return axios.put(`/users/${id}`, {
    fullname,
      
    address,
    phone,
  });
};

export const callFetchUser = (query) => {
  return axios.get(`/users?${query}`);
};

export const callDeleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};

export const callFetchDoctor = () => {
  return axios.get('/users/doctors');
}
