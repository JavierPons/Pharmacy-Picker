/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPharmacy } from '../actions';

import './GoogleMap.css';

class GoogleMap extends Component {
  componentDidMount() {
    this.codeAddress('Rock Island');
  }

  codeAddress = address => {
    let geocoder, map, pharmacy;

    geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: address
      },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const userOrigin = results[0].geometry.location;
          const myOptions = {
            zoom: 10,
            center: userOrigin,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(this.refs.map, myOptions);

          const marker = new google.maps.Marker({
            map: map,
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: userOrigin
          });

          google.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent('Me');
            infowindow.open(map, marker);
          });

          const infowindow = new google.maps.InfoWindow();
          const service = new google.maps.places.PlacesService(map);

          const callback = (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
              }
            }
          };

          const createMarker = place => {
            const marker = new google.maps.Marker({
              map: map,
              icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', () => {
              infowindow.setContent(place.name);
              infowindow.open(map, marker);
              pharmacy = `${place.name}, ${place.vicinity}`;
              this.props.selectPharmacy(pharmacy);
            });
          };

          service.nearbySearch(
            {
              location: userOrigin,
              radius: '16093',
              type: ['pharmacy']
            },
            callback
          );
        }
      }
    );
  };

  render() {
    // if (this.props.address) {
    this.codeAddress(this.props.address);
    // }
    return <div ref="map" className="google-map container" />;
  }
}

export default connect(null, { selectPharmacy })(GoogleMap);
