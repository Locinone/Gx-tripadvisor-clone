import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/attractions/';


export function getAllAttractionsService(params = {}) {
  return axios.get(API_URL, { params });
}

export function getAttractionByIdService(id) {
  return axios.get(`${API_URL}${id}/`);
}


export function createAttractionService(data) {
  return axios.post(API_URL, data);
}


export function updateAttractionService(id, data) {
  return axios.put(`${API_URL}${id}/`, data);
}

export function deleteAttractionService(id) {
  return axios.delete(`${API_URL}${id}/`);
}
