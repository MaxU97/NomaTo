import React, { useCallback, useMemo, useRef, useState } from "react";
import { googleApiKey } from "../../api/config";
import { Circle, Marker, useLoadScript } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";
import Input from "../Input/Input.component";
import Places from "./Places.component";
import "./map.scss";
import { Dropdown } from "../Dropdown/Dropdown.component";
import classNames from "classnames";

const Map = ({
  className = "",
  setAddress = () => {},
  searchable = true,
  areaCenter,
}) => {
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
      draggable: !Boolean(areaCenter),
      mapId: "40fb342dfb62af58",
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {searchable && (
          <div className="controls">
            <Places
              setPlace={(position) => {
                setPlace(position);
                mapRef.current?.panTo(position);
                mapRef.current?.setZoom(13);
                setAddress(position);
              }}
            ></Places>
          </div>
        )}
        <div className="map">
          <GoogleMap
            zoom={7}
            center={defaultCenter}
            mapContainerClassName={classNames("map-container", className)}
            options={options}
            onLoad={onLoad}
          >
            {place && <Marker position={place}></Marker>}
            {areaCenter && (
              <Circle
                center={areaCenter}
                radius={1000}
                onLoad={() => {
                  mapRef.current?.panTo(areaCenter);
                  mapRef.current?.setZoom(13);
                }}
                options={areaOptions}
              ></Circle>
            )}
          </GoogleMap>
        </div>
      </div>
    );
  }
};

const areaOptions = {
  strokeOpacity: 1,
  fillOpacity: 0.6,
  strokeWeight: 3,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  strokeColor: "rgb(2, 52, 126)",
  fillColor: "#3299de",
};

export default Map;
