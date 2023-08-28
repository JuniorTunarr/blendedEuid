import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<Profile />} />
      <Route path="about" element={<About />} />
      <Route path="course" element={<Course />} />
      <Route path="faq" element={<Faq />} />
      <Route path="guide" element={<Guide />} />
      <Route path="privacypolicy" element={<PrivacyPolicy />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="shop" element={<Shop />} />
      <Route path="story" element={<Story />} />
    </Route>
  ),
);

export default router;
