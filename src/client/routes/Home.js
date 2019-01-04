import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// import GoogleLogo from '../../../public/googlemaps.png';
// import FacebookLogo from '../../../public/facebook100px.png';
// import YouTubeLogo from '../../../public/yt_icon_rgb.png';

import Logo from '../../../public/img/logo-via-logohub.png';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

function Home(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Introduction
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            {/* <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              EventMonkey
            </Typography>*/}
            <Grid container justify="center">
              <img src={Logo} alt="Eventmonkey Logo" />
            </Grid>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
            EventMonkey is an app for events and promotions.
            Publish events to Facebook easily with YouTube upload and
            Google Maps to streamline the process
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" component={NavLink} to="/create-event">
                    I want to create an event
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" component={NavLink} to="/dashboard">
                    I want to view the dashboard
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40} justify="center">
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Locate with Google Maps
                    </Typography>
                    <Typography>
                      Use Google Maps to choose the address and geolocation of your event
                    </Typography>
                  </CardContent>
                </Card>
            </Grid>
            <Grid item sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Upload to YouTube
                    </Typography>
                    <Typography>
                      Upload videos to YouTube, or upload other media relating to your event
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            <Grid item sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Post event to Facebook
                    </Typography>
                    <Typography>
                      Post your event to Facebook. The location and video you have included will automatically be included.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Powered by Google Maps API, YouTube API, Facebook Graph API.

          This app not affiliated with YouTube, Facebook, or Google.
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
