import React from "react";

const HomePage = React.lazy(() => import("./pages/HomePage"));

const routes = [
  {
    path: "/app1",
    component: HomePage,
  },
];

export default routes;
