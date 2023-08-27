import "./styles/tailwind.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Schedule from "./pages/Schedule";
import Story from "./pages/Story";
import Shop from "./pages/Shop";
import Guide from "./pages/Guide";
import Faq from "./pages/Faq";
import Course from "./pages/Course";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { createHashRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";

//const router = createHashRouter([
//  {
//    path: "/",
//    element: <RootLayout />,
//    children: [
//      { index: true, element: <Home /> },
//      { path: "signin", element: <SignIn /> },
//      { path: "signup", element: <SignUp /> },
//      { path: "profile", element: <Profile /> },
//      { path: "about", element: <About /> },
//      { path: "course", element: <Course /> },
//      { path: "faq", element: <Faq /> },
//      { path: "guide", element: <Guide /> },
//      { path: "privacypolicy", element: <PrivacyPolicy /> },
//      { path: "schedule", element: <Schedule /> },
//      { path: "shop", element: <Shop /> },
//      { path: "story", element: <Story /> },
//    ],
//  },
//]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*<RouterProvider router={router} />*/}
    <App />
  </React.StrictMode>
);
