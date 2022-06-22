import Geocode from "react-geocode";
import { googleApiKey } from "../api/config";
import { getCurrentLanguage } from "./language.service";

export const getNaturalAddress = async (lat, lng) => {
  Geocode.setApiKey(googleApiKey);
  Geocode.setLanguage(getCurrentLanguage());

  const addr = await Geocode.fromLatLng(lat, lng);
  var address;
  addr.results[0].address_components.every((comp) => {
    if (comp.types.includes("locality")) {
      address = comp;
      return false;
    }
    return true;
  });
  return address;
};

export const getNaturalAddressFull = async (lat, lng) => {
  Geocode.setApiKey(googleApiKey);
  Geocode.setLanguage(getCurrentLanguage());

  const addr = await Geocode.fromLatLng(lat, lng);
  var address;
  addr.results[0].address_components.every((comp) => {
    if (comp.types.includes("locality")) {
      address = comp;
      return false;
    }
    return true;
  });
  return address;
};
