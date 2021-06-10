import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
});
//can be as simple as text

export default AuthContext;
