import React, { useState, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailReducerHandler = (lastState, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "INPUT_BLUR") {
      return { value: lastState.value, isValid: lastState.value.includes("@") };
    }
    return { value: "", isValid: false };
  };
  const [emailState, dispatchEmailFunc] = useReducer(emailReducerHandler, {
    value: "",
    isValid: false,
  });

  // useEffect(() => {
  //   const indentifierClear = setTimeout(() => {
  //     setFormIsValid(
  //       enteredPassword.trim().length > 6 && enteredEmail.includes("@")
  //     );
  //     return () => {
  //       clearTimeout(indentifierClear);
  //     };
  //   }, 750);
  // }, [enteredEmail, enteredPassword]);

  //an example of where dependencies is used
  //no useState value (setTimerIsActive)
  //no API functions (setTimeOut)
  //no variables or functions defined outside of the component (myTimer)

  const emailChangeHandler = (event) => {
    dispatchEmailFunc({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(enteredPassword.trim().length > 6 && emailState.isValid);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(enteredPassword.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmailFunc({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
