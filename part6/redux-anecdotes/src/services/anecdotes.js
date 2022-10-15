import axios from "axios";

const baseUrl = "/anecdotes";

export const getAllAnecdotes = async () => {
  const request = axios.get(baseUrl);
  const res = await request;
  return res.data;
};
export const addNewAnecdotes = async (body) => {
  const request = axios.post(baseUrl, body);
  const res = await request;
  return res.data;
};
export const incremntVoteOnAnecdotes = async (id, body) => {
  const request = axios.put(`${baseUrl}/${id}`, body);
  const res = await request;
  return res.data;
};
