import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const api = {
  key: "46dfa342c9a52e67290bd7b47366ec9b",
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [isClicked, setIsClicked] = useState(false);
  const [isvisible, setIsVisible] = useState(true);
  const [isMenu, setIsMenu] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const check = () => {
    setIsMenu(false);
  };

  const Invisible = () => {
    setIsVisible(false);
  };

  const getlocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getWeather = async () => {
    try {
      if (location.lat && location.lon) {
        const response = await fetch(
          `${api.base}forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${api.key}`
        );
        const weatherdata = await response.json();
        setWeather(weatherdata);
        console.log(weatherdata);
      }
    } catch (eror) {
      console.log(eror);
    }
  };

  const Menu = () => {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isClicked ? 0 : 1, transition: { duration: 0.3 } }}
      >
        <img src="/src/image/logo.png" alt="logo_weather" className="h-64" />
        <div className="mb-32">
          <h1 className="font-bold text-4xl text-left mr-10 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent ">
            Weather Forecast Online
          </h1>
          <p className="text-white mr-10">
            Check Your Local Weather Forecast With A Single Click
          </p>
          <button
            onClick={() => {
              getlocation();
              handleClick();
              Invisible();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
          >
            Get Location
          </button>
        </div>
      </motion.div>
    );
  };

  useEffect(() => {
    console.log("Location:", location);
  }, [location]);
  useEffect(() => {
    console.log("Weather:", weather);
  }, [weather]);
  useEffect(() => {
    if (location.lat && location.lon) {
      getWeather();
    }
  }, [location]);

  const WaitFetch = () => {
    return (
      <div>
        {weather ? (
          <>
            <Showweather />
          </>
        ) : null}
      </div>
    );
  };

  // const format_time = (time) => {
  //   const timestamp = time;
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();
  //   const minutes = "00";
  //   return `${hours}:${minutes}`;
  // };

  // const Weatherhour = () => {
  //   return (
  //     <div className="w-screen flex  justify-center mb-5">
  //       <div className=" flex justify-center items-center bg-gray-100 bg-opacity-50  p-3 rounded-lg shadow-lg w-11/12 ">
  //         <div>
  //           <h1>{format_time(weather.list[0].dt)}</h1>
  //           <img src="/logo.png" alt="logo" className="w-24" />
  //         </div>
  //         <div>
  //           <h1>{format_time(weather.list[1].dt)}</h1>
  //           <img src="/logo.png" alt="logo" className="w-24" />
  //         </div>
  //         <div>
  //           <h1>{format_time(weather.list[2].dt)}</h1>
  //           <img src="/logo.png" alt="logo" className="w-24" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const Showweather = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenu ? 0 : 1, transition: { duration: 0.3 } }}
        className="w-screen flex flex-col justify-center items-center mb-5"
      >
        <h1 className="text-white text-7xl font-bold">
          {weather.list[0].main.temp} °C
        </h1>
        <h1 className="text-white text-2xl">
          {weather.list[0].weather[0].description}
        </h1>
        <h1 className="text-white">{weather.city.name}</h1>
      </motion.div>
    );
  };

  return (
    <div
      className={
        isvisible
          ? "flex flex-col justify-center items-center h-screen p-5"
          : "flex flex-col justify-center items-center h-screen p-5"
      }
    >
      {isvisible ? <Menu /> : <WaitFetch />}
    </div>
  );
}
