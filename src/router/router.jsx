import {
  createBrowserRouter,
  RouterProvider,
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
import TutorDetails from "../pages/TutorDetails";
import LanguageCategorySection from "../pages/LanguageCategorySection";
import FindTutorsByCategory from "../pages/FindTutorsByCategory";
import ProtectedRoute from "../pages/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'add-tutorials',
        element: (
          <ProtectedRoute>
            <AddTutorials />
          </ProtectedRoute>
        )
      },
      {
        path: 'find-tutors',
        element: <FindTutors />,
      },
      {
        path: 'my-tutorials',
        element: (
          <ProtectedRoute>
            <MyTutorials />
          </ProtectedRoute>
        )
      },
      {
        path: 'my-booked-tutors',
        element: (
          <ProtectedRoute>
            <MyBookedTutors />
          </ProtectedRoute>
        )
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'edit-tutorial/:id',
        element: <EditTutorial />,
      },
      {
        path: '/tutor/:id',
        element: <TutorDetails />,
      },
      {
        path: 'categories',
        element: <LanguageCategorySection />,
      },
      {
        path: 'find-tutors/:category',
        element: <FindTutorsByCategory />,
      },
    ]
  },
]);
export default router;