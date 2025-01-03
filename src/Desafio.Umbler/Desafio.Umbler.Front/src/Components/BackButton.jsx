import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton({route}) {
    const navigate = useNavigate();
    return(
      <button
      type="button"
      onClick={() => navigate(route)}
      >
    Back
    </button>
)}
