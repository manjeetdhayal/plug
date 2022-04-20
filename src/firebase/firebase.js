import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getDatabase, ref, set, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBa1AI_txliQMjDG2GXWIx9S8aOjj1hL1I",
  authDomain: "plugapp-4688b.firebaseapp.com",
  projectId: "plugapp-4688b",
  storageBucket: "plugapp-4688b.appspot.com",
  messagingSenderId: "1026737621759",
  appId: "1:1026737621759:web:524ba8a7ac91e5b5a51aca",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

const AnonymousSignIn = () => {
  auth.signInAnonymously();
};

//firebase realtime database
const db = getDatabase();
const dbRef = ref(getDatabase());

//generating user document

async function generateUserDocument(user) {
  if (!user) return;

  get(child(dbRef, `users/${user.uid}`))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        const { email, displayName, photoURL } = user;

        if (email !== undefined) {
          set(ref(db, "users/" + user.uid), {
            uid: user.uid,
            username: displayName,
            email: email,
            photoURL: photoURL,
            status: "Hey there I am using PlugApp",
          })
            .then(() => {
              alert("data stored successfully");
            })
            .catch((err) => {
              alert(err);
            });
        }
      }
    })
    .catch((err) => {
      alert(err);
    });

  return getUserDocument(user.uid);
}

//getting the user data if already exists
async function getUserDocument(uid) {
  if (!uid) return null;

  try {
    const userDocument = await get(child(dbRef, `users/${uid}`));
    return {
      uid: uid,
      ...userDocument.val(),
    };
  } catch (err) {
    console.log("Error in getUserDocumnet() function");
  }
}

export {
  auth,
  signInWithGoogle,
  generateUserDocument,
  AnonymousSignIn,
  getUserDocument,
  provider,
};
