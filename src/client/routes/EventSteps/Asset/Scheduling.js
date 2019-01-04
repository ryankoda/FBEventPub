import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';
import { saveLocalStorage } from '../../../../utils/localstorage';


class Scheduling extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialDate: new Date('December 31, 2018 12:00:00'),
      savedDate: ""
    };
  }

  handleDateChange = (date) => {
    //console.log(date.toString());
    //this.setState({ savedDate: date });
    saveLocalStorage('date', date);
  }

  render() {
    const { initialDate } = this.state;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <DateTimePicker 
        value={initialDate} 
        onChange={this.handleDateChange} 
        label="Enter date and time"
        showTodayButton />
    </MuiPickersUtilsProvider>
    );
  }
}

export default Scheduling;