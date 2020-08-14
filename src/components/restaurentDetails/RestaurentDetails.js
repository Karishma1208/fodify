import React, { useState, useEffect } from "react";
import axios from "axios";

function RestaurentDetails(props) {
  const [resData, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/restaurant?res_id=${props.res}`,
        {
          headers: {
            "user-key": "7a77149c434216ebc2ae733a22ab3839",
          },
        }
      )
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {props.res}
      {console.log(resData)}
    </div>
  );
}

export default RestaurentDetails;
