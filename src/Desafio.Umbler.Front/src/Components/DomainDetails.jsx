import React, { useContext } from "react"
import { domainContext } from "../Context/Provider";

import SearchDomain from "../Components/SearchDomain";
import "../Styles/DomainDetails.css";

export default function DomainDetails() {
    const { domainName } = useContext(domainContext);

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