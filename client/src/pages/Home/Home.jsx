import React, { useState } from "react";
import "./Home.css";
import Header from "../../component/Header/Header";
import Explore from "../../component/Explore/Explore";
import FoodDisplay from "../../component/FoodDisplay/FoodDisplay";
import AppDownload from "../../component/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <Explore category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
