import React from "react";
import "./signin.css";
import bgImage from "../../assets/bg.jpg";
import { Form, Button } from "antd";
import { auth, provider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const svgIconStyle = {
  width: "12px",
  height: "12px",
  marginRight: "10px",
};

const GoogleButton = (
  <svg
    style={svgIconStyle}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
  >
    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
  </svg>
);

const AnonymousButton = (
  <svg
    style={svgIconStyle}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
  >
    <path d="M274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM577.9 223.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L544 190.1l-47.03-47.03c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L544 257.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L577.9 223.1z" />
  </svg>
);

let userProfileData;

const SignIn = () => {
  const navigate = useNavigate();

  //function to handle sing in with google and directs to /user on successfull sign up
  function handleSignInWithGoogle() {
    auth.signInWithPopup(provider).then(() => {
      navigate("/user");
    });
  }
  //function to handle anonymous sign in, on successfyll directs to /anonymous user
  function handleAnonymousSignIn() {
    auth.signInAnonymously().then(() => {
      navigate("/anonymousUser");
    });
  }
  return (
    <div
      className="sign-in-container"
      style={{
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fill: "rgb(53 46 47)",
      }}
    >
      <Form name="basic" className="sing-in-form">
        <h2 className="login-heading">
          <span
            style={{
              borderBottom: "2px solid #753f922e",
              paddingBottom: "2px",
            }}
          >
            Login
          </span>
        </h2>
        <Button
          type="primary"
          style={{ fontWeight: "bold", color: "#352e2f" }}
          onClick={handleSignInWithGoogle}
        >
          {GoogleButton} Sign in with Google
        </Button>

        <Button
          type="primary"
          style={{ fontWeight: "bold", color: "#352e2f" }}
          onClick={handleAnonymousSignIn}
        >
          {AnonymousButton} Anonymous User
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
