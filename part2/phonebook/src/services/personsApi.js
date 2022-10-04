import axios from "axios";

const baseUrl = "/api/persons";

const getAllContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};
const addNewContact = (body) => {
  const request = axios.post(baseUrl, body);
  return request.then((res) => res.data);
};
const updateContact = (body, id) => {
  const request = axios.put(`${baseUrl}/${id}`, body);
  return request.then((res) => res.data);
};
const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

export { getAllContacts, addNewContact, updateContact, deleteContact };
