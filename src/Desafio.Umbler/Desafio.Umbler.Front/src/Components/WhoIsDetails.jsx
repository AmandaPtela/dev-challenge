import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

export default function WhoIsDetails({ details }) {
  const [expanded, setExpanded] = React.useState(false);
  const [WhoIsDetails, setDetails] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    function Detail() {
      setDetails(details);
    };
    setTimeout(Detail, 2800);
  }, [details]);

  return (
    <Card
      style={{
        width: "70%",
        minHeight: "10%",
        backgroundColor: "transparent",
        flexDirection: "row",
        overflowY: "scroll"
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
            alignItems: "center"
          }}
        >
          WhoIs info
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
             {WhoIsDetails.whoIs ? WhoIsDetails.whoIs.split("\n").map((key, index) => 
          <Typography key={index} sx={{ marginBottom: 0.3, textAlign: "left" }}>{ key }</Typography>
          )
        : <p>loading...</p>};
        </CardContent>
      </Collapse>
    </Card>
  );
}
