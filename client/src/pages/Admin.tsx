import React, { useState } from "react";
import CreateBrand from "../components/Modal/CreateBrand";
import CreateDevice from "../components/Modal/CreateDevice";
import CreateType from "../components/Modal/CreateType";

const classes =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded";
const Admin = () => {
  const [showType, onCloseType] = useState(false);
  const [showBrand, onCloseBrand] = useState(false);
  const [showDevice, onCloseDevice] = useState(false);

  return (
    <div className="flex justify-center	mt-30">
      <CreateType onClose={onCloseType} show={showType} />
      <CreateBrand show={showBrand} onClose={onCloseBrand} />
      <CreateDevice show={showDevice} onClose={onCloseDevice} />
      <button className={classes} onClick={() => onCloseType(true)}>
        Create Type
      </button>
      <button className={classes} onClick={() => onCloseBrand(true)}>
        Create Brand
      </button>
      <button className={classes} onClick={() => onCloseDevice(true)}>
        Create Device
      </button>
    </div>
  );
};

export default Admin;
