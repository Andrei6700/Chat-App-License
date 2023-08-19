import React from "react";
import InputField from "../Components/InputField";
import AvatarUpload from "../Components/AvatarUpload";
import ActionButton from "../Components/ActionButton";
import { Link } from "react-router-dom";
import '../styles/styles.css'

const RegistrationForm = ({ handleSubmit, loading, err }) => {
  return (
    <div className="sidebar-show">
      <div className="container container-fixed-xl container-modal">
        {/* <a className="d-inline-block" href="/"> */}
        <svg className="container-modal-close icon-color-gray-600 icon icon-size-32">
          <use href="/images/icons/delete.svg#icon-delete"></use>
        </svg>
        {/* </a> */}

        <div className="row">
          <div className="col-12 col-md-5 mb-2 mb-md-0">
            <div className="mb-2 mb-md-4">
              {/* <a className="d-inline-block" href="/"> */}

              <svg className="lb-logo">
                <use href="/images/land-book-logo-2.svg#lb-logo"></use>
              </svg>
              {/* </a> */}
            </div>
            <h2 className="mb-1">Log in to Cocs Company</h2>
            <p>
              We sell coke all over the country, I don't have any for sale, I
              really don't know what to write here, no kidding '.
            </p>
          </div>
          <div className="col-12 col-md-6 offset-md-1">
            <div className="border bg-white rounded-3 mb-3 p-4 shadow-sm">
              <form onSubmit={handleSubmit}>
                <InputField type="text" placeholder="display name" />
                <InputField type="email" placeholder="email" />
                <InputField type="password" placeholder="password" />
                <AvatarUpload />
                <ActionButton disabled={loading} text="Sign up" />
                {loading &&
                  "Uploading and compressing the image please wait..."}
                {err && <span>Something went wrong</span>}
              </form>
              <p>
                You do have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="website-backdrop"></div>
    </div>
  );
};

export default RegistrationForm;
