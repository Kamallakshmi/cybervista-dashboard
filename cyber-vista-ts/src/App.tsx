import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashboardScreen from "./pages/DashboardScreen";
import { SidebarLayout } from "./pages/SidebarLayout";
import MyNavbar from "./components/widgets/MyNavbar";
import { HeroSectionWithBeamsAndGrid } from "./components/widgets/HeroSectionWithBeamsAndGrid";
import Footer from "./components/widgets/Footer";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSectionWithBeamsAndGrid />
              <DashboardScreen />
              <Footer />
            </>
          }
        />

        <Route path="/dashboard" element={<SidebarLayout />} />
      </Routes>
    </>
  );
}

export default App;
