import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Buttons.css";

export default function BackButton({route}) {
    const navigate = useNavigate();
    return(
      <button
      type="button"
      id= "backButton"
      onClick={() => navigate(route)}
      >
    Back
    </button>
)}
