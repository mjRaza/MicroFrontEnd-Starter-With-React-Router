import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      Welcome to Homespage from Dashboard
      <div></div>
      <Link to="/app1">click here to hi app1</Link>
      <div></div>
      <Link to="/app2">click here to hi app2</Link>
    </div>
  );
};

export default HomePage;
