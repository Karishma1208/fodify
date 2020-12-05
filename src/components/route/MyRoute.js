import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import swal from 'sweetalert';
import LandingPage from "../landing-page/LandingPage";
import MainPage from "../main-page/MainPage";
import About from "../about/About";
import RestaurentDetails from "../restaurentDetails/RestaurentDetails";
import { useHistory } from "react-router-dom";
import ForgetPassword from "../SigUp-LogIn/ForgetPassword";
import Payment from "../credit-card/Payment";

function MyRoute() {
  const history = useHistory();

  const [cityName, setCityName] = useState("");
  const [res, setRes] = useState("");

  const cityNameFromInputField = (cityName) => {
    setCityName(cityName);
    if (cityName === "") {
      swal({
        text: "Please fill correct city Name",
        icon: "warning",
      });
    } else {
      history.push("/restaurent");
    }
  };

  const getAboutPage = () => {
    history.push("/about");
  };

  const getRestaurentDetails = (resDetails) => {
    setRes(resDetails);
    if (resDetails) {
      history.push(`/restaurent${resDetails}`);
    }
  };

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <LandingPage getCityName={cityNameFromInputField} />}
        />
      </Switch>
      <Switch>
        <Route
          path="/restaurent"
          component={() => (
            <MainPage
              data={cityName}
              about={getAboutPage}
              resMain={getRestaurentDetails}
            />
          )}
        />
      </Switch>
      <Switch>
        <Route path="/about" component={About} />
      </Switch>
      <Switch>
        <Route path="/payment:firebaseUid" component={Payment} />
      </Switch>
      <Switch>
        <Route path="/forgetPassword" component={ForgetPassword} />
      </Switch>
      <Switch>
        <Route
          path="/restaurent:id"
          component={() => <RestaurentDetails res={res} />}
        />
      </Switch>
    </div>
  );
}
export default MyRoute;
