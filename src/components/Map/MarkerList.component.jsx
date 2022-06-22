import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail.component";

const MarkerList = ({ markers, markerIndex, setMarkerIndex = () => {} }) => {
  return (
    markers &&
    markers.map((value, index) => {
      return (
        <Marker
          key={index}
          position={value.latLng}
          onClick={() => {
            window.location.href = `/item/${value.id}`;
          }}
          onMouseOver={() => setMarkerIndex(index)}
          onMouseOut={() => setMarkerIndex(-1)}
        >
          {index == markerIndex && (
            <InfoWindow
              onCloseClick={() => {
                setMarkerIndex(-1);
              }}
            >
              <div className="item-info">
                <ItemThumbnail item={value}></ItemThumbnail>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    })
  );
};

export default MarkerList;
