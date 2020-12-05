import React, { useState } from "react";
import * as firebase from "firebase";
import swal from 'sweetalert';
import "../../config/fire";
import "./forgetPasswordStyles.css";

function ForgetPassword() {
  const [forgetPassword, setForgetPassword] = useState("");

  const forgetPasswordChangehandler = (e) => {
    setForgetPassword(e.target.value);
  };

  const clickForgetHandeler = () => {
    if (forgetPassword !== "") {
      firebase
        .auth()
        .sendPasswordResetEmail(forgetPassword)
        .then(() => {
          swal({
            text: "Email has been sent please resset password",
            icon: "info",
          });
        })
        .catch((error) => {
          swal("Something went wrong!", error.message, "error");
        });
    } else {
      swal({
        text: "Please fill email",
        icon: "warning",
      });
    }
  };

  return (
    <div className="forgetPassword_main_conatiner">
      <p>Enter your email to reset your password</p>
      <div className="forgetpassword_container">
        <input
          onChange={(e) => {
            forgetPasswordChangehandler(e);
          }}
          id="forgetpassword-field"
          value={forgetPassword}
        />
        <br />
        <button onClick={clickForgetHandeler} id="forgetpassword-btn">
          reset password
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
