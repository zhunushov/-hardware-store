import Admin from "./pages/Admin";
import Auth from "./pages/AuthPage";
import Backet from "./pages/Backet";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/ShopList";

import { AuthRoutes } from "./utils/const";

export const authRoutes = [
  {
    path: AuthRoutes.ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: AuthRoutes.BASKET_ROUTE,
    Component: Backet,
  },
];

export const publicRoutes = [
  {
    path: AuthRoutes.SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: AuthRoutes.LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: AuthRoutes.REGISTERATION_ROUTE,
    Component: Auth,
  },
  {
    path: AuthRoutes.DEVICE_ROUTE + "/:id",
    Component: DevicePage,
  },
];
