import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GlobeComponent from "./pages/GlobeComponent";
import EmailDashboard from "./pages/EmailDashboard";
import GeneralDashboard from "./pages/GeneralDashboard";
import LoginFailureTable from "./pages/LoginFailureTable";
import MFADashboard from "./pages/MfaDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="py-10 max-w-7xl mx-auto">
                  <EmailDashboard />
                </div>
                <div className="py-10 max-w-7xl mx-auto">
                  <MFADashboard />
                </div>
                <div className="py-10 max-w-7xl mx-auto">
                  <GeneralDashboard />
                </div>
                <div className="py-10 max-w-7xl mx-auto">
                  <LoginFailureTable />
                </div>
                <div className="py-10 max-w-7xl mx-auto">
                  <GlobeComponent />
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
