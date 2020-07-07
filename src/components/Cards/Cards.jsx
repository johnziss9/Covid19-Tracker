import React from 'react';
import { Card, CardContent, Typography, Grid, CardHeader } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, country }) => {

    if(!confirmed) {
        return 'Loading...';
    }

    return (
        <div className={styles.container}>
            <Grid container grid={3} justify="center">
                <Grid item component={Card} xs={12} sm={8} className={cx(styles.card, styles.infected)}>
                    <CardHeader title="Infected" className={styles.cardHeader}/>
                    <CardContent>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">Last Update: {new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">This shows the total number of cases { country ? country : `globally`}.</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} sm={8} className={cx(styles.card, styles.recovered)}>
                    <CardHeader title="Recovered" className={styles.cardHeader}/>
                    <CardContent>
                        <Typography variant="h5">
                            <CountUp start={0} end={recovered.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">Last Update: {new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">This shows the total number of recoveries { country ? country : `globally`}.</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} sm={8} className={cx(styles.card, styles.deaths)}>
                    <CardHeader title="Deaths" className={styles.cardHeader}/>
                    <CardContent>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">Last Update: {new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">This shows the total number of deaths { country ? country : `globally`}.</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;