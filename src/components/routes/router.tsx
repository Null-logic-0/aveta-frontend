import { createBrowserRouter } from "react-router";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import Home from "../../pages/home";
import ForgotPassword from "../../pages/forgot-password";
import Success from "../authentication/Success";
import ChangePassword from "../../pages/change-password";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/:token/change-password",
    element: <ChangePassword />,
  },

  {
    path: "/",
    element: <Home />,
  },
]);
