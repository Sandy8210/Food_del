import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { NavData } from "../../utills/NavData";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setLogin }) => {
  const [menu, setMenu] = useState(0);

  const { getTotalcartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar_menu">
        {NavData.map((item, index) => (
          <li key={index}>
            {item.display === "home" ? (
              <Link to="/">Home</Link>
            ) : (
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMenu(index);
                  handleScroll(item.id);
                }}
                className={index === menu ? "active" : ""}
              >
                {item.display}
              </a>
            )}
          </li>
        ))}
      </ul>
      <div className="navbar_right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar_search_icon">
          <Link to="cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalcartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar_profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav_profile_dropDowm">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
