import React, { useState } from "react";

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
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: "9px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    color: "#343F3E",
                }}
            >
                <input
                    type="text"
                    onChange={({ target }) => handleValue(target.value)}
                    style={{
                        width: "75%",
                        borderRadius: "0.5em",
                        border: "solid 0.15rem #808080",
                        paddingLeft: "5px",
                        fontSize: "large",
                        color: "#343F3E",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        borderRadius: "0.5em",
                        border: "none",
                        outline: "none",
                        height: "50px",
                        width: "100px",
                        backgroundColor: "#BFB48F",
                        fontSize: "medium",
                        fontWeight: "600",
                        color: "#343F3E",
                    }}
                >
                    Buscar
                </button>
            </div>
            <span
                style={{
                    paddingLeft: "20px",
                    color: "red",
                    fontSize: "smaller"
                }}
            >
                {!valid && "Domínio inválido"}
            </span>
        </main>
    )
};