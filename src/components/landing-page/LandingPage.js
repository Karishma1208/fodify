import React, { useState } from "react";
import "./landingPageStyle.css";
import SignUpLogIn from "../SigUp-LogIn/SignUpLogIn";

function LandingPage(props) {
  const [cityInput, setCityInput] = useState("");
  const [loginPopup, setLogInPopUp] = useState(false);
  const [signupPopup, setSignInPopUp] = useState(false);

  const changeHandler = (e) => {
    setCityInput(e.target.value);
  };

  const clickHandler = () => {
    props.getCityName(cityInput);
  };

  const loginPopUp = () => {
    setLogInPopUp(!loginPopup);
  };

  const signupPopUp = () => {
    setSignInPopUp(!signupPopup);
  };

  return (
    <>
      <div className="landing_page_main_container">
        <div className="landing_page_header_container">
          <div className="fodify">fodify</div>
          <div className="signUpLoginButtons">
            <button onClick={loginPopUp}>Log In</button>
            <br />
            <button onClick={signupPopUp}>Sign Up</button>
          </div>
        </div>
        <div className="landing_page_search_by_city_container">
          <div>
            <input
              id="citySearch"
              type="text"
              placeholder="type city name to search"
              value={cityInput}
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <button id="citySearchbtn" onClick={clickHandler}>
              Search
            </button>
          </div>
        </div>
        {loginPopup ? (
          <SignUpLogIn popUp={loginPopUp} flagOne={loginPopup} />
        ) : null}

        {signupPopup ? (
          <SignUpLogIn popUp={signupPopUp} flagTwo={signupPopup} />
        ) : null}
      </div>
    </>
  );
}

export default LandingPage;
