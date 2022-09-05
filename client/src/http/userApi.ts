import jwtDecode from "jwt-decode";
import { $host, $authHost } from "./index";

export const registration = async (email: string, password: string) => {
  try {
    const { data } = await $host.post("/api/user/registration", {
      email,
      password,
      role: "ADMIN",
    });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error: any) {
    console.log("Error registration", error.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data } = await $host.post("/api/user/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error: any) {
    console.log("Error login", error.message);
  }
};
export const checkUser = async () => {
  try {
    const { data } = await $authHost.get(`/api/user/auth`);
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error: any) {
    console.log("Error getUser", error.message);
  }
};
