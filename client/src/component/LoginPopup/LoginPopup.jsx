import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;

    if (currState === "Login") {
      newUrl += `/api/user/login`;
    } else {
      newUrl += `/api/user/register`;
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setLogin(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   console.log("register");
  // };

  return (
    <div className="login_popup">
      <form
        className="login_popup_constainer"
        onSubmit={handleLogin}
        // onSubmit={currState ? handleLogin : handleRegister}
      >
        <div className="login_popup_title">
          <h2>{currState}</h2>
          <img
            onClick={() => {
              setLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login_popup_input">
          {currState === "Login" ? (
            ""
          ) : (
            <input
              type="text"
              onChange={handleChange}
              placeholder="User Name"
              required
              value={data.name}
              name="name"
            />
          )}
          <input
            type="email"
            onChange={handleChange}
            placeholder="User Email"
            required
            value={data.email}
            name="email"
          />
          <input
            type="password"
            onChange={handleChange}
            placeholder="Password"
            required
            value={data.password}
            name="password"
          />
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        <div className="login_popup_condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
