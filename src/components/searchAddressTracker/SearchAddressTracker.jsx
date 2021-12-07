import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const SearchAddressTracker = ({
  onSubmitAddress,
  onChangeAddress,
  valueInputAddressTracker,
  arrayAddressTracker,
  ipStatusFetch,
  wrongDataInput,
  toggleMessageWrongApi,
  onClickGetWeather,
  arrayActuallyWeather,
  weatherStatusFetch,
  isShowWeather,
}) => {
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
        {toggleMessageWrongApi && <p> {wrongDataInput}</p>}
        <div>
          {ipStatusFetch === "success" ? (
            <div>
              <div>
                <p>ip address: </p>
                <p>{arrayAddressTracker.query}</p>
              </div>
              <div>
                <p>location: </p>
                <p>{arrayAddressTracker.city}</p>
              </div>
              <div>
                <p>timezone:</p>
                <p>{arrayAddressTracker.timezone}</p>
              </div>
              <div>
                <p>isp: </p>
                <p>{arrayAddressTracker.isp}</p>
              </div>
            </div>
          ) : (
            <p>loadding</p>
          )}
          <div>
            <button onClick={onClickGetWeather}>
              {isShowWeather ? "Hide weather" : "Show weather"}
            </button>
            {isShowWeather &&
              weatherStatusFetch === "done" &&
              (Object.keys(arrayActuallyWeather).length === 2 ? (
                <div>
                  <p>{arrayActuallyWeather.cod}</p>
                  <p>{arrayActuallyWeather.message}</p>
                </div>
              ) : (
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
              ))}
          </div>
        </div>
      </aside>
      {ipStatusFetch === "success" ? (
        <MapContainer
          center={[arrayAddressTracker.lat, arrayAddressTracker.lon]}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[arrayAddressTracker.lat, arrayAddressTracker.lon]}>
            <Popup>This is the location of your provider internet.</Popup>
          </Marker>
        </MapContainer>
      ) : null}
    </div>
  );
};
