import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getUserDocument } from "../../firebase/firebase";
import UserDisplayProfile from "../UserDisplayProfile/userDisplayProfile";
import { useDispatch } from "react-redux";
import { setUser } from "../../firebase/userSlice";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(null);
  const [dislike, setDislike] = useState(null);
  const [status, setStatus] = useState("Hey I am using Plug App!!");
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    // console.log(user); //working
    const { displayName, photoURL, uid, email } = user;

    getUserDocument(uid)
      .then((res) => {
        setLike(res.like);
        setDislike(res.dislike);
        setStatus(res.status);
      })
      .then(() => {
        const res = {
          username: displayName,
          photoURL: photoURL,
          email: email,
          uid: uid,
          status: status,
          like: like,
          dislike: dislike,
        };

        return res;
      })
      .then((res) => {
        // console.log(res); //working
        setUserData(res);
        dispatch(setUser(res));
        setLoading(true);
      });

    // console.log(res); working

    // setUserData(res);
  }, []);
  return (
    <>
      <UserDisplayProfile user={userData} loading={loading} />
    </>
  );
};

export default UserProfile;
