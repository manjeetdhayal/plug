import "./profile.css";
import { Card, Avatar, Layout } from "antd";
import { Row, Col } from "antd";
import { DislikeOutlined, LikeOutlined, EditOutlined } from "@ant-design/icons";
import SideMountedHeader from "../header/header";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
const { Meta } = Card;
const { Content } = Layout;

const UserDisplayProfile = (props) => {
  const [status, setStatus] = useState("");
  //to edit the status of the User
  function handleEditClick() {
    const oldUserData = props.user;
    const db = getDatabase();
    const { email, uid, username, like, dislike, photoURL } = oldUserData;

    const newStatus = prompt("Enter new Status: ");
    setStatus(newStatus);

    //setting up the new status of the user
    set(ref(db, `users/${uid}`), {
      uid: uid,
      username: username,
      email: email,
      dislike: dislike,
      like: like,
      photoURL: photoURL,
      status: status,
    }).then((res) => {
      alert("Added");
    });
  }

  return (
    <Layout>
      <SideMountedHeader user={props.user} />

      <Content
        style={{ padding: "100px 40px", width: "100%", minHeight: "100vh" }}
      >
        <div className="block featureBlock bgGray">
          <div className="container-fluid">
            <Card
              hoverable
              style={{ width: 300, marginTop: 16 }}
              loading={props.loading}
            >
              <Meta
                avatar={
                  <Avatar
                    src={props.user.photoURL}
                    style={{ width: "75px", height: "75px" }}
                  />
                }
                title={props.user.username}
                description={props.user.status}
              />

              <Row
                className="ant-card-actions"
                style={{ width: "100%", textAlign: "center" }}
              >
                <Col span={8}>
                  <span>
                    <EditOutlined key="edit" onClick={handleEditClick} />
                  </span>
                </Col>
                <Col span={8}>
                  <span>
                    <LikeOutlined key="like" />
                    <span> {props.user.like} </span>
                  </span>
                </Col>
                <Col span={8}>
                  <span>
                    <DislikeOutlined key="dislike" />
                    <span> {props.user.dislike} </span>
                  </span>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default UserDisplayProfile;
