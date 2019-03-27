/* eslint-disable linebreak-style */
import React from 'react';
import { NavLink } from 'react-router-dom';


import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HomeIcon from '@material-ui/icons/Home';
import EventIcon from '@material-ui/icons/Event';
import LoginIcon from '@material-ui/icons/Lock';
import Icon from '@material-ui/core/Icon';


import Logo from '../../public/img/logo-via-logohub.png';

/*


const Header = () => (
  <header>
    <img src={Logo} alt="Eventmonkey Logo"/>;
    <nav>
      <ul>
        <li><NavLink exact to='/'>Home</NavLink></li>
        <li><NavLink to='/create-event'>Create an Event</NavLink></li>
        <li><NavLink to='/upload-video'>Upload a Video</NavLink></li>
        <li><NavLink to='/dashboard'>View Dashboard</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default Header;

*/


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});


function Header(props) {
  const { classes } = props;
  return (
    <header>
      <nav>
        <Button variant="contained" color="default" className={classes.button} component={NavLink} to="/">
          Home
          <HomeIcon className={classes.rightIcon} />
        </Button>
        <Button variant="contained" color="primary" className={classes.button} component={NavLink} to="/sign-in">
          Sign In
          <LoginIcon className={classes.rightIcon} />
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} component={NavLink} to="/create-event">
          Create an Event
          <EventIcon className={classes.rightIcon} />
        </Button>
        <Button variant="contained" color="primary" className={classes.button} component={NavLink} to="/upload-video">
          Upload a Video
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} component={NavLink} to="/dashboard">
          View Dashboard
          <DashboardIcon className={classes.rightIcon} />
        </Button>
      </nav>
  </header>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);