import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../landing-page/LandingPage";
import MainPage from "../main-page/MainPage";
import About from "../about/About";
import RestaurentDetails from "../restaurentDetails/RestaurentDetails";
import { useHistory } from "react-router-dom";

function MyRoute() {
  const history = useHistory();

  const [cityName, setCityName] = useState("");
  const [res, setRes] = useState("");

  const cityNameFromInputField = (cityName) => {
    console.log(cityName);
    setCityName(cityName);
    if (cityName === "") {
      alert("Please fill correct city Name");
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
        <Route
          path="/restaurent:id"
          component={() => <RestaurentDetails res={res} />}
        />
      </Switch>
    </div>
  );
}
export default MyRoute;
