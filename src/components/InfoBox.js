import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title */}
                <Typography color="textSecondary">
                    {title}
                </Typography>
                {/* number of cases */}
                <h2 className="infoBox__cases">+ {cases} cases</h2>
                {/* totale */}
                <Typography className="infoBox__total"
                    color="textSecondary">
                    Total {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox