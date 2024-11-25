import React from "react";
import SearchDomain from "../Components/SearchDomain";
import "../Styles/Home.css";

export default function Home() {
    return (
        <main id="mainHomePage">
            <section id="mainSearchArea">
                <h1 id="mainTitle">Try a domain.com </h1>
                <SearchDomain />
            </section>
            <section id="infoArea">
                <p> O domínio é um endereço que os usuários podem digitar no navegador para acessar uma página na internet.
                    Um domínio pode ter várias extensões como <b>.com</b>, <b>.org</b>, <b>.edu</b>, <b>.gov</b> entre outros.
                </p>
            </section>
        </main>

    );
};