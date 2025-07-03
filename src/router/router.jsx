import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";
import AddTutorials from "../pages/AddTutorials";
import FindTutors from "../pages/FindTutors";
import MyTutorials from "../pages/MyTutorials";
import MyBookedTutors from "../pages/MyBookedTutors";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EditTutorial from "../pages/EditTutorial";

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
        },
        {
          path: 'find-tutors',
          element: <FindTutors/>,
        },
        {
          path: 'my-tutorials',
          element: <MyTutorials/>,
        },
        {
          path: 'my-booked-tutors',
          element: <MyBookedTutors/>,
        },
        {
          path: 'login',
          element: <Login/>,
        },
        {
          path: 'register',
          element: <Register/>,
        },
        {
          path: 'edit-tutorial/:id',
          element: <EditTutorial/>,
        }
    ]
  },
]);
export default router;