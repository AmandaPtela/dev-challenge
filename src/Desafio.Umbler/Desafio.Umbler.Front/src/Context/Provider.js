import { createContext, useState } from "react";

export const domainContext = createContext();

export function Provider({ children }) {
    let [domainName, setDomainName] = useState("");
    let [whoIsDetails, setWhoIsDetails] = useState("");
    let [errorDetails, setErrorDetails] = useState("");
    let [domainData, setData] = useState([]);
    return (
        <domainContext.Provider value={
            {
                domainName, setDomainName,
                whoIsDetails, setWhoIsDetails,
                errorDetails, setErrorDetails,
                domainData, setData,
            }}>
            {children}
        </domainContext.Provider>
    )
}