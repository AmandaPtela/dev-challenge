import React from "react";
import SearchDomain from "../Components/SearchDomain";

export default function Home() {
    return (
        <main style={{ backgroundColor: "#F2EFE9", color: "#343F3E", display: "flex", height: "100vh", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <section style={{ height: "30%", width: "50%" }}>
                <h1 style={{ fontWeight: "700" }}>Try a domain!</h1>
                <SearchDomain />
            </section>
            <section style={{ width: "58%" }}>
                <p> O domínio é um endereço que os usuários podem digitar no navegador para acessar uma página na internet.
                    Um domínio pode ter várias extensões como <b>.com</b>, <b>.org</b>, <b>.edu</b>, <b>.gov</b> entre outros.
                </p>
            </section>
        </main>

    );
};