import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail.component";
import _ from "lodash";

const MarkerList = ({ markers, markerIndex, setMarkerIndex = () => {} }) => {
  var infoHover = false;
  const resetIndex = (hover) => {
    if (!hover) {
      setMarkerIndex(-1);
    }
  };
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
          onMouseOut={() => {
            setTimeout(() => {
              resetIndex(infoHover);
            }, 200);
          }}
        >
          {index == markerIndex && (
            <InfoWindow
              onCloseClick={() => {
                setMarkerIndex(-1);
              }}
              onLoad={(event) => {
                const el = event.content;
                el.onmouseenter = () => {
                  infoHover = true;
                };
                el.onmouseleave = () => {
                  infoHover = false;
                  setTimeout(() => {
                    resetIndex(infoHover);
                  }, 200);
                };
              }}
            >
              <div className="item-info">
                <ItemThumbnail item={value} showName></ItemThumbnail>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    })
  );
};

export default MarkerList;
