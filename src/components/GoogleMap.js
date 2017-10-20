/*global google*/
import React, { Component } from 'react';
import './GoogleMap.css';
class GoogleMap extends Component {
  componentDidMount() {
    this.codeAddress('8246 s sacramento chicago');
  }

  codeAddress(address) {
    let geocoder, map;

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
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: userOrigin
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('Me');
            infowindow.open(map, this);
          });

          let infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);

          service.nearbySearch(
            {
              location: userOrigin,
              radius: '16093',
              type: ['pharmacy']
            },
            callback
          );

          function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
              }
            }
          }

          function createMarker(place) {
            var marker = new google.maps.Marker({
              map: map,
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });
          }
        }
      }
    );
  }

  render() {
    return <div ref="map" className="google-map container" />;
  }
}

export default GoogleMap;
