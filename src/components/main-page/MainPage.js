import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import "./MainPageStyle.css";
import { sorted, localityRest } from "./../filters/Filters";
import SignUpLogIn from "../SigUp-LogIn/SignUpLogIn";
import * as firebase from "firebase";
import "../../config/fire";
import { useHistory } from "react-router-dom";
import { camelize } from './../../utility'
import Cart from "../cart/Cart ";

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
  const [locDetails, setLocDetails] = useState([])

  const [filterShow, setFilterShow] = useState(false);
  const [cartShow, setCartShow] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setCityName(props.data);
    setNewCityName(props.data);

    if (props.data !== "") {
      localStorage.setItem("cityName", props.data);
    }
  }, [props.data]);

  useEffect(() => {
    auth();
    (() => {
      if ((cityName === "") && (localStorage.getItem("cityName") !== '')) {
        setCityName(localStorage.getItem("cityName"));
      }
    })();
    if (cityName !== "") {
      axios
        .get(`https://developers.zomato.com/api/v2.1/cities?q=${cityName}`, {
          headers: {
            "user-key": "7a77149c434216ebc2ae733a22ab3839",
          },
        })
        .then((data) => {
          setCityId(data.data.location_suggestions[0].id);
        })
        .catch((error) => {
          swal("Something went wrong!", error.message, "error");
        });
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
          setLocDetails(localityRest(data.data.restaurants));
        })
        .catch((error) => {
          swal("Something went wrong!", error.message, "error");
        });
    }
  }, [cityId, qVal]);

  const changeCityHandler = (e) => {
    setNewCityName(e.target.value);
    localStorage.setItem("cityName", e.target.value);
  };

  const onSearchHandler = () => {
    setCityName(newCityName);
  };

  const changeDish = (e) => {
    setQval(e.target.value);
  };

  let keys = Object.keys(locDetails);

  let localityHandlor = (key) => {
    setRestData([...locDetails[key]]);
  };

  let listItems = keys.map((key) => {
    return (
      <div onClick={() => localityHandlor(key)} className="locFilter">
        {key}
      </div>
    );
  });

  const hidePopup = () => {
    setLogInPopUp(false);
    setSignupPopup(false);
  }

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

  const showFilter = () => {
    setFilterShow(!filterShow);
  }

  const showCart = () => {
    setCartShow(!cartShow);
  }

  return (
    <>
      <div className="MainPage_container">

        <div className="MainPage_nav_container">
          <div className="navTitle">Fodify</div>
          <div className='MainPage_nav_Inner'>
            <div className='navSearches'>
              <div>
                <input
                  onChange={changeCityHandler}
                  id="typeNewCity"
                  type="text"
                  value={newCityName}
                  placeholder="Search for city..."
                />
                <button id="searchNewCity" onClick={onSearchHandler}>City</button>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Search for dish..."
                  id="typeDish"
                  value={qVal}
                  onChange={(e) => {
                    changeDish(e);
                  }}
                />
              </div>
            </div>
            <div className="navBtns">
              {/* <button onClick={aboutHandler} id='abt' className="navBtn">About</button> */}

              {
                user ?
                  <button className="navBtn" onClick={logout}>Log Out</button> :
                  <button onClick={loginPopUp} className="navBtn">Log In</button>
              }
              {
                !user ?
                  <button onClick={signupPopUp} id='sup' className="navBtn">Sign Up</button> :
                  null
              }
              <button onClick={showCart} className="navBtn">Cart</button>
            </div>

            {
              user ?
                <div className="userName">{user.displayName}</div> :
                <div className="userName">Hello, Guest</div>
            }

          </div>
        </div>

        <div className="mainPage_main_container">
          {cityName ?
            <div className="mainPage_main_data_container">
              <div className="mainPage_main_data_Title">Restaurants in {camelize(cityName)}</div>
              <div className="filterCollapse"><button onClick={showFilter} className="filterCollapseBtn">☰ Filters</button></div>
              <div className='mainPage_main_data_Inner'>
                <div className="MainPage_filter_container">
                  <div>
                    <div className='filterTitle'>Sort by</div>
                    <div onClick={() => setRestData([...sorted(restaurentData, "popularity")])} className="filter">
                      Top Picks
                    </div>
                    <div className='marginBot'></div>
                    <div onClick={() => setRestData([...sorted(restaurentData, "rating")])} className="filter">
                      Best Rating
              </div>
                    <div className='marginBot'></div>
                    <div
                      onClick={() => setRestData([...sorted(restaurentData, "costHL")])} className="filter">
                      Cost <span style={{ color: '#777', fontSize: '14px' }}>- High To Low</span>
                    </div>
                    <div className='marginBot'></div>
                    <div
                      onClick={() => setRestData([...sorted(restaurentData, "costLH")])} className="filter">
                      Cost <span style={{ color: '#777', fontSize: '14px' }}>- Low To High</span>
                    </div>
                  </div>
                  {dataFetch ? (
                    <div>
                      <div className='marginBot'></div>
                      <div style={{ height: '20px' }}></div>
                      <div className="filterTitle">Location</div>
                      {listItems}
                    </div>
                  ) : null}
                </div>

                {
                  filterShow ?
                    <div className="MainPage_filter_container" id="ftr">
                      <div>
                        <div className='filterTitle'>Sort by</div>
                        <div onClick={() => setRestData([...sorted(restaurentData, "popularity")])} className="filter">
                          Top Picks
                    </div>
                        <div className='marginBot'></div>
                        <div onClick={() => setRestData([...sorted(restaurentData, "rating")])} className="filter">
                          Best Rating
              </div>
                        <div className='marginBot'></div>
                        <div
                          onClick={() => setRestData([...sorted(restaurentData, "costHL")])} className="filter">
                          Cost <span style={{ color: '#777', fontSize: '14px' }}>- High To Low</span>
                        </div>
                        <div className='marginBot'></div>
                        <div
                          onClick={() => setRestData([...sorted(restaurentData, "costLH")])} className="filter">
                          Cost <span style={{ color: '#777', fontSize: '14px' }}>- Low To High</span>
                        </div>
                      </div>
                      {dataFetch ? (
                        <div>
                          <div className='marginBot'></div>
                          <div style={{ height: '20px' }}></div>
                          <div className="filterTitle">Location</div>
                          {listItems}
                        </div>
                      ) : null}
                    </div> : null
                }

                <div className="mainPage_card_container">
                  {restData.length !== 0 ? (
                    restData.map((items) => {
                      return (
                        <div className="mainPage_restaurent_inner_container"
                          key={items.restaurant.R.res_id}
                          onClick={() => { resData(items.restaurant.R.res_id) }}>
                          <div className="mainPage_restaurent_card_container">
                            <div className="res_img_area">
                              <img src={items.restaurant.thumb} alt="Restaurant Img" />
                            </div>
                            <div className="res_title">{items.restaurant.name}</div>
                            <div className='res_cuisines'>{items.restaurant.cuisines}</div>
                            <div className='marginBot'></div>
                            <div className="rate-cost">
                              {
                                items.restaurant.user_rating.aggregate_rating > 4 ?
                                  <div className='res_rating_green'>{items.restaurant.user_rating.aggregate_rating}</div> :
                                  <div className='res_rating_red'>{items.restaurant.user_rating.aggregate_rating}</div>
                              }
                              <div className="res_cost">{items.restaurant.average_cost_for_two}{items.restaurant.currency} For Two</div>
                            </div>
                            <div className="res_timing">{items.restaurant.timings}</div>
                            <div className='marginBot'></div>
                            <div className='res_loc'>{items.restaurant.location.address}</div>


                          </div>
                        </div>
                      );
                    })
                  ) : (
                      <h1>Loading....</h1>
                    )}
                </div>

              </div>
            </div> :
            null}
          {
            cartShow ?
              < Cart /> :
              null
          }
        </div>
        {/* {
          cartShow ?
            < Cart /> :
            null
        } */}
      </div>
      {loginPopup ? (
        <SignUpLogIn popUp={loginPopUp} hidePopup={hidePopup} flagOne={loginPopup} />
      ) : null}
      {signupPopup ? (
        <SignUpLogIn popUp={signupPopUp} hidePopup={hidePopup} flagTwo={signupPopup} />
      ) : null}
    </>
  );
}
export default MainPage;
