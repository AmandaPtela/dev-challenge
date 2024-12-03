import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:65453/",
});

export async function getDomain(domain) {
  const response = await api.get(domain);
  console.log("ENTROU");
    console.log(response.status);
    
    return response;
}
