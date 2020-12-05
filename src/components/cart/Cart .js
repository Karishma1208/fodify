import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
import swal from 'sweetalert';
import "../../config/fire";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      uid: "",
    };
  }

  firebaseData = () => {
    firebase
      .database()
      .ref(this.state.uid)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          this.setState({
            cartItems: Object.values(snapshot.val()),
          });
        } else {
          this.setState({
            cartItems: [],
          });
        }
      });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.uid !== this.state.uid) {
      this.firebaseData();
    }
    if (prevState.cartItems !== this.state.cartItems) {
      this.state.cartItems.forEach((y) => {
        if (y.quantity === 0) {
          firebase.database().ref(this.state.uid).child(y.dish_id).remove();
        }
      });
    }
  }

  increamentHandler = (value) => {
    firebase
      .database()
      .ref(this.state.uid)
      .child(value.dish_id)
      .update({
        quantity: value.quantity + 1,
      });
  };

  decreamentHandler = (value) => {
    if (value.quantity >= 1) {
      firebase
        .database()
        .ref(this.state.uid)
        .child(value.dish_id)
        .update({
          quantity: value.quantity - 1,
        });
    }
  };

  checkOutHandler = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push(`/payment${this.state.uid}`);
      } else {
        swal({
          text: "Please login first...",
          icon: "warning",
        });
      }
    });
  };

  render() {
    let cartItems;
    this.state.cartItems.length
      ? (cartItems = this.state.cartItems.map((value) => {
        return (
          <div key={value.dish_id} className="cart_item_card">
            <div className="cart_item_card_left">
              <div className="cart_item_name">{value.name}</div>
              <div className="cart_item_price">{value.price}</div>
            </div>
            <div className="cart_item_card_right">
              <div className="cart_item_card_right_top">
                <button
                  className="decBtn"
                  onClick={() => {
                    this.decreamentHandler(value);
                  }}
                >
                  -
                  </button>
                <div>{value.quantity}</div>
                <button
                  className="incBtn"
                  onClick={() => {
                    this.increamentHandler(value);
                  }}
                >
                  +
                  </button>
              </div>
              <div className="cart_item_card_right_bot">
                <i class="fa fa-inr" aria-hidden="true"></i>{" "}
                {parseInt(value.price) * parseInt(value.quantity)}
              </div>
            </div>
          </div>
        );
      }))
      : (cartItems = (
        <div className="cart_item_card">Your Cart is Currently empty</div>
      ));
    let totalItem = 0;
    let totalPrice = 0;

    for (let i in this.state.cartItems) {
      totalPrice +=
        parseInt(this.state.cartItems[i].price) *
        parseInt(this.state.cartItems[i].quantity);
      totalItem += parseInt(this.state.cartItems[i].quantity);
    }

    return (
      <div className="cartConatiner">
        <div className="cart_title">Cart</div>
        <div className="cart_totalItem">{totalItem} Items</div>
        <div className="cart_Items">{cartItems}</div>
        <div className="total_price">Total Price {totalPrice}</div>
        <button onClick={this.checkOutHandler} className="checkoutBtn">
          Checkout
        </button>
      </div>
    );
  }
}

export default withRouter(Cart);
