import React from 'react';
import {
  GoogleApiWrapper, InfoWindow, Map, Marker
} from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { loadLocalStorage } from '../../../../utils/localstorage';


export class GoogleMapContainer extends React.Component {
  constructor(props) {
    super(props);

    // this.textInput = React.createRef();

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      viewPosition: { lat: 33.4255, lng: -111.94 }
    };
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  /*
  componentDidMount() {
    this.props.childComponentRef(this);
  }

  componentWillUnmount() {
    this.props.childComponentRef(undefined);
  }
  

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.changeFlag !== this.props.changeFlag) {
      this.loggerTest();
    }
  }
  */
 
  /*
  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }*/

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick = (props) => {

    this.renderAutoComplete();
    // this.forceUpdate();
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  fetchCoordinates() {
    return JSON.parse(loadLocalStorage('coordinates'));
  }

  fetchViewport() {
    return JSON.parse(loadLocalStorage('viewport'));
  }

  renderAutoComplete() {
    let coordinates = this.fetchCoordinates();
    let viewport = this.fetchViewport();

    const { google, map } = this.props;

    if (!google || !map) return;

    if (viewport) map.fitBounds(viewport);
    else {
      map.setCenter(coordinates);
      map.setZoom(17);
    }

    this.setState({ viewPosition: coordinates });
  }

  render() {

    const style = {
      position: 'relative',
      width: '45vw',
      height: '35vh'
    };
    return (
      <Paper>
        
        <div>
          <Map
            item
            style={style}
            className="map"
            google={this.props.google}
            // containerStyle={containerStyle}
            onClick={this.onMapClick}
            // onReady={this.forceUpdate}
            zoom={14}
            center={this.viewPosition}
            initialCenter={{ lat: 33.4255, lng: -111.94 }}
          >
            <Marker
              onClick={this.onMarkerClick}
              title="Marker"
              position={this.viewPosition}
              name="Location name"
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <Paper>
                <Typography
                  variant="headline"
                  component="h4"
                >
                  marker.title
                </Typography>
                <Typography
                  component="p"
                >
                  marker.name
                </Typography>
              </Paper>
            </InfoWindow>
          </Map>
        </div>
      </Paper>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDBa0d3xAgLCHNHQSKyE8JCKhMzUzDBZkY'
})(GoogleMapContainer);