import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./Components/About/About";
import Donate from "./Components/Donate/Donate";
import Gallery from "./Components/Gallery/Gallery";
import Events from "./Components/Events/Events";
import Contact from "./Components/Contact/Contact";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Signup from "./Components/Login/Signup";
import Error from "./Components/Error/Error";
import Course from "./Components/Course/Course";
import { UserProvider } from "./Context/UserContext"; // Use UserProvider instead of UserContext

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Donate",
        element: <Donate />,
      },
      {
        path: "Gallery",
        element: <Gallery />,
      },
      {
        path: "Events",
        element: <Events />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Signup",
        element: <Signup />,
      },
      {
        path: "Course",
        element: <Course />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <UserProvider> {/* Wrap with UserProvider */}
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
