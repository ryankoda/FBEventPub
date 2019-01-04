import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MUIPlacesAutocomplete, { geocodeBySuggestion } from 'mui-places-autocomplete';
// import ChooseLocation from '../ChooseLocation';
import { saveLocalStorage } from '../../../../utils/localstorage';

// Extended from demo geocode lat long in mui-places-autocomplete

export class geocodeLatLong extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      coordinates: null,
      errorMessage: null,
      addressName: null,
      viewport: null
    };

    this.onClose = this.onClose.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onClose() {
    // Be sure to reset our coordinates/errorMessage so we can render the message displayed in the
    // <Snackbar> appropriately (see 'renderMessage()').
    this.setState({ open: false, coordinates: null, errorMessage: null });
  }

  onSuggestionSelected(suggestion) {
    this.setState({addressName: suggestion.description});
    // Once a suggestion has been selected by your consumer you can use the utility geocoding
    // functions to get the latitude and longitude for the selected suggestion.
    geocodeBySuggestion(suggestion).then((results) => {
      if (results.length < 1) {
        this.setState({
          open: true,
          errorMessage: 'Geocode request completed successfully but without any results',
        });

        return;
      }

      // Just use the first result in the list to get the geometry coordinates
      const { geometry } = results[0];

      const coordinates = {
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      };

      const viewport = {
        northeast : {
          lat: geometry.viewport.getNorthEast().lat(),
          lng: geometry.viewport.getNorthEast().lng()
        },
        southwest : {
          lat: geometry.viewport.getSouthWest().lat(),
          lng: geometry.viewport.getSouthWest().lng()
        }
      };

      // Add your business logic here. In this case we simply set our state to show our <Snackbar>.
      this.setState({ open: true, coordinates, viewport });
    }).catch((err) => {
      this.setState({ open: true, errorMessage: err.message });
    });
  }

  renderMessage() {
    const { addressName, coordinates, viewport, errorMessage } = this.state;

    if (coordinates) {
      this.props.locationLink(addressName, coordinates, viewport);
      return `Selected ${addressName} 
      at latitude ${coordinates.lat} 
      and longitude ${coordinates.lng}  
      between NE ${viewport.northeast.lat},${viewport.northeast.lng} 
      and SW ${viewport.southwest.lat},${viewport.southwest.lng}`;
    } if (errorMessage) {
      return `Failed to geocode suggestion because: ${errorMessage}`;
    }

    // If we don't have any coordinates or error message to render (probably due to being rendered
    // the first time) then render nothing
    return null;
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <MUIPlacesAutocomplete
          onSuggestionSelected={this.onSuggestionSelected}
          renderTarget={() => (<div />)}
        />
        <Snackbar
          onClose={this.onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={5000}
          open={open}
          message={(<span>{this.renderMessage()}</span>)}
          style={{ width: '70vw' }}
        />
      </div>
    );
  }
}

geocodeLatLong.description = 'Geocoding (i.e. latitude/longitude) a selected suggestion';

export default geocodeLatLong;
