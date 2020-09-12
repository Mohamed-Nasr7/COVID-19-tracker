import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import numeral from "numeral";

function InfoBox({ title, cases, total, click, active }) {
  return (
    <Card
      onClick={click}
      className={`infoBox ${active && "infoBox--selected"} ${
        !active && "infoBox--hover"
      } `}
    >
      <CardContent>
        <Typography color="textSecondary" className="infoBox__title">
          {title}
        </Typography>

        <h2 className="infoBox__cases"> +{numeral(cases).format("0.0a")} </h2>

        <Typography color="textSecondary" className="infoBox__total">
          +{numeral(total).format("0.0a")} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
