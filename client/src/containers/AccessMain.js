import React from "react";
import UserContext from "../components/PeopleComponents/UserContext";
import StateContext from "../components/StateContext";
import axios from "axios";
import SignupPage from "../components/LoginComponents/SingupPage";
function AccessMain() {
  const State = React.useContext(StateContext);
  const [x, setX] = React.useState();
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@gmail.com",
  };
  //`data:image/png;base64,${atob(employee.photo)}`
  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        let res = await axios({
          method: "post",
          url: "http://localhost:5000/api/company/prop/logo",
        });
        res = res.data;
        console.log(res);
        setX(res);
        setX(`data:image/png;base64,${atob(res)}`)
        if (!res) {
          return;
        }

        //   const employee = await axios({
        //     method: "post",
        //     url: "http://localhost:5000/api/employees/find/email",
        //     data: {
        //       email: email,
        //     },
        //   });
        //   res.employee = employee.data;
        //   setUser(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[]);

  console.log(State);
  return <div>
  <SignupPage logo={x}/>
  <SignupPage user={user} logo={x} />
     <img src={x} alt="rrr" />
    {x}
    AccessMain</div>;
}

export default AccessMain;
