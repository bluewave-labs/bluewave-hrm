import { StateProvider } from "./context/StateContext.js";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./containers/LandingPage.js";
import SetNewPasswordPage from "./components/LoginComponents/SetNewPassword.jsx";
import Dashboard from "./containers/Dashboard.js";
import Placeholder from "./components/PeopleComponents/Placeholder.js";
import CompleteSignup from "./components/LoginComponents/CompleteSignupPage.js";
import OffBoardingPage from "./components/OffBoardingComponents/OffBoardingPage.jsx";
import OnboardingPage from "./components/OnboardingPage/OnboardingPage.jsx";
import { StepContent } from "@mui/material";

function App() {
  return (
    <StateProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/resetpassword/:id" element={<SetNewPasswordPage />} />
        <Route path="/complete-signup/:token" element={<CompleteSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/off-boarding/:token" element={<OffBoardingPage />} />
        <Route
          path="*"
          element={
            <Placeholder>
              <h1>Page not found</h1>
            </Placeholder>
          }
        />
      </Routes>
    </StateProvider>
  );
}

export default App;
