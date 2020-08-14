import React,{Component} from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import "./Cart.css";

const stripeApiKey =
  "pk_test_51HDpMZE0s7zYCs27NRC0XGvqGh9wQUoHRZjC1Ygs4buhjdYnhNBGQDi6uS540DaJCanj4RmOVRtwsLU1xXzMy2zv00IYaEOW5F";


const checkoutUrl = "https://asdf1234.sse.codesandbox.io/gator/rent/checkout";

class Cart extends Component {
  state = {
    product: "one-for-five",
    show: true
  };

  handleClose = () => {
    console.log("App#handleClose");
  };

  handleOpen = () => {
    console.log("App#handleOpen");
  };

  handleProductChange = (evt) => {
    this.setState({ product: evt.target.value });
  };

  toggleShow = () => {
    this.setState((state) => ({
      show: !state.show
    }));
  };

  handleToken = (token, addresses) => {
    console.log("App#handleToken");
    console.log(token);
    console.log(addresses);
    const { product } = this.state;

    const body = new FormData();
    // Send information to determine how to charge customer:
    body.append("product", product);
    body.append("quantity", 1);

    // Send standard Stripe information:
    body.append("stripeEmail", token.email);
    body.append("stripeToken", token.id);
    body.append("stripeTokenType", token.type);

    body.append("stripeBillingName", addresses.billing_name || "");
    body.append(
      "stripeBillingAddressLine1",
      addresses.billing_address_line1 || ""
    );
    body.append("stripeBillingAddressZip", addresses.billing_address_zip || "");
    body.append(
      "stripeBillingAddressState",
      addresses.billing_address_state || ""
    );
    body.append(
      "stripeBillingAddressCity",
      addresses.billing_address_city || ""
    );
    body.append(
      "stripeBillingAddressCountry",
      addresses.billing_address_country || ""
    );
    body.append(
      "stripeBillingAddressCountryCode",
      addresses.billing_address_country_code || ""
    );

    body.append("stripeShippingName", addresses.shipping_name || "");
    body.append(
      "stripeShippingAddressLine1",
      addresses.shipping_address_line1 || ""
    );
    body.append(
      "stripeShippingAddressZip",
      addresses.shipping_address_zip || ""
    );
    body.append(
      "stripeShippingAddressState",
      addresses.shipping_address_state || ""
    );
    body.append(
      "stripeShippingAddressCity",
      addresses.shipping_address_city || ""
    );
    body.append(
      "stripeShippingAddressCountry",
      addresses.shipping_address_country || ""
    );
    body.append(
      "stripeShippingAddressCountryCode",
      addresses.shipping_address_country_code || ""
    );

    fetch(checkoutUrl, {
      method: "POST",
      body,
      mode: "cors"
    })
      .then((res) => {
        console.log("response received");
        console.dir(res);
        return res.json();
      })
      .then((result) => {
        console.log("result");
        console.log(result);
      })
      .catch((error) => {
        console.log("error");
        console.error(
          error,
          "You may need to refresh the server sandbox. It hibernates due to inactivity."
        );
      });
  };

  render() {
    const { product, show } = this.state;
    let amount, description, label;
    if (product === "one-for-five") {
      amount = 500;
      description = "Rent an Alligator for $5/day";
      label = "Rent for $5/day";
    } else {
      amount = 900;
      description = "Rent two Alligators for $9/day";
      label = "Rent for $9/day";
    }
    return (
      <div className="App">
        {stripeApiKey === "pk_test_publishable_key" ? (
          <p>Configure your Stripe test mode publishable key.</p>
        ) : (
          <React.Fragment>
            <h1>
              <span aria-label="Gator image" role="img">
                🐊
              </span>
              Credit Card
            </h1>
            <div className="App__body">
              {show && (
                <>
                  {/* <form>
                    <label>
                      Rent one for $5/day
                      <input
                        type="radio"
                        name="product"
                        value="one-for-five"
                        checked={product === "one-for-five"}
                        onChange={this.handleProductChange}
                      />
                    </label>
                    <br />
                    <label>
                      Rent two for $9/day
                      <input
                        type="radio"
                        name="product"
                        value="two-for-nine"
                        checked={product === "two-for-nine"}
                        onChange={this.handleProductChange}
                      />
                    </label>
                  </form> */}
                  <StripeCheckout
                    allowRememberMe={false}
                    amount={amount}
                    billingAddress
                    closed={this.handleClose}
                    description={description}
                    // image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    image="https://alligator.io/images/alligator-logo3.svg"
                    label="Pay with 💳"
                    locale="auto"
                    name="Alligator.io"
                    opened={this.handleOpen}
                    panelLabel="Rent for {{amount}}"
                    // shippingAddress
                    stripeKey={stripeApiKey}
                    token={this.handleToken}
                    zipCode
                  />
                </>
              )}
              <br />
              <br />
              <br />
              <br />
              {/* <p className="text-muted">
                You may use the following for testing:
              </p> */}
              {/* <ul className="text-muted">
                <li>Credit Card Number: 4242 4242 4242 4242</li>
                <li>MM/YY: Any present or future date.</li>
                <li>CVC: Any three digits, e.g., 123.</li>
              </ul> */}
              {/* <p className="text-muted">
                See{" "}
                <a href="https://stripe.com/docs/testing" target="_blank">
                  Stripe Testing
                </a>{" "}
                for more options.
              </p> */}
              {/* <br />
              <br />
              <p className="text-muted">
                After making a change here, it seems that the page sometimes
                needs to be manually refreshed. May be a bug with CodeSandbox.
              </p> */}
            </div>
            <footer className="App__foot">
              {/*
                This button allows the StripeCheckout component to be mounted and unmounted to
                confirm that it behaves as expected.
                */}
              {/* <button className="btn btn-primary" onClick={this.toggleShow}>
                {show ? "Unmount Form" : "Mount Form"}
              </button> */}
            </footer>
          </React.Fragment>
        )}
      </div>
    );
  }
}


export default Cart;