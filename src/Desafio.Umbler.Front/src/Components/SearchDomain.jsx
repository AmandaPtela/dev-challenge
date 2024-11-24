import React, { useState } from "react";

export default function Search() {
    const [domain, setDomain] = useState("");

    function handleValue(value) {
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
        </main>
    )
};