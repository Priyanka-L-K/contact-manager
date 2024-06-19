import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Router> {/* Wrap your entire app with Router */}
      <div className="ui container">
        <Header />
        <AddContact contacts={contacts} addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} />
      </div>
    </Router>
  );
}

export default App;
