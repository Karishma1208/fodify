import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import "./signInLogInStyle.scss";
import "../../config/fire";
import { useHistory } from "react-router-dom";

function SignUpLogIn(props) {
  const history = useHistory();
  const [logInvalue, setLoginvalue] = useState({
    logInInput: "",
    logInPassword: "",
  });
  const [signInvalue, setsigninvalue] = useState({
    signUpname: "",
    signinput: "",
    signpassword: "",
  });

  const changeLogInhandler = (e) => {
    setLoginvalue({
      ...logInvalue,
      [e.target.name]: e.target.value,
    });
  };

  const signUpChangehandler = (e) => {
    setsigninvalue({
      ...signInvalue,
      [e.target.name]: e.target.value,
    });
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/restaurent");
      }
    });
  };

  const logininput = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        logInvalue.logInInput,
        logInvalue.logInPassword
      )
      .then(() => {
        authListener();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInInput = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        signInvalue.signinput,
        signInvalue.signpassword
      )
      .then((u) => {
        return u.user.updateProfile({
          displayName: signInvalue.signUpname,
        });
      })
      .catch((error) => console.log(error));
  };

  const myPopUpOne = () => {
    props.popUp();
  };

  return (
    <div className="SignUpLogIn_main_container">
      <div className="SignUpLogIn_container">
        <button id="X" onClick={myPopUpOne}>
          X
        </button>
        {props.flagOne ? (
          <div className="logIn_container">
            <p>Log In</p>
            <input
              type="text"
              onChange={(e) => {
                changeLogInhandler(e);
              }}
              name="logInInput"
              placeholder="ex.abc@gmail.com"
              value={logInvalue.logInInput}
            />
            <input
              type="password"
              onChange={(e) => {
                changeLogInhandler(e);
              }}
              name="logInPassword"
              placeholder="password"
              value={logInvalue.logInPassword}
            />
            <br />
            <button onClick={logininput}>Log In</button>
          </div>
        ) : null}

        {props.flagTwo ? (
          <div className="signUp_container">
            <p>Sign Up</p>
            <input
              type="text"
              onChange={(e) => {
                signUpChangehandler(e);
              }}
              placeholder="name"
              name="signUpname"
              value={signInvalue.signUpname}
            />
            <br />
            <input
              type="text"
              onChange={(e) => {
                signUpChangehandler(e);
              }}
              placeholder="ex.abc@gmail.com"
              name="signinput"
              value={signInvalue.signinput}
            />
            <br />
            <input
              type="password"
              onChange={(e) => {
                signUpChangehandler(e);
              }}
              placeholder="password"
              name="signpassword"
              value={signInvalue.signpassword}
            />
            <br />
            <button onClick={signInInput}>Sign Up</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SignUpLogIn;
