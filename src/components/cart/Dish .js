import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import * as firebase from "firebase";
import "../../config/fire";
import Cart from "./Cart ";
import "./dishStyle.css";

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishData: [],
      cart: {},
      uid: "",
      showCartStatus: false,
    };
  }

  addDishToCart = () => {
    firebase
      .database()
      .ref(this.state.uid)
      .child(this.state.cart.dish_id)
      .set({ ...this.state.cart, quantity: 1 });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          uid: user.uid,
        });
      }
    });

    axios(
      `https://cors-anywhere.herokuapp.com/https://aamirmenusapi.herokuapp.com/menuitems`
    )
      .then((data) => {
        this.setState({
          dishData: data.data,
        });
      })
      .catch((error) => {
        swal("Something went wrong!", error.message, "error");
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            uid: user.uid,
          });
          firebase
            .database()
            .ref(user.uid)
            .child(this.state.cart.dish_id)
            .set({ ...this.state.cart, quantity: 1 });
        }
      });
    } else {
      return null;
    }
  }

  addToCartHandlar = (item) => {
    if (this.state.uid !== "") {
      this.setState({
        cart: item,
      });
    } else {
      swal("please login first Before add to cart");
    }
  };

  showCart = () => {
    this.setState({ showCartStatus: !this.state.showCartStatus });
  };

  render() {
    return (
      <div className="XouterX">
        <div className="cartContainerOuter">
          <button onClick={this.showCart} className="showCartBtn">
            Cart
          </button>
          {this.state.showCartStatus ? <Cart /> : null}
        </div>

        <div className="dishContainer">
          {this.state.dishData.length !== 0
            ? this.state.dishData.map((item, index) => {
                return (
                  <div key={index} className="dish_box">
                    <div className="dish_img_areaX">
                      <img src={item.img} alt="Dish img" />
                    </div>
                    <div className="dish_data">
                      <div className="dish_nameX">{item.name}</div>
                      <div className="dish_priceX">Price: {item.price}</div>
                      <button
                        className="dish_addToCartX"
                        onClick={() => this.addToCartHandlar(item)}
                      >
                        {" "}
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div className="normalCart">
          <Cart />
        </div>

        {/* </div> */}
      </div>
    );
  }
}
export default Dish;
