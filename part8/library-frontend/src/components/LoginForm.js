import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KEY } from "../App";
import { LOGIN_MUTATION } from "../Graphql/Query";

const LoginForm = (props) => {
  const [loginMutation, response] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginMutation({
      variables: {
        username: loginState.username,
        password: loginState.password,
      },
    });
  };
  useEffect(() => {
    if (response.data) {
      props.setToken(response.data.login.value);
      localStorage.setItem(KEY, response.data.login.value);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.data]);
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          Name:{" "}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Your Username"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
