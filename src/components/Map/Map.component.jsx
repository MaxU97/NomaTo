import React, { useCallback, useMemo, useRef, useState } from "react";
import { googleApiKey } from "../../api/config";
import { Marker, useLoadScript } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";
import Input from "../Input/Input.component";
import Places from "./Places.component";
import "./map.scss";
import { Dropdown } from "../Dropdown/Dropdown.component";
import classNames from "classnames";

const Map = (className = "") => {
  const [place, setPlace] = useState();
  const mapRef = useRef();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: ["places"],
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
      mapId: "40fb342dfb62af58",
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classNames("map", className)}>
        <div className="controls">
          <Places
            setPlace={(position) => {
              setPlace(position);
              mapRef.current?.panTo(position);
              mapRef.current?.setZoom(13);
            }}
          ></Places>
        </div>
        <div className="map">
          <GoogleMap
            zoom={7}
            center={defaultCenter}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
          >
            {place && <Marker position={place}></Marker>}
          </GoogleMap>
        </div>
      </div>
    );
  }
};

export default Map;
