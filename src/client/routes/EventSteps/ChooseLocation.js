import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import GoogleMapComponent from './Asset/GoogleMapOption';
import { saveLocalStorage } from '../../../utils/localstorage';

const styles = {
  card: {
    minHeight: '50vh',
  },
};

class ChooseLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Choose location

          <Card className={classes.card}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <GoogleMapComponent />
              </Grid>
            </Grid>

          </Card>

        </Typography>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChooseLocation);
