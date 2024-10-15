import { StateProvider } from "./context/StateContext.js";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./containers/LandingPage.js";
import SetNewPasswordPage from "./components/LoginComponents/SetNewPassword.jsx";
import Dashboard from "./containers/Dashboard.js";
import Placeholder from "./components/PeopleComponents/Placeholder.js";
import CompleteSignup from "./components/LoginComponents/CompleteSignupPage.js";
import OffBoardingPage from "./components/OffBoardingComponents/OffBoardingPage.jsx";
import EmployeeOnboarding from "./containers/EmployeeOnboarding.js";
import { StepContent } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./components/Error/ErrorPage.jsx";

function App() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/employee-on-boarding"); // Change to dashboard
    console.log("Clicked");
    const api = require("./assets/FetchServices");
    api.employee
      .finalizeOnboarding(25)
      .then((data) => {
        console.log("Testing******************", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StateProvider>
      <h1>Hello</h1>
      <Button onClick={handleClick}>Click me</Button>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resetpassword/:id" element={<SetNewPasswordPage />} />
        <Route path="/complete-signup/:token" element={<CompleteSignup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="off-boarding/:token" element={<OffBoardingPage />} />
        <Route path="employee-on-boarding" element={<EmployeeOnboarding />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </StateProvider>
  );
}

export default App;
