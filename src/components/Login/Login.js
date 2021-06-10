import React, { useState, useReducer, useEffect, useContext } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";
import classes from "./Login.module.css";

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

  const authCtx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  //bad to have and use*** run on an property,
  //with this object destructuring can target the object within the whole property thus saving resources

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
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordFunc({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmailFunc({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordFunc({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogedIn(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailIsValid}
          id="email"
          htmlFor="email"
          label="E-Mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          isValid={passwordIsValid}
          id="password"
          htmlFor="password"
          label="Password"
          type="password"
          value={emailState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
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
