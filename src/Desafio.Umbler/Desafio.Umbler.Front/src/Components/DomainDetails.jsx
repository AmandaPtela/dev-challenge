import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { domainContext } from "../Context/Provider";

import "../Styles/DomainDetails.css";
import BackButton from "./BackButton";
import WhoIsDetails from "./WhoIsDetails";

export default function DomainDetails() {
  const { domainName, domainData, setData, setErrorDetails } = useContext(domainContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDomainData = async () => await fetch(`/api/domain/${domainName}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      if(data.redirectUrl) {
        setErrorDetails(data.redirectUrl);
        return navigate("/Error/Error");
      }
    });
    
    fetchDomainData();
    
  }, [domainName]);

  return (
    <main id="mainDetailsPage">
      <BackButton route={"/"} />
      {/* <SearchDomain />
 */}      <h1>
        Results for <b>{domainName}</b>:
      </h1>
      <table>
        <tbody>
          <tr>
            <td className="key">Domain:</td>
            <td className="value">{domainData.name}</td>
          </tr>
          <tr>
            <td className="key">IP:</td>
            <td className="value">{domainData.ip}</td>
          </tr>
        </tbody>
      </table>
      <WhoIsDetails/>
    </main>
  );
}
