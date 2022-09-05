import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Context } from "../..";
import Page from "./Page";
import ShopItem from "./ShopItem";

const ShopList: FC = observer(() => {
  const { device } = useContext(Context);

  return (
    <>
      <div className="flex flex-wrap">
        {device.devices.map((dev) => (
          <ShopItem key={dev.id} device={dev} />
        ))}
      </div>
      <Page />
    </>
  );
});

export default ShopList;
