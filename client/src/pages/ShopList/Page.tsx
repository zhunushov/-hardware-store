import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Context } from "../..";
import { IDeviceStore } from "../../types/Device";

const Page = observer(() => {
  const { device } = useContext(Context);
  const { page, limit, totalCount } = device;
  const totalPages = Math.ceil(totalCount / limit);
  const pages: number[] = [];
  console.log(page);
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <PREV device={device} />
        {pages.map((p) => {
          const isActive = p === page ? activeClass : classes;
          return (
            <li key={p} className={isActive} onClick={() => device.setPage(p)}>
              {p}
            </li>
          );
        })}
        <NEXT device={device} />
      </ul>
    </nav>
  );
});
export default Page;

export const PREV: FC<{ device: IDeviceStore }> = observer(({ device }) => {
  const prevPage = () => {
    device.setPage(device.page - 1);
  };
  return (
    <button disabled={device.page === 1} onClick={prevPage}>
      <span className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"></path>
        </svg>
      </span>
    </button>
  );
});

export const NEXT: FC<{ device: IDeviceStore }> = observer(({ device }) => {
  const nextPage = () => {
    const pageLength = Math.ceil(device.totalCount / device.limit);
    if (pageLength === device.page) return;
    device.setPage(device.page + 1);
  };

  return (
    <button onClick={nextPage}>
      <span className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"></path>
        </svg>
      </span>
    </button>
  );
});

export const classes =
  "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
export const activeClass =
  "z-10 py-2 px-3 -tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white";
