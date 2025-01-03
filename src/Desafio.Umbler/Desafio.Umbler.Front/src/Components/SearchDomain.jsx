import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { domainContext } from "../Context/Provider";

import "../Styles/SearchDomain.css";

export default function Search() {
  let { setDomainName } = useContext(domainContext);
  const [domain, setDomain] = useState("");
  let [valid, setValid] = useState(true);

  const INPUT_MAX_LENGTH = 50;
  const DOMAIN_MAX_LENGTH = 30;

  const navigate = useNavigate();
  const baseUrl = "api/domain";

  function handleValue(value) {
    const regex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/;

    if (
      (!value.length === 0 && !value.length > DOMAIN_MAX_LENGTH) ||
      !regex.test(value)
    ) {
      return setValid(false);
    };

    setDomain(value);
    return setValid(true);
  }

  function searchInfo() {
    if (valid) {
      setDomainName(domain);
      return navigate(`${baseUrl}/${domain}`);
    };
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
        <button
          disabled={!valid}
          type="submit"
          id="searchButton"
          onClick={() => searchInfo()}
        >
          Buscar
        </button>
      </div>
      <span id="inputInformation">{!valid && "Domínio inválido"}</span>
    </main>
  );
}
