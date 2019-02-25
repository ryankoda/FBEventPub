/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import '../styles/uploadVideoStyles.css';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '50vw',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class UploadVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoTitle: null,
      videoDesc: null,
      privacy: 0,
      completed: 0,
      loading: false,
      success: false
    };

    this.handleUpload = this.handleUpload.bind(this);
}

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  handleUpload(ev) {
    ev.preventDefault();

    this.setState(
      {
        success: false,
        loading: true,
      }
    );

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.state.videoTitle);
    data.append('filedesc', this.state.videoDesc);
    data.append('fileprivacy', this.state.privacy);

    axios
      .post('/uploadHandler', data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          success: true,
        });
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  }

  handleTitle() {
    this.setState({ videoTitle: event.target.value});
  }

  handleDesc() {
    this.setState({ videoDesc: event.target.value});
  }

  render() {
    const { classes } = this.props;
    const { loading, success } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <span id="signinButton" className="pre-sign-in">
            <span
              className="g-signin"
              data-callback="signinCallback"
              data-clientid="702182989125-jfn8dmrtm3vo0141bt20651t2u5dho5j.apps.googleusercontent.com"
              data-cookiepolicy="single_host_origin"
              data-scope="https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube"
            />
          </span>
          <Grid item xs={12}>
            <TextField
              required
              id="videoTitle"
              name="videoTitle"
              label="Video title"
              value={this.state.videoTitle}
              onChange={() => { this.handleTitle(); }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="eventDesc"
              name="eventDesc"
              label="Description"
              value={this.state.videoDesc}
              onChange={() => { this.handleDesc(); }}
              multiline="true"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="privacy">Privacy: </InputLabel>
            <Select
              value={this.state.privacy}
              onChange={this.handleChange}
              inputProps={{
                name: 'privacy',
                id: 'privacy'
              }}
            >
              <MenuItem value={0}>Public</MenuItem>
              <MenuItem value={1}>Unlisted</MenuItem>
              <MenuItem value={2}>Private</MenuItem>
            </Select>
          </Grid>
          <form onSubmit={this.handleUpload}>
            <input
              accept="video/*"
              id="file"
              multiple
              type="file"
              ref={(ref) => { this.uploadInput = ref; }}
            />
            <label htmlFor="file">
              <Button variant="contained" component="span" className={classes.button}>
                Browse
              </Button>
            </label>
            <input value="Upload" type="submit" id="upload" />
            <label htmlFor="upload">
              <Button variant="contained" component="span" color="primary" className={classes.button}>
                Upload
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} color={"secondary"}/>}
            </label>
          </form>
          <LinearProgress variant="determinate" value={this.state.completed} />
          <Typography variant="body2" id="disclaimer">By uploading a video, you certify that you
            own all rights to the content or that you are authorized by the owner to make the
            content publicly available on YouTube, and that it otherwise complies with the YouTube
            Terms of Service located at <p />
            <a
              href="http://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
            >http://www.youtube.com/t/terms
            </a>
          </Typography>
        </Grid>
      </React.Fragment>
    );
  }
}
UploadVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadVideo);
