import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Context } from "../..";

const classes =
  "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const did = device.selectedType.id;

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          {device.types.map((type) => {
            const isActive = did === type.id ? "bg-gray-100" : "";
            return (
              <li
                key={type.id}
                className={classes + " " + isActive}
                onClick={() => device.setSelectedType(type)}>
                {type.name}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
});

export default TypeBar;
