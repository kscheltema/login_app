import React, { useState, useEffect } from "react";
import AuthContext from "./store/auth-context";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  ///this local stored state is a singular example where no dependency is required
  const storedIsLoggedInInfo = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (storedIsLoggedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, [storedIsLoggedInInfo]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  //the Provider as required as an Add-on to AuthContext
  //because AuthContainer does not have a <div> function
  //<AuthContext.Provider> also replaces the need for <React.Fragment>
  //for <AuthContext.Provider> to allow change to the store state need to pass it in like below
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
      }}
    >
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
