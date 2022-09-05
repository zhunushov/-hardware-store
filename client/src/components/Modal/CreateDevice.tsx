import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceApi";
import { IBrands, ITypes } from "../../types/Device";

interface IProps {
  show: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}
const CreateDevice: FC<IProps> = ({ onClose, show }) => {
  const [dropShowTypes, setDropShowTypes] = useState(false);
  const [dropShowBrands, setDropShowBrands] = useState(false);
  const [activeType, setActiveType] = useState<ITypes>({} as ITypes);
  const [activeBrand, setActiveBrand] = useState<IBrands>({} as IBrands);
  const [infos, setInfos] = useState<any[]>([]);
  const { device } = useContext(Context);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File>({} as File);

  const addInfo = () => {
    setInfos([...infos, { title: "", description: "", id: Date.now() }]);
  };

  const changeInfo = (key: string, value: string, id: string) => {
    setInfos(infos.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const removeInfo = (ids: number) => {
    setInfos(infos.filter((_) => _.id !== ids));
  };

  const addDevice = async () => {
    try {
      const formData = new FormData();
      formData.append("name", title);
      formData.append("price", price);
      formData.append("info", JSON.stringify(infos));
      formData.append("brandId", `${activeBrand.id}`);
      formData.append("typeId", `${activeType.id}`);
      if (file) {
        formData.append("img", file);
      }
      await createDevice(formData);
      onClose(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTypes().then((res) => device.setTypes(res));
    fetchBrands().then((res) => device.setBrands(res));
  }, []);

  return (
    <>
      <div
        id="defaultModal"
        className={` ${
          !show && "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex`}
        tabIndex={-1}
        aria-modal="true"
        role="dialog">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Terms of Service
              </h3>
              <button
                onClick={() => onClose(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-2 flex">
              {/* Types DropDown */}
              <div className="mr-1">
                <button
                  onClick={() => setDropShowTypes(!dropShowTypes)}
                  id="dropdownInformationButton"
                  data-dropdown-toggle={true}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button">
                  {activeType.name || "Выберите тип "}
                  <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div
                  id="dropdown-device"
                  className={`  ${
                    !dropShowTypes && "hidden"
                  }  z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block`}
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="bottom">
                  {" "}
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton">
                    {device.types.map((type) => (
                      <li
                        key={type.id}
                        onClick={() => {
                          setDropShowTypes(false);
                          setActiveType(type);
                        }}
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {type.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Types DropDown */}
              {/* Brand DrowDown */}
              <div>
                <button
                  onClick={() => setDropShowBrands(!dropShowBrands)}
                  id="dropdownInformationButton"
                  data-dropdown-toggle={true}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button">
                  {activeBrand.name || " Выберите Бренд"} {""}
                  <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div
                  id="dropdown-device"
                  className={`  ${
                    !dropShowBrands && "hidden"
                  }  z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block`}
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="bottom">
                  {" "}
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton">
                    {device.brands.map((type) => (
                      <li
                        key={type.id}
                        onClick={() => {
                          setDropShowBrands(false);
                          setActiveBrand(type);
                        }}
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {type.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Brand DrowDown */}
            </div>
            <div className="p-6 space-y-6">
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800">
                  Price
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800">
                  Img (File)
                </label>
                <input
                  onChange={(e) => setFile(e.target.files![0])}
                  type="file"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <hr />
            <button
              onClick={addInfo}
              className="ml-5 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Добавить новыe свойства
            </button>
            {infos.map((item, index) => (
              <span className="flex justify-evenly	mb-4 mt-2" key={item.id}>
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-semibold text-gray-800">
                    Title
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      changeInfo("title", e.target.value, item.id)
                    }
                    placeholder="Title"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-semibold text-gray-800">
                    Description
                  </label>
                  <input
                    onChange={(e) =>
                      changeInfo("description", e.target.value, item.id)
                    }
                    type="text"
                    placeholder="Description"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <button
                  onClick={() => removeInfo(item.id)}
                  className="h-10 mt-7 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Delete
                </button>{" "}
              </span>
            ))}
            <hr />
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={addDevice}
                data-modal-toggle="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                I accept
              </button>
              <button
                onClick={() => onClose(false)}
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDevice;
