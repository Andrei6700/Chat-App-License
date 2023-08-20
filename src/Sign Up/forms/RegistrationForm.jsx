import React from "react";
import InputField from "../Components/InputField";
import AvatarUpload from "../Components/AvatarUpload";
import ActionButton from "../Components/ActionButton";
import { Link } from "react-router-dom";
import '../styles/styles.css'

const RegistrationForm = ({ handleSubmit, loading, err }) => {
    const handleEnterKeyPress = () => {
    handleSubmit();
  };
  return (
    <div className="main">
    <div className="container">
      <div className="content">
        <div className="container-descriere">
        <h2 className="title">Sign Up to Cocs Company</h2>
            <p>
              We sell coke all over the country, I don't have any for sale, I
              really don't know what to write here, no kidding '.
            </p>
        </div>
        <div className="form">
            <form onSubmit={handleSubmit} id="form">
            <div className="border">
            <h2 className="title">Sign Up</h2>
  
            <div className="form-group form-input">
              <InputField type="text"    />
              <label for="name" className="form-label">Your name</label>
            </div>
  
            <div className="form-group form-input">
              <InputField type="email"  />
              <label for="name" className="form-label">Your email</label>
            </div>
  
            <div className="form-group form-input">
              <InputField type="password"  />
              <label for="name" className="form-label">Your password</label>
            </div>
            <AvatarUpload />
  
            <div className="form-submit">
              <ActionButton className="submit" disabled={loading} text="Sign up" onEnterKeyPress={handleEnterKeyPress} />               
              <p className="vertify-booking">
                You do have an account? <Link to="/login">Login</Link>
              </p>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}
export default RegistrationForm;
