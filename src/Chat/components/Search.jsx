import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useTheme } from "../../context/dark-mode";

const Search = () => {
  const [username, setUsername] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { theme } = useTheme();

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = async () => {
    setErr(false);

    const caseInsensitiveUsername = removeDiacritics(username).toLowerCase();
    let q = query(
      collection(db, "users"),
      where("displayName", ">=", caseInsensitiveUsername),
      where("displayName", "<=", caseInsensitiveUsername + "\uf8ff")
    );

    const users = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      const filteredUsers = users.filter((user) =>
        removeDiacritics(user.displayName)
          .toLowerCase()
          .includes(caseInsensitiveUsername)
      );

      if (filteredUsers.length === 0) {
        setErr(true);
        setFoundUsers([]);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      } else {
        setFoundUsers(filteredUsers);
      }
    } catch (err) {
      console.error("error 404 :)", err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDoc = await getDoc(chatDocRef);

      dispatch({
        type: "CHANGE_USER",
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });

      if (!chatDoc.exists()) {
        await setDoc(chatDocRef, { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId]: {
            userInfo: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            date: serverTimestamp(),
          },
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      }
    } catch (err) {
      console.error("error", err);
    }

    setFoundUsers([]);
    setUsername("");
  };

  return (
    <div className="search">
      <div className={`searchForm ${theme}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 30 30"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
        <input
          className="inputChatPage"
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User {`${username}`} not found!</span>}

      {foundUsers.length > 0 && (
        <div className="userList">
          {foundUsers.map((user) => (
            <div key={user.uid} className="userChat" onClick={() => handleSelect(user)}>
              <img src={user.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{user.displayName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
