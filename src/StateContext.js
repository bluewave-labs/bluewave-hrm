import { createContext, useState, useEffect } from "react";
import { produce } from "immer";
import axios from "axios";
import logo from "../src/Images/HRM_logo_large.svg";

//const user = require("../assets/user.json");
//const employee = require("../assets/employee.json");
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // state contains user, employee and company logo
 // const [state, setState] = useState({ logo});
  const [state, setState] = useState({});

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const res = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/employees/2',
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      });;
        //if (res.data) {
          //const image = `data:image/png;base64,${atob(res.data)}`;
          updateState("employee", res.data);
          console.log(res.data);
       // }
      } catch (err) {
        console.log(err);
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
