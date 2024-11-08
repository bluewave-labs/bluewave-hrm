import { StateProvider } from "./context/StateContext.js";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./containers/LandingPage.js";
import SetNewPasswordPage from "./components/LoginComponents/SetNewPassword.jsx";
import Dashboard from "./containers/Dashboard.js";
import CompleteSignup from "./components/LoginComponents/CompleteSignupPage.js";
import OffBoardingPage from "./components/OffBoardingComponents/OffBoardingPage.jsx";
<<<<<<< HEAD
import { StepContent } from "@mui/material";
import ProfilePages from "./containers/ProfilePages.js";
=======
import EmployeeOnboarding from "./containers/EmployeeOnboarding.js";
import ErrorPage from "./components/Error/ErrorPage.jsx";
>>>>>>> 916e7549067db2af140026a3ca1630bd1d71983c

function App() {
  return (
    <StateProvider>
      <Routes>
<<<<<<< HEAD
        {/* <Route path="/" element={<LandingPage />} />
        <Route path="/resetpassword/:id" element={<SetNewPasswordPage />} />
        <Route path="/complete-signup/:token" element={<CompleteSignup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="off-boarding/:token" element={<OffBoardingPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<ProfilePages />} />

        <Route
          path="*"
          element={
            <Placeholder>
              <h1>Page not found</h1>
            </Placeholder>
          }
        />
=======
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<EmployeeOnboarding />} />
        <Route path="/resetpassword/:id" element={<SetNewPasswordPage />} />
        <Route path="/complete-signup/:token" element={<CompleteSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/off-boarding/:token" element={<OffBoardingPage />} />
        <Route path="*" element={<ErrorPage />} />
>>>>>>> 916e7549067db2af140026a3ca1630bd1d71983c
      </Routes>
    </StateProvider>
  );
}

export default App;
