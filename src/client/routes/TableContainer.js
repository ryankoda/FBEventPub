import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/Update';
import Typography from '@material-ui/core/Typography';

/*
Local event format

  const eventDetails = {
    title: eventName,
    desc: eventDesc,
    isGoing: isGoing,
    date: date,
    address: address,
    lat: lat,
    lon: lon,
    youtubeURL: youtubeURL
  };
*/


function formatEvent(event) {
  const str = `${event.title} on ${event.date}\n${event.desc}\nLocated at: ${event.location}`;
  return str;
}

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        { Title: '--', Location: '--', Date: '--' }
      ]
    };
  }

  componentDidMount() {
    this.listEvents();
  }

  // Lists events. Also used to update
  listEvents() {
    axios({
      method: 'get',
      url: '/listEvents'
    })
      .then((res) => {
        const events = res.data;
        this.setState({ events });
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  }

  // Deletes an event with the given key
  deleteEvent(id) {
    console.log(id);
    axios
      .post('/delete', { id })
      .then((res) => {
        console.log(res.data);
        this.listEvents();
        this.forceUpdate();
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  }

  // Post to FB
  fbPost(event) {
    const str = formatEvent(event);
    console.log(str);
    axios
      .post('https://us-central1-event-monkey.cloudfunctions.net/fbPostAlpha', { 'message': str, 'url': event.url })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Typography>List Events
          <IconButton onClick={() => { this.listEvents(); }}>
            <ListIcon />
          </IconButton>
        </Typography>
        <Table id="event-table">
          <TableHead>
            <TableRow>
              <TableCell>Event Title</TableCell>
              <TableCell address>Address</TableCell>
              <TableCell coords>Coords</TableCell>
              <TableCell date>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.events.map(event => (
              <TableRow id={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.address}</TableCell>
                <TableCell>{"{" + event.lat + ", " + event.lon+"}"}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { this.deleteEvent(event.id); }}>
                    <DeleteIcon />
                  </IconButton>
                  <Button onClick={() => { this.fbPost(event); }}>
                    Post to FB
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
export default TableContainer;
