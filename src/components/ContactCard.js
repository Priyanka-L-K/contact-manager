import React from "react";
import userPlaceholder from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email, profileImage } = props.contact;

  return (
    <div className="contact-item">
      <img className="avatar" src={profileImage || userPlaceholder} alt="user" />
      <div className="contact-info">
        <div className="contact-header">{name}</div>
        <div className="contact-email">{email}</div>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => props.clickHandler(id)}  // Corrected prop name here
      ></i>
    </div>
  );
};

export default ContactCard;
