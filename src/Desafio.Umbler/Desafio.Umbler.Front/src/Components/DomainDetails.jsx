import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { domainContext } from "../Context/Provider";

import "../Styles/DomainDetails.css";
import BackButton from "./BackButton";

export default function DomainDetails() {
  const { domainName, setErrorDetails } = useContext(domainContext);
  let [domainData, setData] = useState([]);
  const navigate = useNavigate();

  useEffect( () => {
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
        Results for <b>{domainData.name}</b>:
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
          <tr>
            <td className="key">WhoIs:</td>
            <td className="value">asa</td>
          </tr>
        </tbody>
      </table>
      <p>WhoIs: </p>
      {loadingToRender ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td className="key">Domain:</td>
              <td className="value">{whoIsData.Domain_Name}</td>
            </tr>
          </tbody>
        </table>
      )}
    </main>
  );
}
