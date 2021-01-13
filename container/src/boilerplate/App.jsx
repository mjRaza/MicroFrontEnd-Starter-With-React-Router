import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import app1Routes from "app1/routes";
import app2Routes from "app2/routes";
import localRoutes from "../routes";
const routes = [...localRoutes, ...app1Routes, ...app2Routes];

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
