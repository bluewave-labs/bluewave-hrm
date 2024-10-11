import React, { useContext, useState } from "react";
import "./login.css";
import "./signup.css";
import PageContext from "../../context/PageContext";
import StateContext from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../assets/utils";
const validator = require("validator");
const api = require("../../assets/FetchServices");

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState(null);
  const stateContext = useContext(StateContext);
  const pageContext = useContext(PageContext);
  const navigate = useNavigate();

  const disableButton = () => {
    return !validator.isEmail(email) || !password;
  };

  const handleSubmit = async () => {
    try {
      const res = await api.authentication.login({email, password});
      const { user, employee } = await getAuthUser(email);
      stateContext.updateStates({ user, employee });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      }
      console.log("Login operation failed to due an error", error);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="logo-container">
          <img src={stateContext.state.logo} alt="logo" />
        </div>
        <h2>Log in to your account</h2>
        {message && <div className="error-alert">{message}</div>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-group-2">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember for 30 days
            </label>
            <button
              className="button-forgot-password "
              onClick={() => pageContext.navigateTo("forgotPassword")}
            >
              Forgot Password
            </button>
          </div>
        </div>
        <button
          className="sign-in-button"
          onClick={handleSubmit}
          disabled={disableButton()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
