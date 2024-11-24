import React, { useState } from "react";

export default function Search() {
    const [domain, setDomain] = useState("");
    let [valid, setValid] = useState(true);

    function handleValue(value) {
        const regex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$/

        if (value.length === 1 || !regex.test(value)) {
            return setValid(false);
        };
        setValid(true);
        setDomain(value);
    }

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "320px",
                paddingLeft: "9px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                }}
            >
                <input
                    type="text"
                    onChange={({ target }) => handleValue(target.value)}
                    style={{
                        color: "#343434",
                        width: "75%",
                        borderRadius: "0.5em",
                        border: "solid 0.15rem #808080",
                        paddingLeft: "5px",
                        fontSize: "large"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        borderRadius: "0.5em",
                        border: "none",
                        height: "28px",
                        backgroundColor: "pink",
                        fontSize: "medium"
                    }}
                >
                    Buscar
                </button>
            </div>
            <span
                style={{
                    paddingLeft: "17px",
                    color: "red",
                    fontSize: "smaller"
                }}
            >
                {!valid && "Domínio inválido"}
            </span>
        </main>
    )
};