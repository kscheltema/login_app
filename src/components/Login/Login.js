import React, { useState, useReducer, useEffect } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
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
    isValid: null,
  });

  const passwordReducerHandler = (lastState, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
      return {
        value: lastState.value,
        isValid: lastState.value.trim().length > 6,
      };
    }
    return { value: "", isValid: false };
  };
  const [passwordState, dispatchPasswordFunc] = useReducer(
    passwordReducerHandler,
    { value: "", isValid: null }
  );

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const indentifierClear = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(indentifierClear);
    };
  }, [emailIsValid, passwordIsValid]);

  //an example of where dependencies is used
  //no useState value (setTimerIsActive)
  //no API functions (setTimeOut)
  //no variables or functions defined outside of the component (myTimer)

  const emailChangeHandler = (event) => {
    dispatchEmailFunc({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(passwordState.isValid && event.target.value.includes("@"));
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordFunc({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(passwordState.isValid && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmailFunc({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordFunc({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
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
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
