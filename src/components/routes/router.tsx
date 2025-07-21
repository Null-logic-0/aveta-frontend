import { createBrowserRouter } from "react-router";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import Home from "../../pages/home";

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
    path: "/",
    element: <Home />,
  },
]);
