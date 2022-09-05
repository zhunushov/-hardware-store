import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DeviceStore from "./store/DeviceStore";
import UserStore from "./store/UserStore";
import { IDeviceStore } from "./types/Device";
import { IUserStore } from "./types/User";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const initialState = {
  user: {} as IUserStore,
  device: {} as IDeviceStore,
};

export const Context = React.createContext(initialState);

root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        device: new DeviceStore(),
      }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
