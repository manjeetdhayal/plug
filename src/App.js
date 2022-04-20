import React from "react";
import "antd/dist/antd.min.css";
import SignIn from "./components/signin/signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./components/Profile/profile";
import AnonymousUserProfile from "./components/Profile/AnonymousProfile";
import UserProfiles from "./components/UserProfiles/userprofiles";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/user" element={<UserProfile />} />
          <Route
            exact
            path="/anonymousUser"
            element={<AnonymousUserProfile />}
          />

          <Route exact path="/userprofiles" element={<UserProfiles />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
