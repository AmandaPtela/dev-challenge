import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { domainContext } from "../Context/Provider";

import "../Styles/SearchDomain.css";

export default function Search() {
  let { setDomainName } = useContext(domainContext);
  const [domain, setDomain] = useState("");
  let [valid, setValid] = useState(true);

  const INPUT_MAX_LENGTH = 50;
  const navigate = useNavigate();

  function handleValue(value) {
    const regex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/;
    
    if (!value.length === 0 || !regex.test(value)) {
      return setValid(false);
    };
    setDomain(value);
    return setValid(true);
  }

  function searchInfo() {
    if (valid) {
      setDomainName(domain);
      return navigate(`api/domain/${domain}`);
    };
    return ;
  }

  return (
    <main id="mainSearchComponent">
      <div id="searchArea">
        <input
          type="text"
          onChange={({ target }) => handleValue(target.value)}
          id="searchInput"
          maxLength={INPUT_MAX_LENGTH}
        />
        <button type="submit" id="searchButton" onClick={() => searchInfo()}>
          Buscar
        </button>
      </div>
      <span id="inputInformation">
        {!valid && "Domínio inválido"}
      </span>
        {/* {data ? (
            <div>
            <DomainDetails />
          </div>
        )
    : (null)} */}
    </main>
  );
}
