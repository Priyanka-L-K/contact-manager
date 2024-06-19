import React from "react";
import userPlaceholder from '../images/user.png'; // Assuming you have a default user image in the assets folder

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    emailError: "",
    nameExistsError: "",
    emailExistsError:"",
    profileImage: null, // New state for the profile image
    imagePreviewUrl: userPlaceholder // New state for image preview URL, defaulting to user.png
  };

  validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  handleCheckName = (name) => {
    const nameExists = this.props.contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    return nameExists;
  };

  handleCheckEmail = (email) => {
    const emailExists = this.props.contacts.some(
      (contact) => contact.email.toLowerCase() === email.toLowerCase()
    );
    return emailExists;
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          profileImage: file,
          imagePreviewUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fields are mandatory!");
      return;
    }

    if (!this.validateEmail(this.state.email)) {
      this.setState({ emailError: "Please enter a valid email address" });
      return;
    }

    if (this.handleCheckName(this.state.name)) {
      this.setState({ nameExistsError: "This name already exists" });
      return;
    }

    if (this.handleCheckEmail(this.state.email)) {
      this.setState({ emailExistsError: "This email already exists" });
      return;
    }

    const newContact = {
      name: this.state.name,
      email: this.state.email,
      profileImage: this.state.profileImage ? this.state.imagePreviewUrl : userPlaceholder // Use default image if none provided
    };

    this.props.addContactHandler(newContact);
    this.setState({ name: "", email: "", emailError: "", nameExistsError: "", emailExistsError: "", profileImage: null, imagePreviewUrl: userPlaceholder });
  };

  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label htmlFor="profileImage">Profile Photo</label>
            <div className="image-preview-container">
              <img src={this.state.imagePreviewUrl} alt="Profile Preview" className="image-preview" />
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={this.handleImageChange}
              />
            </div>
          </div>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
            <p style={{ color: "red" }}>{this.state.nameExistsError}</p>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <p style={{ color: "red" }}>{this.state.emailError}</p>
            <p style={{ color: "red" }}>{this.state.emailExistsError}</p>
          </div>
          <button className="ui button blue">Add</button>
        </form>
        <style jsx>{`
          .image-preview-container {
            position: relative;
            display: inline-block;
            cursor: pointer;
            border-radius: 50%;
            overflow: hidden;
            width: 100px;
            height: 100px;
            border: 2px solid #ddd;
            margin-bottom: 10px;
          }

          .image-preview {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          #profileImage {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            top: 0;
            left: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default AddContact;
