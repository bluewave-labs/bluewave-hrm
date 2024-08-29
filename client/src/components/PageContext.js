import React from "react";
import axios from "axios";

const PageContext = React.createContext();

const pageItems = ["login", "signup", "onboarding", "dashboard", "placeholder", "checkMail", "forgotPassword", "resetPassword", "newPassword" ];

export const PageProvider = ({ children }) => {
  const [page, setPage] = React.useState({ placeholder: true });

  const navigateTo = (page) => {
    const pageData = {};
    for (let item of pageItems) {
      pageData[item] = false;
    }
    pageData[page] = true;
    setPage(pageData);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios({
          method: "post",
          url: "http://localhost:5000/api/appusers/find/init/check",
        });
        const initialPage = res.data.message ? "login" : "onboarding"
        navigateTo(initialPage);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  },[]);


  return (
    <PageContext.Provider value={{ page, navigateTo }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
