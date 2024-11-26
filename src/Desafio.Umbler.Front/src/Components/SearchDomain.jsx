import React, { useState } from "react";
import "../Styles/SearchDomain.css";

export default function Search() {
    const [domain, setDomain] = useState("");
    let [valid, setValid] = useState(true);

    const INPUT_MAX_LENGTH = 50;

    function handleValue(value) {
        const regex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/

        if (!value.length === 0 || !regex.test(value)) {
            return setValid(false);
        };
        setValid(true);
        setDomain(value);
    }

    function searchInfo() {
        //Fazer requisição pra api
        //api.get, api.post...
        //retornar informações 
        // ou 
        // retornar erro (caso houver);
        console.log(domain);
    }

    return (
        <main id="mainSearchComponent" >
            <div id="searchArea">
                <input
                    type="text"
                    onChange={({ target }) => handleValue(target.value)}
                    id="searchInput"
                    maxLength={INPUT_MAX_LENGTH}
                />
                <button
                    type="submit"
                    id="searchButton"
                    onClick={() => searchInfo()}
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