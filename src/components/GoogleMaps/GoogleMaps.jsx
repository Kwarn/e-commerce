import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const locations = [
    {
      name: 'Q&Y',
      location: { lat: 51.572, lng: -0.707 },
    },
    {
      name: 'Location 1',
      location: {
        lat: 41.3954,
        lng: 2.162,
      },
    },
    {
      name: 'Location 2',
      location: {
        lat: 41.3917,
        lng: 2.1649,
      },
    },
    {
      name: 'Location 3',
      location: {
        lat: 41.3773,
        lng: 2.1585,
      },
    },
    {
      name: 'Location 4',
      location: {
        lat: 41.3797,
        lng: 2.1682,
      },
    },
    {
      name: 'Location 5',
      location: {
        lat: 41.4055,
        lng: 2.1915,
      },
    },
  ];

  const center = { lat: 51.572, lng: -0.707 };
  const [map, setMap] = React.useState(null);
  console.log('map :>> ', map);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <>
          {locations.map(loc => {
            console.log(loc.location);
            return (
              <Marker name={'TESTING'} key={loc.name} location={loc.location} />
            );
          })}
        </>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default GoogleMaps;
