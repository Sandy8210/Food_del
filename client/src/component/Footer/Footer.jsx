import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { FooterData, footerTouch } from "../../utills/FooterData";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer_content">
        <div className="footer_content_left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
            molestias quaerat amet corporis possimus aperiam, sapiente repellat.
            Alias repellendus odit at! Dolores eaque voluptas molestiae expedita
            nisi minima similique vitae.
          </p>
          <div className="footer_social_icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer_content_center">
          <h2>COMPANY</h2>
          <ul>
            {FooterData.map((item, index) => (
              <li key={index}>{item.footer_name}</li>
            ))}
          </ul>
        </div>
        <div className="footer_content_right">
          <h2>GET IN TOUCH</h2>
          <ul>
            {footerTouch.map((item, index) => (
              <li key={index}>{item.footer_name}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer_copyright">
        Copyright 2024 &copy; Tomato.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
