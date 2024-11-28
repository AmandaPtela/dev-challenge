import React, { useContext} from "react"
import { domainContext } from "../Context/Provider"
import { Link } from "react-router-dom";

export default function DomainDetails() {
    const { domainName } = useContext(domainContext);
    
    return (
        <main>
            <Link to="/"><button>Voltar</button></Link>
            <h1>Results for <b>{domainName}</b>:</h1>
            <table>
                <tbody>
                    <tr>
                        <td>domain</td>
                        <td>{domainName}</td>
                    </tr>
                    <tr>
                        <td>host</td>
                        <td>valor</td>
                    </tr>
                    <tr>
                        <td>owner</td>
                        <td>valor</td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
};