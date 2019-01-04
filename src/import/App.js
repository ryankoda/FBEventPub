import React, { Component } from "react";
import ReactDOM from "react-dom";
import Collapsible from "react-collapsible";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import { MapComponent } from "./MapComponent";

import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      appInformation: {}
    };
  }

  render() {
    return (
      <div className="App">
        <h1 id="App-header">Event Publisher</h1>
        <div id="App-window">
          <EventForm />
        </div>
      </div>
    );
  }
}

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: "Event Name",
      eventDesc: "Description of the event.",
      address: "699 S Mill Ave, Tempe, AZ 85281",
      lat: 33.4255,
      lon: -111.94,
      selectedDay: null,
      time: "12:00",
      YouTubeURL: "https://www.youtube.com/watch?v=oHg5SJYRHA0"
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getStates = this.getStates.bind(this);
    this.sendStore = this.sendStore.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log([event.target.name]);

    console.log("INPUT CHANGED");
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  getStates() {
    console.log(this.state);
    console.log(JSON.stringify(this.state));
  }

  sendStore() {
    this.getStates();

    const data = this.state;
    const url = "/sendStorePOST";

    axios
      .post(url, {
        kind: "Event-Item",
        jsondata: data
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <form>
        <h2>Event Form</h2>
        <div id="name-desc">
          <h3>Get Started</h3>
          <label>
            Event name:
            <input
              className="input"
              name="eventName"
              type="text"
              value={this.state.eventName}
              onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Description:
            <textarea
              className="textarea"
              name="eventDesc"
              type="text"
              rows="5"
              value={this.state.eventDesc}
              onChange={this.handleInputChange}/>
          </label>
          <br />
          {/*<label>
            Creator of event will attend:
            <input
              name="creatorWillAttend"
              type="checkbox"
              checked={this.state.creatorWillAttend}
              onChange={this.handleInputChange} />
          </label>*/}
        </div>

        <hr />

        <div id="maps">
          <h3>Choose Location</h3>

          <Collapsible trigger="Maps" open="true">
            <MapComponent id="map" />
            <label>
              Address:
              <input
                className="input"
                name="address"
                type="text"
                value={this.state.address}
                onChange={this.handleInputChange}/>
            </label>
            <br />
            <label>
              Latitude:
              <input
                className="input"
                name="lat"
                type="number"
                value={this.state.lat}
                onChange={this.handleInputChange}/>
            </label>
            <br />
            <label>
              Longitude:
              <input
                className="input"
                name="lon"
                type="number"
                value={this.state.lon}
                onChange={this.handleInputChange}/>
            </label>
          </Collapsible>
        </div>

        <hr />

        <div id="datetime">
          <h3>Scheduling</h3>
          <div>
            <DayPicker
              selectedDays={this.state.selectedDay}
              onDayClick={this.handleDayClick}/>
            <p>
              {this.state.selectedDay
                ? this.state.selectedDay.toLocaleDateString()
                : "Please select a day "}
            </p>
          </div>
          <br />
          <label>
            Time:
            <input
              className="input"
              name="time"
              type="time"
              value={this.state.time}
              onChange={this.handleInputChange}/>
          </label>
        </div>

        <hr />

        <div id="media">
          <h3>Media</h3>
          <label>
            YouTube URL:
            <input
              className="input"
              name="YouTubeURL"
              type="url"
              value={this.state.YouTubeURL}
              onChange={this.handleInputChange}/>
          </label>
        </div>

        <hr />

        <div id="eventSubmit">
          <h3>Submit Event</h3>
          {/*<button
            className="button"
            id="getStates"
            type="button"
            style={{ padding: 5, marginLeft: 10 }}
            onClick={this.getStates.bind(this)}>
            Debug: Console JSON
          </button>*/}
          <button
            className="button"
            id="eventSubmit"
            type="button"
            style={{ padding: 5, marginLeft: 10 }}
            onClick={this.sendStore.bind(this)}>
            Submit Event
          </button>
        </div>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
