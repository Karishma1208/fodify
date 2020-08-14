import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainPageStyle.css";
import { sorted, localityRest } from "./../filters/Filters";
import SignUpLogIn from "../SigUp-LogIn/SignUpLogIn";
import { Link } from "react-router-dom";
import {CartIcon} from '../icons';
import * as firebase from "firebase";
import "../../config/fire";
//import Payment from './components/PayMent/Payment';
import { useHistory } from "react-router-dom";
import Cart from "../cart/Cart";

function MainPage(props) {
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [restaurentData, setRestaurentData] = useState([]);

  const [restData, setRestData] = useState([]);
  const [dataFetch, setDataFetch] = useState(false);

  const [newCityName, setNewCityName] = useState("");
  const [qVal, setQval] = useState("");
  const [loginPopup, setLogInPopUp] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    setCityName(props.data);
    setNewCityName(props.data);
  }, []);

  useEffect(() => {
    auth();
    if (cityName !== "") {
      axios
        .get(`https://developers.zomato.com/api/v2.1/cities?q=${cityName}`, {
          headers: {
            "user-key": "7a77149c434216ebc2ae733a22ab3839",
          },
        })
        .then((data) => {
          setCityId(data.data.location_suggestions[0].id);
        });
    } else {
      console.log("hello");
    }
  }, [cityName]);

  useEffect(() => {
    if (cityId !== "") {
      axios
        .get(
          `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&q=${qVal}`,
          {
            headers: {
              "user-key": "7a77149c434216ebc2ae733a22ab3839",
            },
          }
        )
        .then((data) => {
          setDataFetch(true);
          setRestaurentData(data.data.restaurants);
          setRestData([...sorted(data.data.restaurants, "popularity")]);
        });
    } else {
      console.log("welcome");
    }
  }, [cityId, qVal]);

  const changeCityHandler = (e) => {
    setNewCityName(e.target.value);
  };

  const onSearchHandler = () => {
    setCityName(newCityName);
  };

  const changeDish = (e) => {
    setQval(e.target.value);
  };

  let loc = localityRest(restaurentData);
  let keys = Object.keys(loc);

  let localityHandlor = (key) => {
    setRestData([...loc[key]]);
  };

  let listItems = keys.map((key) => {
    return (
      <div onClick={() => localityHandlor(key)} className="locFilter">
        {key}
      </div>
    );
  });

  const loginPopUp = () => {
    setLogInPopUp(!loginPopup);
    auth();
  };

  const signupPopUp = () => {
    setSignupPopup(!signupPopup);
  };

  function auth() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .then(() => {
        history.push("/");
      });
  };

  const aboutHandler = () => {
    props.about();
  };

  const resData = (details) => {
    props.resMain(details);
  };

  return (
    <>
      {console.log(props)}
      <div className="MainPage_container">
        {console.log(cityName)}
        {console.log(cityId)}
        {console.log(restaurentData)}
        <div className="MainPage_nav_container">
          <div>
            <input
              onChange={(e) => {
                changeCityHandler(e);
              }}
              id="typeNewCity"
              type="text"
              value={newCityName}
            />
            <button id="searchNewCity" onClick={onSearchHandler}>
              city
            </button>
          </div>

          <div>
            <input
              type="text"
              placeholder="search city"
              id="typeCity"
              value={qVal}
              onChange={(e) => {
                changeDish(e);
              }}
            />
            {/* <button id="typeDishes">dishes</button> */}
          </div>

          <div onClick={aboutHandler}>about</div>

          <Link to="cart/"> <CartIcon/> 
         cart({})
          </Link>


          <div>
            {user ? (
              <span>{user.displayName}</span>
            ) : (
              <button onClick={signupPopUp} id="mainPageSignUP">
                Sign Up
              </button>
            )}
            {user ? (
              <button id="logOutBtn" onClick={logout}>
                Log out
              </button>
            ) : (
              <button onClick={loginPopUp} id="mainPageLogIn">
                Log In
              </button>
            )}
          </div>
        </div>
        <div className="mainPage_main_data_container">
          <div className="MainPage_filter_container">
            <div>
              <div
                onClick={() =>
                  setRestData([...sorted(restaurentData, "popularity")])
                }
                className="filter"
              >
                Top Picks
              </div>
              <div
                onClick={() =>
                  setRestData([...sorted(restaurentData, "rating")])
                }
                className="filter"
              >
                Best Rating
              </div>
              <div
                onClick={() =>
                  setRestData([...sorted(restaurentData, "costHL")])
                }
                className="filter"
              >
                High To Low
              </div>
              <div
                onClick={() =>
                  setRestData([...sorted(restaurentData, "costLH")])
                }
                className="filter"
              >
                Cost low to high
              </div>
            </div>
            <br />
            <br />
            {dataFetch ? (
              <div>
                <div className="filter">Locations of {cityName}</div>
                {listItems}
              </div>
            ) : null}
          </div>
          <div className="mainPage_restaurent_container">
            <div className="mainPage_card_container">
              {restData.length !== 0 ? (
                restData.map((items) => {
                  return (
                    <div
                      className="mainPage_restaurent_inner_container"
                      key={items.restaurant.R.res_id}
                      onClick={() => {
                        resData(items.restaurant.R.res_id);
                      }}
                    >
                      <div className="mainPage_restaurent_card_container">
                        <img
                          src={items.restaurant.thumb}
                          alt="food"
                          width="300px"
                          height="130px"
                        />
                        <p>{items.restaurant.name}</p>
                        <span>{items.restaurant.cuisines}</span>
                        <br />
                        <span>
                          {items.restaurant.user_rating.aggregate_rating}
                        </span>
                        <span id="timing">{items.restaurant.timings}</span>
                        <span>
                          {items.restaurant.average_cost_for_two}
                          {items.restaurant.currency}
                        </span>{" "}
                        <br />
                        <br />
                        <button id="btnForCart">Add to Card</button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1>Loading....</h1>
              )}
            </div>
          </div>
          <div className="mainPage_cart_container">Cart</div>
          
        </div>
      </div>
      {loginPopup ? (
        <SignUpLogIn popUp={loginPopUp} flagOne={loginPopup} />
      ) : null}
      {signupPopup ? (
        <SignUpLogIn popUp={signupPopUp} flagTwo={signupPopup} />
      ) : null}
    </>
  );
}
export default MainPage;
