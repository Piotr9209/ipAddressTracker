import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const SearchAddressTracker = ({
  onSubmitAddress,
  onChangeAddress,
  valueInputAddressTracker,
  arrayAddressTracker,
  ipStatusFetch,
}) => {
  const [positionMap, setPositionMap] = useState([]);

  // ipStatusFetch === "success" &&
  //   setPositionMap([arrayAddressTracker.lat, arrayAddressTracker.lon]);

  const position = (arrayAddressTracker) => {
    ipStatusFetch === "success" &&
      setPositionMap((prevArr) => [
        ...prevArr,
        arrayAddressTracker.lat,
        arrayAddressTracker.lon,
      ]);
  };

  console.log(position(arrayAddressTracker));
  console.log(positionMap);

  return (
    <div>
      <form>
        <input
          type="text"
          value={valueInputAddressTracker}
          onChange={onChangeAddress}
          placeholder="Search for any IP address or domain"
        />
        <button onClick={onSubmitAddress} type="submit">
          Send
        </button>
      </form>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
