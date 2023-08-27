import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/Auth";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import RootLayout from "./layout/RootLayout";
import { createBrowserRouter } from "react-router-dom";
//import { Route } from "react-router-dom";
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
//import { Router } from "react-router-dom";
//import { Routes } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "profile", element: <Profile /> },
        { path: "about", element: <About /> },
        { path: "course", element: <Course /> },
        { path: "faq", element: <Faq /> },
        { path: "guide", element: <Guide /> },
        { path: "privacypolicy", element: <PrivacyPolicy /> },
        { path: "schedule", element: <Schedule /> },
        { path: "shop", element: <Shop /> },
        { path: "story", element: <Story /> },
      ],
    },
  ],
  { basename: "/blendedEuid" }
);

function App() {
  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <div className="App">
            <RouterProvider router={router} />
            {/*{children}*/}
          </div>
        </AuthProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
