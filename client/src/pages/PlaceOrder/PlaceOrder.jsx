import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalcartAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalcartAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { sesson_url } = response.data;
      console.log(sesson_url);
      window.location.replace(sesson_url);
    } else {
      console.log(response);
      alert("error");
    }
  };

  return (
    <form className="placeorder" onSubmit={placeOrder}>
      <div className="place_order_left">
        <p className="title">Delivery Info</p>
        <div className="multi_fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          onChange={handleChange}
          value={data.street}
          required
        />
        <div className="multi_fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={handleChange}
            value={data.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={handleChange}
            value={data.state}
            required
          />
        </div>
        <div className="multi_fields">
          <input
            type="text"
            placeholder="Zip code"
            name="zipcode"
            onChange={handleChange}
            value={data.zipcode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={handleChange}
            value={data.country}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={handleChange}
          value={data.phone}
          required
        />
      </div>
      <div className="place_order_right">
        <div className="cart_total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart_total_details">
              <p>Subtotal</p>
              <p>${getTotalcartAmount()}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <p>Delivery Fee</p>
              <p>${getTotalcartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <b>Total </b>
              <p>
                ${getTotalcartAmount() === 0 ? 0 : getTotalcartAmount() + 2}
              </p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
