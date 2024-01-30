import React, { useRef, useState } from "react";
import "./styles/weatherCards.css";

const WeatherCard = ({ wheather, temp, setTextInput, hasError }) => {
  //console.log(wheather);

  const [isCelsius, setIsCelsius] = useState(true);

  const city = useRef();

  const handleChange = () => {
    setIsCelsius(!isCelsius);
  };

  const handleForm = (event) => {
    event.preventDefault();
    setTextInput(city.current.value.toLowerCase().trim());
  };

  return (
    <section className="weather">
      <h1 className="weather__title">Weather App</h1>
      <form className="weather__form" onSubmit={handleForm}>
        <input type="text" ref={city} />
        <button>Search</button>
      </form>
      {hasError ? (
        <>
          <h2>That City was not found</h2>
          <h3>Please, try again</h3>
        </>
      ) : (
        <>
          <h2 className="weather__city">
            {wheather?.name}, {wheather?.sys.country}
          </h2>
          <article className="weather__container1">
            <figure className="weather__fig">
              <img
                className="weather__img"
                src={`https://openweathermap.org/img/wn/${wheather?.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </figure>
            <div>
              <h3 className="weather__clouds">
                {wheather?.weather[0].description}
              </h3>
              <ul className="weather__info">
                <li>
                  <span>Wind speed</span>{" "}
                  <span>{wheather?.wind.speed} m/s</span>
                </li>
                <li>
                  <span>Clouds</span> <span>{wheather?.clouds.all} %</span>
                </li>
                <li>
                  <span>Pressure</span>{" "}
                  <span>{wheather?.main.pressure} hPa</span>
                </li>
                <li>
                  <span>Humidity</span> <span>{wheather?.main.humidity} %</span>
                </li>
              </ul>
            </div>
          </article>
          <div className="weather__container2">
            <h3 className="weather__temp">
              {isCelsius ? temp?.celcius + " °C" : temp?.fahrenheit + " °F"}
            </h3>
            <button className="weather__btn" onClick={handleChange}>
              Change to {isCelsius ? "°F" : "°C"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default WeatherCard;
