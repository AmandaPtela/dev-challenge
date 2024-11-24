import React, { useState } from "react";

export default function Search() {
    const [domain, setDomain] = useState("");
    let [valid, setValid] = useState(true);

    function handleValue(value) {
        const regex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/

        if (value.length <= 1 || !regex.test(value)) {
            return setValid(false);
        };
        setValid(true);
        setDomain(value);
    }

    return (
        <main>
            <input
                type="text"
                onChange={({ target }) => handleValue(target.value)}
            />
            <button
                type="submit"
            >
                Buscar
            </button>
            <span>
                {!valid && "Domínio inválido"}
            </span>
        </main>
    )
};