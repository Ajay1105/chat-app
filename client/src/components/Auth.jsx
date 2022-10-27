import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  userName: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [form, setform] = useState(initialState);
  const [isSignup, setisSignup] = useState(true);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setisSignup((prev) => {
      return !prev;
    });
  };

  const handleSubmit =  async(e)=>{
    e.preventDefault();
    const {fullName,userName,password,phoneNumber,avatarURL} = form;
    const URL = 'http://localhost:5000/auth';

    const {data:{token,userId,hashedPassword}} = await axios.post(`${URL}/${isSignup?'signup':'login'}`,
    {userName,password,fullName,phoneNumber,avatarURL});

    cookies.set('token',token);
    cookies.set('username',userName);
    cookies.set('fullName',fullName);
    cookies.set('userId',userId);

    if(isSignup){
      cookies.set('phoneNumber',phoneNumber);
      cookies.set('avatarURL',avatarURL);
      cookies.set('hashedPassword',hashedPassword); 
    }
    window.location.reload(); 
  }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-container">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">UserName</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">ConfirmPassword</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Already have an account ?"
                : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-continer-image">
        <img src={signinImage} alt="Sign in" style={{ maxWidth: "50vh" }} />
      </div>
    </div>
  );
};

export default Auth;
