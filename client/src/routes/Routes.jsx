/* eslint-disable no-unused-vars */

import React, { useContext } from "react";
import { Routes as RoutesWrapper, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginRoutes /* AuthenticatedLayout */ } from "../routes/const";
import { authenticatedRoutes } from "../routes/const";

const Routes = () => {
  const { user } = useContext(UserContext);
  const { Layout, routes } = user ? authenticatedRoutes : loginRoutes;

  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ))}
    </RoutesWrapper>
  );
};

export default Routes;
