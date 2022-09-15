import { fetchRequest, deleteRequest } from "./fetch-request";

export const getNote = async (url, token, note_id) => {
  const full_url = `${url}/notes/${note_id}`;
  return await fetchRequest( full_url, token, {}, "GET" );
};

export const updateNote = async (url, token, note_params, note_id) => {
  const full_url = `${url}/notes/${note_id}`;
  return await fetchRequest( full_url, token, note_params, "PATCH" );
};

export const deleteNote = async (url, token, note_id) => {
  const full_url = `${url}/notes/${note_id}`;
  return await deleteRequest( full_url, token);
};

export const createNote = async (url, token, note_params) => {
  const full_url = `${url}/notes/`;
  return await fetchRequest( full_url, token, note_params, "POST" );
};

export const fetchUserNotes = async (url, token, userId) => {
  const full_url = `${url}/users/${userId}/notes`;
  return await fetchRequest(full_url, token, {}, "GET");
};
