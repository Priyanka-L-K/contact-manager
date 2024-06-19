import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => (
    <Link to={`/contact/${contact.id}`} key={contact.id}>
      <ContactCard contact={contact} clickHandler={deleteContactHandler} /> {/* Correct prop name here */}
    </Link>
  ));

  return <div style={{ marginTop: "10px" }} className="contact-list">{renderContactList}</div>;
};

export default ContactList;
