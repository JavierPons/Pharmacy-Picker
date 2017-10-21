/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPharmacy } from '../actions';

import './GoogleMap.css';

class GoogleMap extends Component {
  componentDidMount() {
    // since no user info is selected on mount
    // I set an initial google map location to divvyDOSE's HQ in Rock Island :)
    this.renderMap('3416 46th Ave #104, Rock Island, IL 61201');
  }

  renderMap = address => {
    // renders a google map based on a users passed in location
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      // returns a users lat lon based on an address passsed in
      {
        address: address
      },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const userOrigin = results[0].geometry.location;
          const map = this.createMap(userOrigin);

          const marker = new google.maps.Marker({
            //create the users marker
            map: map,
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: userOrigin
          });

          google.maps.event.addListener(marker, 'click', () => {
            // when user click its own marker they see a tag that says 'me'
            infowindow.setContent('Me');
            infowindow.open(map, marker);
          });

          // setup google places to find pharmacies nearby
          const infowindow = new google.maps.InfoWindow();
          const service = new google.maps.places.PlacesService(map);

          const mapPlaces = (results, status) => {
            // callback that loops over all phamacies in range and places a marker down for them.
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
              }
            }
          };

          const createMarker = place => {
            // creates a marker for a pharmacy and adds a listener
            // that shows the pharmacys name and calls an action
            // creator that emits the address to the pharmacy new component
            const marker = new google.maps.Marker({
              map: map,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', () => {
              infowindow.setContent(place.name);
              infowindow.open(map, marker);
              dispatchPharmacySelected(`${place.name}, ${place.vicinity}`);
            });
          };

          const dispatchPharmacySelected = pharmacy => {
            // dispatches the selectPharmacy method with the newly clicked pharmacy
            this.props.selectPharmacy(pharmacy);
          };

          service.nearbySearch(
            // finds phamacies within a 10 mile (16093 m) radius and plots them on the map
            {
              location: userOrigin,
              radius: '16093',
              type: ['pharmacy']
            },
            mapPlaces
          );
        }
      }
    );
  };

  createMap(userOrigin) {
    const myOptions = {
      zoom: 10,
      center: userOrigin,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // create map with location from geocode
    return new google.maps.Map(this.refs.map, myOptions);
  }

  render() {
    // render the map in the below component when the
    // user updates streetaddress city or state
    this.renderMap(this.props.address);
    return <div ref="map" className="google-map container" />;
  }
}

export default connect(null, { selectPharmacy })(GoogleMap);
