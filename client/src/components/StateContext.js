import { createContext, useState } from "react";
import logo from "../assets/images/logo.png"

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    // state contains user, employee and company logo
  const [state, setState] = useState({logo}); 
  
  const updateState = ({newValues})=>{
    setState((values)=>({...values, ...newValues}))

  }

  return (
    <StateContext.Provider value={{ state, updateState }}>{children}</StateContext.Provider>
  );
};

export default StateContext;
