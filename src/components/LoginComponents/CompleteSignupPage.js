import React from "react";
import SingupPage from "./SingupPage";
import { useParams } from "react-router-dom";
import Placeholder from "../PeopleComponents/Placeholder";
const api = require("../../assets/FetchServices");

export default function CompleteSignup() {
  const { token } = useParams();
  const [user, setUser] = React.useState();
  const [error, setEerror] = React.useState(false); // For tracking error to display appropriate page.

  React.useEffect(() => {
    async function fetch() {
      try {
        const user = await api.user.fetchOneByToken({token});
        setUser(user);
      } catch (err) {
        console.log(err);
        setEerror(true);
      }
    }
    fetch();
  }, []);

  if(error){
    return (<Placeholder>
      <h1>Page not found</h1>
  </Placeholder>
    )
}
  return (
      <SingupPage user={user} token={token}/>
  );
}
