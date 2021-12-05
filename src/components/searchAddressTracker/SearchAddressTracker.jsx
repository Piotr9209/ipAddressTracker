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
  onClickGetWeather,
  arrayActuallyWeather,
  weatherStatusFetch,
  isShowWeather,
}) => {
  console.log(arrayActuallyWeather, "<weather");

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
            <button onClick={onClickGetWeather}>
              {isShowWeather ? "Hide weather" : "Show weather"}
            </button>
            {isShowWeather && weatherStatusFetch === "done" && (
              <div>
                <p>
                  Weather parameters:{" "}
                  <span>
                    <img
                      src={`http://openweathermap.org/img/wn/${arrayActuallyWeather.weather[0].icon}@2x.png`}
                      alt="iconWeather"
                    />
                  </span>
                  <span>{arrayActuallyWeather.weather[0].main}</span>
                </p>
                <p>
                  Sky:{" "}
                  <span>{arrayActuallyWeather.weather[0].description}</span>
                </p>
                <p>
                  Temperature:{" "}
                  <span>{arrayActuallyWeather.main.temp.toFixed(1)}</span>
                </p>
                <p>
                  Clouds: <span>{arrayActuallyWeather.clouds.all}</span>
                </p>
                <p>
                  Pressure:{" "}
                  <span>{arrayActuallyWeather.main.pressure.toFixed()}</span>
                </p>
                <p>
                  Humidity:{" "}
                  <span>{arrayActuallyWeather.main.humidity.toFixed()}</span>
                </p>
                <p>
                  Wind speed: <span>{arrayActuallyWeather.wind.speed}</span>
                </p>
              </div>
            )}
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
