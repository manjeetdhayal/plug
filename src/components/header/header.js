import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PoweroffOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const { Header } = Layout;

const SideMountedHeader = (props) => {
  let navigate = useNavigate();

  //function to handle sign out
  function handleSignOut() {
    const auth = getAuth();
    auth.signOut();
    navigate(`/`);
  }

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div
        style={{
          position: "fixed",
          zIndex: "100",
          right: "20px",
          top: "-2px",
        }}
      >
        <PoweroffOutlined
          style={{ color: "rgb(255 255 255 / 65%)" }}
          onClick={handleSignOut}
        />
        <span
          style={{
            color: "rgb(255 255 255 / 65%)",
            margin: "0 10px",
          }}
        >
          {props.user.username}
        </span>
        <img
          src={props.user.photoURL}
          width="40px"
          alt={props.user.username}
          style={{
            borderRadius: "50%",
          }}
        />
      </div>

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="2">
          <Link to={props.userType ? `/${props.userType}` : "/user"}>
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/userprofiles">Users</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default SideMountedHeader;
