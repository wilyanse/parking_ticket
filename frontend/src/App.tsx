import { Route, Routes } from "react-router-dom";

import ReservationsPage from "./pages/ReservationsPage";

import HomePage from "@/pages/home";
import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import LogoutPage from "@/pages/logout";
import LocationsPage from "@/pages/locations";
import ParkingLotsPage from "@/pages/ParkingLotPage";
import ProfilePage from "./pages/ProfilePage";
// import DocsPage from "@/pages/docs";
// import PricingPage from "@/pages/pricing";
// import BlogPage from "@/pages/blog";
// import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<LogoutPage />} path="/logout" />
      <Route element={<LocationsPage />} path="/locations" />
      <Route element={<HomePage />} path="/dashboard" />
      <Route element={<ParkingLotsPage />} path="/locations/:lotId" />
      <Route element={<ReservationsPage />} path="/reservations" />
      <Route element={<ProfilePage />} path="/profile" />
      {/* <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" /> */}
    </Routes>
  );
}

export default App;
