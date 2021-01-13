import React from "react";

const Home = React.lazy(() => import("./pages/HomePage"));

const routes = [
  {
    path: "/app2",
    component: Home,
  },
];

export default routes;
