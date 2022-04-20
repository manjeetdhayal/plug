import React from "react";
import { getDatabase, ref, onValue, runTransaction } from "firebase/database";
import { getAuth } from "firebase/auth";

import { DislikeOutlined } from "@ant-design/icons";

const db = getDatabase();

const DisLikeButton = (props) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const { uid } = user;

  //function to check whether user liked the profile or not

  let dislikeStatus = false;
  const dislikeStatusRef = ref(db, `users/${props.profileUid}/dislikes/${uid}`);
  onValue(dislikeStatusRef, (snapshot) => {
    dislikeStatus = snapshot.val();

    if (dislikeStatus === null) dislikeStatus = false;
  });

  function handleClick() {
    const postRef = ref(db, `users/${props.profileUid}`);

    //running a transaction to check if user has alreday liked, disliked or not if no increments the value
    //also check so that the same user can not make both like and dislikes
    runTransaction(postRef, (post) => {
      if (post) {
        if (post.dislikes && post.dislikes[uid]) {
          post.dislike--;
          post.dislikes[uid] = null;
        } else {
          if (post.dislike === undefined) post.dislike = 0;
          post.dislike++;
          if (!post.dislikes) {
            post.dislikes = {};
          }
          post.dislikes[uid] = true;
          //if the user has liked the profile we will remove the like
          if (post.likes && post.likes[uid]) {
            post.like--;
            post.likes[uid] = null;
          }
        }
      }
      return post;
    });
  }
  return (
    <span>
      <DislikeOutlined
        style={
          dislikeStatus ? { color: "#ea0c0c9c" } : { color: "currentColor" }
        }
        key={props.profileUid}
        onClick={handleClick}
      />
      {props.dislike !== 0 && <span>{props.dislike}</span>}
    </span>
  );
};

export default DisLikeButton;
