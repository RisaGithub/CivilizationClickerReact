// src/pages/Home.js
import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [wood, setWood] = useState(() => {
    const savedWood = localStorage.getItem("wood");
    return savedWood ? parseInt(savedWood, 10) : 0;
  });
  const [stone, setStone] = useState(() => {
    const savedStone = localStorage.getItem("stone");
    return savedStone ? parseInt(savedStone, 10) : 0;
  });
  const [food, setFood] = useState(() => {
    const savedFood = localStorage.getItem("food");
    return savedFood ? parseInt(savedFood, 10) : 0;
  });
  const [farmers, setFarmers] = useState(() => {
    const savedFarmers = localStorage.getItem("farmers");
    return savedFarmers ? parseInt(savedFarmers, 10) : 0;
  });
  const [workers, setWorkers] = useState(() => {
    const savedWorkers = localStorage.getItem("workers");
    return savedWorkers ? parseInt(savedWorkers, 10) : 0;
  });
  const [houses, setHouses] = useState(() => {
    const savedHouses = localStorage.getItem("houses");
    return savedHouses ? parseInt(savedHouses, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("wood", wood);
  }, [wood]);

  useEffect(() => {
    localStorage.setItem("stone", stone);
  }, [stone]);

  useEffect(() => {
    localStorage.setItem("food", food);
  }, [food]);

  useEffect(() => {
    localStorage.setItem("farmers", farmers);
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem("workers", workers);
  }, [workers]);

  useEffect(() => {
    localStorage.setItem("houses", houses);
  }, [houses]);

  const collectWood = () => {
    setWood(wood + 1);
  };

  const collectStone = () => {
    setStone(stone + 1);
  };

  const collectFood = () => {
    setFood(food + 1);
  };

  const buyFarmer = () => {
    if (food >= 10) {
      setFarmers(farmers + 1);
      setFood(food - 10);
    } else {
      alert("Not enough food to buy a farmer!");
    }
  };

  const buyWorker = () => {
    if (food >= 5) {
      setWorkers(workers + 1);
      setFood(food - 5);
    } else {
      alert("Not enough food to buy a worker!");
    }
  };

  const buyHouse = () => {
    if (wood >= 10 && stone >= 5) {
      setFood(wood - 10);
      setStone(stone - 5);
      setHouses(houses + 1);
    } else {
      alert("Not enough resources to buy a house!");
    }
  };

  const resetCivilization = () => {
    localStorage.clear();
    setWood(0);
    setStone(0);
    setFood(0);
    setFarmers(0);
    setWorkers(0);
    setHouses(0);
  };

  useEffect(() => {
    const productionInterval = setInterval(() => {
      setWood((prevWood) => prevWood + workers);
      setStone((prevStone) => prevStone + workers);
    }, 1000);

    return () => clearInterval(productionInterval);
  }, [workers]);

  useEffect(() => {
    const productionInterval = setInterval(() => {
      setFood((prevFood) => prevFood + farmers);
    }, 1000);

    return () => clearInterval(productionInterval);
  }, [farmers]);

  return (
    <div className="home-container">
      <h1>Welcome to Civilization Clicker</h1>
      <div className="groups">
        <div className="group">
          <div className="resource">
            <h2>Food: {food}</h2>
            <button className="-bg-food" onClick={collectFood}>Collect Food</button>
          </div>
          <div className="resource">
            <h2>Wood: {wood}</h2>
            <button className="-bg-wood" onClick={collectWood}>Collect Wood</button>
          </div>
          <div className="resource">
            <h2>Stone: {stone}</h2>
            <button className="-bg-stone" onClick={collectStone}>Collect Stone</button>
          </div>
        </div>

        <div className="group">
          <div className="resource">
            <h2>Farmers: {farmers}</h2>
            <button className="-bg-green" onClick={buyFarmer}>Buy Farmer (10 Food)</button>
          </div>
          <div className="resource">
            <h2>Workers: {workers}</h2>
            <button className="-bg-green" onClick={buyWorker}>Buy Worker (5 Food)</button>
          </div>
        </div>

        <div className="group">
          <div className="resource">
            <h2>Houses: {houses}</h2>
            <button className="-bg-blue" onClick={buyHouse}>Buy House (10 wood + 5 stone)</button>
          </div>
        </div>
      </div>

      <button className="clear-button" onClick={resetCivilization}>
        Reset Civilization
      </button>
    </div>
  );
};

export default Home;
