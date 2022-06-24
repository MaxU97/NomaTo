import React, { useCallback, useEffect, useMemo, useState } from "react";
import { googleApiKey, googleLibraries } from "../../api/config";
import { Circle, Marker, useLoadScript } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";

import Places from "./Places.component";
import "./map.scss";

import classNames from "classnames";
import MarkerList from "./MarkerList.component";

const Map = ({
  className = "",
  setAddress = () => {},
  setAddressLatLng = () => {},
  searchable = true,
  areaCenter,
  draggable = false,
  markersCoordinates = [],
  radius,
  existingAddress,
  existingAddressCoordinates,
  zoom = 7,
}) => {
  const [markerIndex, setMarkerIndex] = useState();
  const [place, setPlace] = useState();
  const [map, setMap] = useState(null);
  const [circle, setCircle] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: googleLibraries,
  });

  const defaultCenter = useMemo(
    () => ({
      lat: 56.944773,
      lng: 24.10984,
    }),
    []
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      draggable: draggable,
      mapId: "40fb342dfb62af58",
      maxZoom: 15,
    }),
    []
  );

  useEffect(() => {
    if (map) {
      if (markersCoordinates.length > 0) {
        if (circle && areaCenter) {
          map.fitBounds(circle.getBounds());
        } else {
          const bounds = new window.google.maps.LatLngBounds();
          markersCoordinates.map((marker) => {
            bounds.extend(marker.latLng);
          });
          map.fitBounds(bounds);
        }
      }
    }
  }, [map, markersCoordinates, circle]);

  useEffect(() => {
    debugger;
    if (map) {
      if (existingAddressCoordinates) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(existingAddressCoordinates);
        map.fitBounds(bounds);
      }
    }
  }, [map, existingAddressCoordinates]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {searchable && (
          <div className="controls">
            <Places
              placeholder={existingAddress}
              setPlace={(position) => {
                setPlace(position);
                map.panTo(position);
                map.setZoom(13);
                setAddressLatLng(position);
              }}
              setAddress={setAddress}
            ></Places>
          </div>
        )}
        <div className="map">
          <GoogleMap
            zoom={13}
            center={areaCenter ? areaCenter : defaultCenter}
            mapContainerClassName={classNames("map-container", className)}
            options={options}
            onLoad={onLoad}
            onClick={() => {
              setMarkerIndex(-1);
            }}
          >
            {(place || existingAddressCoordinates) && (
              <Marker
                position={place ? place : existingAddressCoordinates}
              ></Marker>
            )}

            {areaCenter && (
              <Circle
                center={areaCenter}
                radius={radius ? radius * 1000 : 1000}
                onLoad={(event) => {
                  setCircle(event);
                }}
                options={areaOptions}
              ></Circle>
            )}
            {markersCoordinates && (
              <MarkerList
                markers={markersCoordinates}
                markerIndex={markerIndex}
                setMarkerIndex={setMarkerIndex}
              ></MarkerList>
            )}
          </GoogleMap>
        </div>
      </>
    );
  }
};

const areaOptions = {
  strokeOpacity: 1,
  fillOpacity: 0.4,
  strokeWeight: 5,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  strokeColor: "rgb(2, 52, 126)",
  fillColor: "#3299de",
};

export default Map;
