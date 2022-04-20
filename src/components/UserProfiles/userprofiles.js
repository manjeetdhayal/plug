import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Avatar, Layout } from "antd";
import { getAuth } from "firebase/auth";
import { getUserDocument } from "../../firebase/firebase";

import { selectUser } from "../../firebase/userSlice";
import { useSelector } from "react-redux";

// Like, Dislike and edit status button
import LikeButton from "./like";
import DisLikeButton from "./dislike";
import SideMountedHeader from "../header/header";
import { Content } from "antd/lib/layout/layout";

const { Meta } = Card;

const UserProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const userSelected = useSelector(selectUser);

  useEffect(() => {
    const db = getDatabase();

    //getting the reference for all users

    const postListRef = ref(db, "users");

    onValue(postListRef, (snapshot) => {
      let userDataArray = [];
      snapshot.forEach((childSnapshot) => {
        userDataArray.push(childSnapshot.val());
      });

      setProfiles(userDataArray);
    });
  }, []);

  return (
    <Layout>
      <SideMountedHeader
        user={userSelected}
        userType={userSelected.anonymous ? "anonymousUser" : "user"}
      />
      <Content
        style={{ padding: "100px 40px", width: "100%", minHeight: "100vh" }}
      >
        <div className="container-fluid">
          <Row
            gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}
            justify="space-around"
          >
            {profiles.map((childUser) => {
              return (
                <Card
                  key={childUser.uid}
                  hoverable
                  style={{ width: 300, marginTop: 16 }}
                  loading={false}
                >
                  <Meta
                    title={childUser.username}
                    description={childUser.status}
                    avatar={
                      <Avatar
                        src={childUser.photoURL}
                        style={{ width: "75px", height: "75px" }}
                      />
                    }
                  />
                  <Row
                    className="ant-card-actions"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <Col span={8}>
                      {/* <span>
                  <EditOutlined key="edit" uid={childUser.uid} />
                </span> */}
                    </Col>
                    <Col span={8}>
                      <LikeButton
                        like={childUser.like}
                        profileUid={childUser.uid}
                      />
                    </Col>
                    <Col span={8}>
                      <DisLikeButton
                        dislike={childUser.dislike}
                        profileUid={childUser.uid}
                      />
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default UserProfiles;
