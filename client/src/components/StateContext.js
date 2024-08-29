import { createContext, useState, useEffect } from "react";
import { produce } from "immer";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/HRM_logo_large.svg";
const api = require("../assets/FetchServices");
const user = require("../assets/user.json");
const employee = require("../assets/employee.json");
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // state contains user, employee and company logo
  const [state, setState] = useState({ logo });
  const navigate = useNavigate();

  //const [state, setState] = useState({ logo, user, employee });

  useEffect(() => {
    async function fetchData() {
      // Get logo
      try {
        const res = api.company.fetchLogo();
        const image = `data:image/png;base64,${atob(res)}`;
        updateState("logo", image);
      } catch (err) {
        console.log("Company logo not found, using default hrm logo");
      }

      try {
        const currentUser = await api.user.refresh();
        if (currentUser) {
          // Get associated employee record
          const currentEmployee = await api.employee.fetchOneByEmail(
            currentUser.email
          );
          const data ={
            user: currentUser,
            employee: currentEmployee
          }
          updateStates(data);
          navigate("/dashboard", { replace: true });
        } else {
          throw "No active session, please log in.";
        }
      } catch (err) {
        console.log(err);
        navigate("/",{replace:true}); // Redirect to login page

      }
    }
    fetchData();
  }, []);

  const updateState = (key, value) => {
    const data = produce(state, (newState) => {
      newState[key] = value;
    });
    setState(data);
  };

  //Change multiple values at the same time. This function takes an array of objects - {key, value}
  const updateStates = (values) => {
    const data = produce(state, (newState) => {
      for (let [key, value] of Object.entries(values)) {
        newState[key] = value;
      }
    });
    setState(data);
  };

  return (
    <StateContext.Provider value={{ state, updateState, updateStates }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
