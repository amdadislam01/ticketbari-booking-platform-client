import { createBrowserRouter } from "react-router";
import Mainlayouts from "../layouts/Mainlayouts";
import Home from "../pages/Home/Home";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayouts />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]);
