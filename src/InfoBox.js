import React from 'react';
import './InfoBox.css';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, isRed, active, total, ...props}) {
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>

        <h2 className="infoBox_cases">{cases}</h2>

        <Typography className="infoBox_total" color="textSecondary">
          {total} total
        </Typography>
      </CardContent>
    </Card>
  )
};

export default InfoBox;