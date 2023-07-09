import AuthenticatedLayout from "../layouts/AuthenticatedLayouts";
import LoginLayout from "../layouts/LoginLayout";
import AskQuestion from "../pages/AskQuestion/AskQuestion.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";

export const REGISTER_ROUTE = "/register";
export const LOGIN_ROUTE = "/login";
export const HOME_ROUTE = "/";
export const ASKQUESTION_ROUTE = "/ask";
export const PROFILE_ROUTE = "/profile";

export const loginRoutes = {
  Layout: LoginLayout,
  routes: [
    {
      path: HOME_ROUTE,
      Component: Home,
    },
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
  ],
};

export const authenticatedRoutes = {
  Layout: AuthenticatedLayout,
  routes: [
    {
      path: HOME_ROUTE,
      Component: Home,
    },
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: PROFILE_ROUTE,
      Component: Profile,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
    {
      path: ASKQUESTION_ROUTE,
      Component: AskQuestion,
    },
  ],
};

export const topbarNavigationItems = [
  { route: HOME_ROUTE, title: "Home" },
  { route: LOGIN_ROUTE, title: "Login" },
  { route: REGISTER_ROUTE, title: "Register" },
  { route: ASKQUESTION_ROUTE, title: "AskQuestion" },
];
