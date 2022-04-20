import React from "react";
import { getDatabase, ref, onValue, runTransaction } from "firebase/database";

import { LikeOutlined } from "@ant-design/icons";
import { getAuth } from "firebase/auth";

const db = getDatabase();

const LikeButton = (props) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const { uid } = user;

  //to get whether user liked on not
  let likedStatus = false;
  const likedStatusRef = ref(db, `users/${props.profileUid}/likes/${uid}`);
  onValue(likedStatusRef, (snapshot) => {
    likedStatus = snapshot.val();

    if (likedStatus === null) likedStatus = false;
  });

  function handleClick() {
    const postRef = ref(db, `users/${props.profileUid}`);

    //running a transaction to check if user has alreday liked, disliked or not if no increments the value
    //also check so that the same user can not make both like and dislikes
    runTransaction(postRef, (post) => {
      if (post) {
        if (post.likes && post.likes[uid]) {
          post.like--;
          post.likes[uid] = null;
        } else {
          console.log(post.like);
          if (post.like === undefined) post.like = 0;
          post.like++;
          if (!post.likes) {
            post.likes = {};
          }
          post.likes[uid] = true;
          //if the user has disliked the profile we will remove the dislike
          if (post.dislikes && post.dislikes[uid]) {
            post.dislike--;
            post.dislikes[uid] = null;
          }
        }
      }
      return post;
    });
  }
  return (
    <span>
      {/* being called on even a single value of like dislike is changed  */}
      <LikeOutlined
        key={props.profileUid}
        onClick={handleClick}
        style={likedStatus ? { color: "#3fd75dc2" } : { color: "currentColor" }}
      />
      {props.like !== 0 && <span>{props.like}</span>}
    </span>
  );
};

export default LikeButton;
