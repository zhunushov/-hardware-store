import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Context } from "../..";

const classes =
  "px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500";

const BrandBar: FC = observer(() => {
  const { device } = useContext(Context);

  return (
    <div className="d-flex">
      {device.brands.map((brand) => {
        const isActive =
          device.selectedBrand.id === brand.id ? "bg-slate-400" : "";
        return (
          <kbd
            onClick={() => device.setSelectedBrand(brand)}
            className={classes + " " + isActive}
            key={brand.id}>
            {brand.name}
          </kbd>
        );
      })}
    </div>
  );
});

export default BrandBar;
