import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from './TableContainer';

class Dashboard extends Component {

  render() {
    return (
      <div>
        <Paper>
          <TableContainer />
        </Paper>
      </div>
    );
  }
}
export default Dashboard;
