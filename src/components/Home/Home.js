import React from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={props.onLogout}>Logout</Button>
    </Card>
    ///this onLogout props allows the Button component to be defined in this instance for logout
    //alternatively this definition would be permanent
  );
};

export default Home;
