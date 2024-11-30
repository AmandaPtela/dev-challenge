import { createContext, useState } from "react";

export const domainContext = createContext();

export function Provider({ children }) {
    let [domainName, setDomainName] = useState("");
    return (
        <domainContext.Provider value={
            {
                domainName, setDomainName
            }}>
            {children}
        </domainContext.Provider>
    )
}