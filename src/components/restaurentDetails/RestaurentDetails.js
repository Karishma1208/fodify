import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import "./restaurentStyle.scss";
import Dish from "../cart/Dish ";

let imageUrl =
  "https://b.zmtcdn.com/data/res_imagery/307113_RESTAURANT_e2f599e624e5e8c01404af7608728671.jpg?output-format=webp";

function RestaurentDetails(props) {
  const [resData, setData] = useState(null);

  useEffect(() => {
    let res;
    if ((!props.res) && (localStorage.getItem("resData") !== '')) {
      res = localStorage.getItem("resData");
    }
    else {
      res = props.res;
    }
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/restaurant?res_id=${res}`,
        {
          headers: {
            "user-key": "7a77149c434216ebc2ae733a22ab3839",
          },
        }
      )
      .then((data) => {
        setData(data);
        if (props.res) {
          localStorage.setItem("resData", props.res);
        }
      })
      .catch((error) => {
        swal("Something went wrong!", error.message, "error");
      });
  }, [props.res]);

  let imgUrl = resData ?
    resData.data.featured_image ?
      resData.data.featured_image :
      imageUrl :
    imageUrl;

  return (
    <div>
      {resData ? (
        <div className="resDetails_container">
          <div className="resDetails_inner_container">
            <div className="dish_img_area">
              <img src={imgUrl} alt="Restraurent Img" />
            </div>
            <div className="resDetails_right_container">
              <div className="res_titleX">{resData.data.name}</div>
              <div className='res_cuisinesX'>{resData.data.cuisines}</div>
              <div className='res_locationX'>{resData.data.location.locality}</div>
              <div className='res_timingX'>{resData.data.timings}</div>

              <div className="cost_rateX">
                <div className='res_ratingX'><i class="fa fa-star" aria-hidden="true"></i> {resData.data.user_rating.aggregate_rating}<span className="res_ratingX_sub">{resData.data.user_rating.votes}+ Ratings</span></div>
                <div className='res_costX'><i class="fa fa-inr" aria-hidden="true"></i> {resData.data.average_cost_for_two}<span className="res_costX_sub">Cost for Two</span></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <p>loading...</p>
        )}
      <Dish />
    </div>
  );
}

export default RestaurentDetails;
