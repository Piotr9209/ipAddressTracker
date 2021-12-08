import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import patternBg from "../../images/pattern-bg.png";
import iconArrow from "../../images/icon-arrow.svg";
import "./searchAddressTracker.scss";

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
    <main className="main">
      <div className="main-container">
        <img
          className="pattern-background"
          src={patternBg}
          alt="pattern background"
        />
        <div className="header-container">
          <p>IP Address Tracker</p>
        </div>
        <div className="form-container">
          <form className="form">
            <input
              className="input"
              type="text"
              value={valueInputAddressTracker}
              onChange={onChangeAddress}
              placeholder="Search for any IP address or domain"
            />
            <button onClick={onSubmitAddress} type="submit">
              <img src={iconArrow} alt="icon arrow " />
            </button>
          </form>
        </div>
      </div>
      {toggleMessageWrongApi && (
        <div className="wrong-data-input">
          <p> {wrongDataInput}</p>
        </div>
      )}
      <aside className="aside-container">
        <div className="trackerAndWeather-container">
          {ipStatusFetch === "success" ? (
            <div className="info-tracker-container">
              <div>
                <p>ip address: </p>
                <br />
                <span>{arrayAddressTracker.query}</span>
              </div>
              <div>
                <p>location: </p>
                <br />
                <span>{arrayAddressTracker.city}</span>
              </div>
              <div>
                <p>timezone:</p>
                <br />
                <span>{arrayAddressTracker.timezone}</span>
              </div>
              <div>
                <p>isp: </p>
                <br />
                <span>{arrayAddressTracker.isp}</span>
              </div>
            </div>
          ) : (
            <p>loading</p>
          )}
          <div className="weather-container">
            <button onClick={onClickGetWeather}>
              {isShowWeather ? "Hide weather" : "Show weather"}
            </button>
            {isShowWeather &&
              weatherStatusFetch === "done" &&
              (Object.keys(arrayActuallyWeather).length === 2 ? (
                <div className="errorInfoFromFetch">
                  <p>{arrayActuallyWeather.cod}</p>
                  <p>{arrayActuallyWeather.message}</p>
                </div>
              ) : (
                <div className="weather-info-container">
                  <div>
                    <p>
                      Weather parameters:{" "}
                      <span>{arrayActuallyWeather.weather[0].main}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Sky:{" "}
                      <span>{arrayActuallyWeather.weather[0].description}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Temperature:{" "}
                      <span>{arrayActuallyWeather.main.temp.toFixed(1)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Clouds: <span>{arrayActuallyWeather.clouds.all}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Pressure:{" "}
                      <span>
                        {arrayActuallyWeather.main.pressure.toFixed()}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Humidity:{" "}
                      <span>
                        {arrayActuallyWeather.main.humidity.toFixed()}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Wind speed: <span>{arrayActuallyWeather.wind.speed}</span>
                    </p>
                  </div>
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
    </main>
  );
};
