import axios from "axios";

export const api = axios.create({
    baseURL:"http://127.0.0.1:65453/api/domain"
});

export async function getDomain(domain) {
    const response = await api.get(domain);
    console.log(response);
    
}