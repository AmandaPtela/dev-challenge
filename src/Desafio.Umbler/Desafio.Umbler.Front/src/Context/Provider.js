import { createContext, useState } from "react";

export const domainContext = createContext();

export function Provider({ children }) {
    let [domainName, setDomainName] = useState("");
    let [errorDetails, setErrorDetails] = useState("");
    return (
        <domainContext.Provider value={
            {
                domainName, setDomainName,
                errorDetails, setErrorDetails
            }}>
            {children}
        </domainContext.Provider>
    )
}