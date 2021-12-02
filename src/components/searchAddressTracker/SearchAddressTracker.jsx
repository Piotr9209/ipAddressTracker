import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { getWeather } from "../../features/weatherSlice/weatherSlice";

export const SearchAddressTracker = ({
  onSubmitAddress,
  onChangeAddress,
  valueInputAddressTracker,
  arrayAddressTracker,
  ipStatusFetch,
  wrongDataInput,
}) => {
  const dispatch = useDispatch();
  const { weather, weatherStatusFetch } = useSelector((state) => state.weather);

  const showWeather = () => {
    dispatch(getWeather("London"));
  };

  useEffect(() => {
    dispatch(getWeather("London"));
  }, [dispatch]);

  console.log(weather, "<weather");
  console.log(weatherStatusFetch, "<----status fetch");
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
      <aside>
        <div>
          <div>
            <p>ip address</p>
            <p>
              {ipStatusFetch === "success"
                ? arrayAddressTracker.query
                : "loaaaading"}
            </p>
          </div>
          <div>
            <p>location</p>
            <p>
              {ipStatusFetch === "success"
                ? arrayAddressTracker.city
                : "loading"}
            </p>
          </div>
          <div>
            <p>timezone</p>
            <p>
              {ipStatusFetch === "success"
                ? arrayAddressTracker.timezone
                : "loadingg"}
            </p>
          </div>
          <div>
            <p>isp</p>
            <p>
              {ipStatusFetch === "success"
                ? arrayAddressTracker.isp
                : "loaaading"}
            </p>
          </div>
          <div>
            <p>
              <button onClick={showWeather}>SHOW WEATHER</button>
            </p>
          </div>
        </div>
      </aside>
      {ipStatusFetch === "success" ? (
        <MapContainer
          center={[arrayAddressTracker.lat, arrayAddressTracker.lon]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[arrayAddressTracker.lat, arrayAddressTracker.lon]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      ) : null}
    </div>
  );
};
