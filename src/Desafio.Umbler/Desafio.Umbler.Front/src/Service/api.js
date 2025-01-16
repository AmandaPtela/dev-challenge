import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:44631/",
});

export async function getDomain(domain) {
  const response = await api.get(domain);
    return response;
}
