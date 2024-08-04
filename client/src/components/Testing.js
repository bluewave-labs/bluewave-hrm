import React, { useContext } from "react";
import UserContext from "./PeopleComponents/UserContext";
import LoginPage from "./LoginComponents/LoginPage";
import CreateAccountPage from "./LoginComponents/CreateAccountPage";
import SignupPage from "./LoginComponents/SingupPage";
import logo from "../assets/images/logo.png";
import AccessMain from "../containers/AccessMain";
function Testing() {
  const User = useContext(UserContext);
  console.log(User);
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@gmail.com",
  };
  return (
    <div>
      
      {/* <AccessMain />
      <SignupPage logo={logo}/>
      <SignupPage user={user} logo={logo} /> */}
    </div>
  );
}

export default Testing;
