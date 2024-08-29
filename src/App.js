import { StateProvider } from "./context/StateContext.js";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./containers/LandingPage.js";
import SetNewPasswordPage from "./components/LoginComponents/SetNewPassword.jsx";
import Dashboard from "./containers/Dashboard.js";
import Placeholder from "./components/PeopleComponents/Placeholder.js";
import CompleteSignup from "./components/LoginComponents/CompleteSignupPage.js";


function App() {
  return (
    <StateProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resetpassword/:id" element={<SetNewPasswordPage />} />
        <Route path="/complete-signup/:token" element={<CompleteSignup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="off-boarding/:token" element={<Placeholder content={"Off-boarding component"}/>} />
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
