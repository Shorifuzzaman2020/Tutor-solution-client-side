import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";
import AddTutorials from "../pages/AddTutorials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
        {
            index: true,
            element: <Home/>,
        },
        {
          path: 'add-tutorials',
          element: <AddTutorials/>,
        }
    ]
  },
]);
export default router;