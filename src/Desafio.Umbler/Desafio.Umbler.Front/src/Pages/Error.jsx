import { useEffect, useState, useContext } from "react";
import { domainContext } from "../Context/Provider";

export default function Error() {
  let { errorDetails } = useContext(domainContext);

  return (<h1>{errorDetails}</h1>);
}
