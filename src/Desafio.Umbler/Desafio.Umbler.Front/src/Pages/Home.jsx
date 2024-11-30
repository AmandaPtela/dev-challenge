import React, { useState } from "react";
import SearchDomain from "../Components/SearchDomain";
import "../Styles/Home.css";
import { useEffect } from "react";

export default function Home() {
    let [indexState, setIndex] = useState(0);
    const extensions = [".com", ".net", ".org", ".edu"];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % extensions.length);
        }, 1510);

        return () => clearInterval(interval);
    }, [extensions.length]);

    return (
        <main id="mainHomePage">
            <section id="mainSearchArea">
            <h1 id="mainTitle">Try a domain<span id="dotCom">{extensions[indexState]}</span> </h1>
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