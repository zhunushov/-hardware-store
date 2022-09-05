import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import { fetchBrands, fetchDevices, fetchTypes } from "../../http/deviceApi";
import BrandBar from "./BrandBar";
import ShopList from "./ShopList";
import TypeBar from "./TypeBar";

const Index = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((res) => device.setTypes(res));
    fetchBrands().then((res) => device.setBrands(res));
    fetchDevices(
      device.page,
      device.limit,
      device.selectedType.id,
      device.selectedBrand.id
    ).then((res) => {
      device.setDevices(res.rows);
      device.setTotalCount(res.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      device.page,
      device.limit,
      device.selectedType.id,
      device.selectedBrand.id
    ).then((res) => {
      console.log(res.rows);

      device.setDevices(res.rows);
      device.setTotalCount(res.count);
    });
  }, [
    device.page,
    device.limit,
    device.selectedType.id,
    device.selectedBrand.id,
  ]);
  return (
    <div className="flex flex-col md:flex-row">
      <TypeBar />
      <div>
        <BrandBar />
        <div className="m-3">
          <ShopList />
        </div>
      </div>
    </div>
  );
});

export default Index;
