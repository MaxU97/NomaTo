import { useLoadScript } from "@react-google-maps/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { googleApiKey, googleLibraries } from "../../api/config";
export const Context = createContext(false);

export const GoogleMapsApiProvider = ({ children }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: googleLibraries,
  });
  return <Context.Provider value={{ isLoaded }}>{children}</Context.Provider>;
};

export const useGoogleApiProvider = () => useContext(Context);
