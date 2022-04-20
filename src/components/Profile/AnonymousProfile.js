import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import UserDisplayProfile from "../UserDisplayProfile/userDisplayProfile";
import { useDispatch } from "react-redux";
import { setUser } from "../../firebase/userSlice";

const AnonymousUserProfile = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const { uid } = user;

    //getting data for anonymous user, using randomuser API

    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((data) => {
        const randomUserData = data.results;

        //Getting the email, name, photo url for the user
        const photoURL = randomUserData[0].picture.thumbnail;
        const { email } = randomUserData[0].email;
        const { first, last } = randomUserData[0].name;
        const username = `${first} ${last}`;

        const res = {
          username: username,
          photoURL: photoURL,
          email: email,
          uid: uid,
          status: "hey I am using Plug App!!",
          anonymous: true,
        };

        return res;
      })
      .then((res) => {
        setUserData(res);
        dispatch(setUser(res));
        setLoading(true);
      });
  }, []);

  return (
    <>
      <UserDisplayProfile user={userData} lodaing={loading} />
    </>
  );
};

export default AnonymousUserProfile;
