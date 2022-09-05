import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import MyNavbar from "./components/Navbar";
import { checkUser } from "./http/userApi";

const App: FC = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser()
      .then(() => {
        user.setIsAuth(true);
        user.setUser(JSON.parse(localStorage.getItem("user")!));
      })
      .catch((e) => {
        user.setIsAuth(false);
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <MyNavbar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
