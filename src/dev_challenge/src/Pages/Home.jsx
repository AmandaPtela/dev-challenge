import React from "react";
import SearchDomain from "../Components/SearchDomain";

export default function Home() {
    return (
        <>
            <header>
                <p>Try a domain!</p>
            </header>
            <main>
                <SearchDomain />
            </main>
        </>
    );
};