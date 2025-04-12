import axios from './axios-customize';

/**
 *
Module Room
 */

export const callCreateRoom = (
  roomNumber,
  type,
  pricePerNight,
  maxOccupancy,
  features,

) => {
  return axios.post('/rooms', {
    roomNumber,
    type,
    pricePerNight,
    maxOccupancy,
    features,
  });
};

export const callUpdateRoom = (
  id,
  roomNumber,
  type,
  pricePerNight,
  maxOccupancy,
  features,
) => {
  return axios.put(`/rooms/${id}`, {
    roomNumber,
    type,
    pricePerNight,
    maxOccupancy,
    features,
  });
};

export const callFetchRoomById = (id) => {
  return axios.get(`/rooms/${id}`);
};

export const callFetchRoom = (query) => {
  return axios.get(`/rooms?${query}`);
};

export const callDeleteRoom = (id) => {
  return axios.delete(`/rooms/${id}`);
};

