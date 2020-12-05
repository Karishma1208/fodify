import React, { useState } from "react";
import "./landingPageStyle.css";
import SignUpLogIn from "../SigUp-LogIn/SignUpLogIn";

function LandingPage(props) {
  const [cityInput, setCityInput] = useState("");
  const [loginPopup, setLogInPopUp] = useState(false);
  const [signupPopup, setSignInPopUp] = useState(false);
  const [showCity, setShowCity] = useState(false);

  const changeHandler = (e) => {
    setCityInput(e.target.value);
  };

  const hidePopup = () => {
    setLogInPopUp(false);
    setSignInPopUp(false);
  }

  const clickHandler = () => {
    props.getCityName(cityInput);
  };

  const loginPopUp = () => {
    setLogInPopUp(!loginPopup);
  };

  const signupPopUp = () => {
    setSignInPopUp(!signupPopup);
  };

  const cityDropDown = () => {
    setShowCity(!showCity);
  }

  const citySelectDropDown = (e) => {
    setCityInput(e.target.value);
    props.getCityName(e.target.value);
  }

  return (
    <div className="landing_page_main_container">
      <div className='landing_page_header_container'>

        <div className="signUpLoginButtons">
          <button onClick={loginPopUp}>Log In</button>
          <button onClick={signupPopUp}>Sign Up</button>
        </div>

        <div className="title">fodify</div>
        <div className="subTitle">Order food from favourite restaurants near you...</div>

        <div className="landing_page_search_by_city_container">

          <div className="nearMeArea">
            <button className="nearMe" onClick={cityDropDown}><i className="fa fa-map-marker"></i><span>Top Cities</span></button>
            {
              showCity ?
                (<div className="dropdown-content">
                  <option className='dropdown-content-items' value='mumbai' onClick={citySelectDropDown}>Mumbai</option>
                  <option className='dropdown-content-items' value='Delhi' onClick={citySelectDropDown}>Delhi</option>
                  <option className='dropdown-content-items' value='kolkata' onClick={citySelectDropDown}>Kolkata</option>
                  <option className='dropdown-content-items' value='chennai' onClick={citySelectDropDown}>Chennai</option>
                  <option className='dropdown-content-items' value='chandigarh' onClick={citySelectDropDown}>Chandigarh</option>
                  <option className='dropdown-content-items' value='pune' onClick={citySelectDropDown}>Pune</option>
                  <option className='dropdown-content-items' value='ahmedabad' onClick={citySelectDropDown}>Ahmedabad</option>
                </div>) :
                null
            }
          </div>

          <input id="citySearch" type="text" name="search" placeholder="Search for city..."
            onChange={changeHandler} />
          <button id="citySearchbtn" onClick={clickHandler}>
            <i className="fa fa-search"></i>
          </button>
        </div>

        {loginPopup ? (
          <SignUpLogIn popUp={loginPopUp} hidePopup={hidePopup} flagOne={loginPopup} />
        ) : null}

        {signupPopup ? (
          <SignUpLogIn popUp={signupPopUp} hidePopup={hidePopup} flagTwo={signupPopup} />
        ) : null}
      </div>
    </div>
  );
}

export default LandingPage;
