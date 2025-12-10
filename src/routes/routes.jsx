import { createBrowserRouter } from "react-router";
import Mainlayouts from "../layouts/Mainlayouts";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import Dashboard from "../layouts/Dashboard";
import PrivetRoutes from "./PrivetRoutes";
import AllTickets from "../pages/AllTickets/AllTickets";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import MyProfile from "../components/MyProfile/MyProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Mainlayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: '/all-tickets',
        element: <PrivetRoutes><AllTickets /></PrivetRoutes>
      },
      {
        path: '/my-profile',
        element: <PrivetRoutes><MyProfile /></PrivetRoutes>
      },
      {
        path: '/all-tickets/:id',
        element: <PrivetRoutes><TicketDetails /></PrivetRoutes>
      }
    ],
  },
  {
    path: '/dashboard',
    element: <PrivetRoutes><Dashboard /></PrivetRoutes>
  },
]);
