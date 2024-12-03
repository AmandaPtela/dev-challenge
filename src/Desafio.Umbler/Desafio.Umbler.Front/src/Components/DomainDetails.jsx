import React, { useContext, useEffect, useState } from "react"
import { domainContext } from "../Context/Provider";


import SearchDomain from "../Components/SearchDomain";
import "../Styles/DomainDetails.css";

export default function DomainDetails() {
    const { domainName } = useContext(domainContext);
    let [data, setData] = useState([]);
    let [whoIs, setWhoIs] = useState([]);
    let [whoIsData, setWhoIsData] = useState([]);
    let [loadingToRender, setLoadingToRender] = useState(true);
    
    useEffect(() => {
        fetch(`/api/domain/${domainName}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setWhoIs(Object.entries(data)[4].find((e) => e !== "whoIs").split("\n"));
            })
            .catch(error => console.error("Erro ao buscar dados do domínio :", error));
    }, [domainName]);
    
    function setWhoIsDetails() {
        const keyList = [];
        const valueList = [];
        const whoIsData = {};

        whoIs.map((element) => {
            let whoIsKey = element.split(":")[0].split(" ").join("_") ;
            let whoIsValue = element.split(":")[1];
            
            keyList.push(whoIsKey);
            valueList.push(whoIsValue);
            
            whoIsData[whoIsKey] = whoIsValue
            setWhoIsData(whoIsData);
            return console.log(whoIsData);
            
        });
    };

    return (
        <main id="mainDetailsPage">
            <SearchDomain />
            <h1>Results for <b>{data.name}</b>:</h1>
            <table>
                <tbody>
                    <tr>
                        <td className="key">Domain:</td>
                        <td className="value">{data.name}</td>
                    </tr>
                    <tr>
                        <td className="key">IP:</td>
                        <td className="value">{data.ip}</td>
                    </tr>
                    <tr>
                        <td className="key">WhoIs:</td>
                        <td className="value">asa</td>
                    </tr>
                </tbody>
            </table>
            <p>WhoIs: </p>
            { loadingToRender
            ?   <p>Loading...</p>
            :
                <table>
                    <tbody>
                        <tr>
                            <td className="key">Domain:</td>
                            <td className="value">{whoIsData.Domain_Name}</td>
                        </tr>
                    </tbody>
                </table>
        }
        </main>
    )
};