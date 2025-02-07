import React from "react";

const Home = React.lazy(() => import("./pages/HomePage"));

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
];

export default routes;
