import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { domainContext } from "../Context/Provider";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function WhoIsDetails() {
  const [expandedInfo, setExpandedInfo] = useState(false);
  const [expandedWarnings, setExpandedInfoWarnings] = useState(false);

  const { domainData, whoIsDetails, setWhoIsDetails } =
    useContext(domainContext);

    setTimeout(() => setWhoIsDetails(domainData.whoIs.split("\n")), 5000);
  
  const handleExpandClick = (target) => {
    console.log(domainData);
    if (target === "Informations") {
      setExpandedInfo(!expandedInfo);
    }
    if (target === "Warnings") {
      setExpandedInfoWarnings(!expandedWarnings);
    }
    if (target === "none") {
      setExpandedInfoWarnings(false);
      setExpandedInfo(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "70%",
          minHeight: "10%",
          maxHeight: "60%",
          backgroundColor: "transparent",
          flexDirection: "row",
          overflowY: "scroll",
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              color: "#343F3E;",
              fontSize: "larger",
              display: "flex",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            Domain Informations
            <ExpandMore
              name="Informations"
              expand={expandedInfo}
              onClick={({ target }) =>
                handleExpandClick(target.parentElement.name)
              }
              aria-expanded={expandedInfo}
              aria-label="show more info"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Typography>
        </CardContent>
        <Collapse in={expandedInfo} timeout="auto">
          <CardContent>
            {whoIsDetails ? (
              whoIsDetails.map((key, index) => (
                <Typography
                  key={index}
                  sx={{ marginBottom: 0.3, textAlign: "left" }}
                >
                  {key}
                </Typography>
              ))
            ) : (
              <p>loading...</p>
            )}
          </CardContent>
        </Collapse>
      </Card>
      <Card
        style={{
          width: "70%",
          minHeight: "10%",
          maxHeight: "60%",
          backgroundColor: "transparent",
          flexDirection: "row",
          overflowY: "scroll",
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              color: "#343F3E;",
              fontSize: "larger",
              display: "flex",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            Warnings
            <ExpandMore
              name="Warnings"
              expand={expandedWarnings}
              onClick={({ target }) =>
                handleExpandClick(target.parentElement.name)
              }
              aria-expanded={expandedWarnings}
              aria-label="show more warnings"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Typography>
        </CardContent>
        <Collapse in={expandedWarnings} timeout="auto">
          <CardContent>
            {whoIsDetails ? (
              whoIsDetails.splice(60).map((key, index) => (
                <Typography
                  key={index}
                  sx={{ marginBottom: 0.3, textAlign: "left" }}
                >
                  {key}
                </Typography>
              ))
            ) : (
              <p>loading...</p>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
