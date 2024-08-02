import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setsearchValue] = useState("Indore");
  const [tempInfo, settempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=9c158692bbc9ee9a941fb355a13957d3`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main, weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const tempCelsius = (temp - 273.15).toFixed(2);

      const myWeatherInfo = {
        temp: tempCelsius,
        humidity,
        pressure,
        main,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      settempInfo(myWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  },[]);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            outoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
          ></input>
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;
