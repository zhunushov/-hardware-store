import { $authHost, $host } from ".";

export const createType = async (type: string) => {
  try {
    const { data } = await $authHost.post("/api/type", { name: type });
    return data;
  } catch (e: any) {
    console.log(e.message);
  }
};
export const fetchTypes = async () => {
  try {
    const { data } = await $host.get("/api/type");
    return data;
  } catch (e: any) {
    console.log(e.message);
  }
};
export const createBrand = async (brand: string) => {
  console.log(brand);
  try {
    const { data } = await $authHost.post("/api/brand", { name: brand });
    return data;
  } catch (e: any) {
    console.log(e);
  }
};
export const fetchBrands = async () => {
  try {
    const { data } = await $host.get("/api/brand");
    return data;
  } catch (e: any) {
    console.log(e.message);
  }
};
export const createDevice = async (device: any) => {
  try {
    const { data } = await $authHost.post("api/device", device);
    return data;
  } catch (e: any) {
    console.log(e.message);
  }
};

export const fetchDevices = async (
  page: number,
  limit: number,
  typeId: number,
  brandId: number
) => {
  try {
    const { data } = await $host.get("/api/device", {
      params: {
        limit,
        page,
        brandId,
        typeId,
      },
    });
    return data;
  } catch (e: any) {
    console.log(e.message);
  }
};
export const fetchOneDevice = async (id: number) => {
  try {
    const { data } = await $host.get(`/api/device/${id}`);
    return data;
  } catch (e: any) {
    console.log(e.message);
  }
};
