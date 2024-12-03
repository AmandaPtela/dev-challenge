import React, { useContext, useEffect, useState } from "react"
import { domainContext } from "../Context/Provider";
import { getDomain } from "../Service/api";

import SearchDomain from "../Components/SearchDomain";
import "../Styles/DomainDetails.css";

export default function DomainDetails() {
    const { domainName } = useContext(domainContext);
    let [data, setData] = useState([])
    
    useEffect(() => {
        fetch(`/api/domain/${domainName}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Erro ao buscar dados do domínio:", error));
    }, [domainName]);

    const chaves = Object.entries(data).filter((e) => !e.includes("whoIs"));
    const whoIs = Object.entries(data).filter((e) => e.includes("whoIs"));

    return (
        <main id="mainDetailsPage">
            <SearchDomain />
            <h1>Results for <b>{domainName}</b>:</h1>
            <table>
                <tbody>
                    <tr>
                        <td className="key">domain:</td>
                        <td className="value">{domainName}</td>
                    </tr>
                    <tr>
                        <td className="key">host:</td>
                        <td className="value">valor</td>
                    </tr>
                    <tr>
                        <td className="key">owner:</td>
                        <td className="value">valor</td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
};