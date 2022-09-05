import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "..";
import Shop from "../pages/ShopList/ShopList";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
  const { user } = useContext(Context);
  // console.log(user);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(
          ({ path, Component }): JSX.Element => (
            <Route path={path} element={<Component />} key={path} />
          )
        )}
      {publicRoutes.map(
        ({ path, Component }): JSX.Element => (
          <Route path={path} element={<Component />} key={path} />
        )
      )}
      <Route path="*" element={<Shop />} />
    </Routes>
  );
};

export default AppRouter;
