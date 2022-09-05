import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IDevice } from "../../types/Device";
import { AuthRoutes } from "../../utils/const";

interface IProps {
  device: IDevice;
}
const ShopItem: FC<IProps> = observer(({ device }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${AuthRoutes.DEVICE_ROUTE}/${device.id}`)}
      className=" m-1 max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div style={{ maxWidth: "300px", height: "300px" }}>
        <img
          className="p-8 rounded-t-lg"
          src={process.env.REACT_APP_API_URL + "/" + device.img}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {device.name}
        </h5>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $:{device.price}
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
});

export default ShopItem;
