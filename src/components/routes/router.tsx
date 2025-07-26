import { createBrowserRouter } from "react-router";

import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import Home from "../../pages/home";
import ForgotPassword from "../../pages/forgot-password";
import Success from "../../pages/Success";
import ChangePassword from "../../pages/change-password";
import RootLayout from "../../pages/root";
import ProtectRoutes from "../guards/ProtectRoutes";
import AuthRootLayout from "../../pages/auth-root";
import CharacterDetails from "../../pages/character-details";

export const router = createBrowserRouter([
  {
    element: (
      <ProtectRoutes redirectIfAuthenticated={true}>
        <AuthRootLayout />
      </ProtectRoutes>
    ),
    children: [
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
        path: "/reset-password",
        element: <ChangePassword />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <ProtectRoutes>
        <RootLayout />
      </ProtectRoutes>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:characterId",
        element: <CharacterDetails />,
      },
    ],
  },
]);
