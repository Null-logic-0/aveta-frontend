import { createBrowserRouter } from "react-router";

import Chat from "../../pages/chat";
import Home from "../../pages/home";
import Prices from "../../pages/prices";
import SignIn from "../../pages/sign-in";
import SignUp from "../../pages/sign-up";
import RootLayout from "../../pages/root";
import ErrorPage from "../../pages/error-page";
import ProtectRoutes from "../guards/ProtectRoutes";
import AuthRootLayout from "../../pages/auth-root";
import UserProfile from "../../pages/user-profile";
import ChatRootLayout from "../../pages/chat-root";
import ForgotPassword from "../../pages/forgot-password";
import ChangePassword from "../../pages/change-password";
import CreateCharacter from "../../pages/create-character";
import UpdateCharacter from "../../pages/update-character";
import CharacterDetails from "../../pages/character-details";
import EmailSuccessMessage from "../../pages/email-success-message";
import PaymentSucceed from "../../pages/payment-succeed";
import PaymentDeclined from "../../pages/payment-declined";

export const router = createBrowserRouter([
  {
    element: (
      <ProtectRoutes redirectIfAuthenticated={true}>
        <AuthRootLayout />
      </ProtectRoutes>
    ),
    errorElement: <ErrorPage />,
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
        element: <EmailSuccessMessage />,
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
        path: "/profile/:userId",
        element: <UserProfile />,
      },
      {
        path: "/create-character",
        element: <CreateCharacter />,
      },
      {
        path: "/update-character/:characterId",
        element: <UpdateCharacter />,
      },
      {
        path: "/character/:characterId",
        element: <CharacterDetails />,
      },
      {
        path: "/prices",
        element: <Prices />,
      },
    ],
  },
  {
    path: "/chat/:chatId",
    element: (
      <ProtectRoutes>
        <ChatRootLayout />
      </ProtectRoutes>
    ),
    children: [
      {
        index: true,
        element: <Chat />,
      },
    ],
  },
  {
    path: "/payment-succeed",
    element: <PaymentSucceed />,
  },
  {
    path: "/payment-declined",
    element: <PaymentDeclined />,
  },
]);
