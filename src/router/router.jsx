import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
        {
            index: true,
            element: <Home/>,
        }
    ]
  },
]);
export default router;