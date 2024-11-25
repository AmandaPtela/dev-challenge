import React, { useState } from "react";
import "../Styles/SearchDomain.css";

export default function Search() {
    const [domain, setDomain] = useState("");
    let [valid, setValid] = useState(true);

    function handleValue(value) {
        const regex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/

        if (!value.length === 0 || !regex.test(value)) {
            return setValid(false);
        };
        setValid(true);
        setDomain(value);
    }

    return (
        <main id="mainSearchComponent" >
            <div id="searchArea">
                <input
                    type="text"
                    onChange={({ target }) => handleValue(target.value)}
                    id="searchInput"
                />
                <button
                    type="submit"
                    id="searchButton"
                >
                    Buscar
                </button>
            </div>
            <span id="inputInformation" >
                {!valid && "Domínio inválido"}
            </span>
        </main>
    )
};