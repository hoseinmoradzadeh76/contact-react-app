import axios from "axios";

const SERVER_URL = "http://localhost:9000";

export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);

}
export const getAllgroup = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);

}
export const getgroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);

}
export const createCantact = (contact) => {
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url, contact);

}
export const updateContact = (contact, contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact);

}
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);

}