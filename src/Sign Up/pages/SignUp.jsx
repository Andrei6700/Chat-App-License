import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../forms/RegistrationForm";
import useFormData from "../pages/useFormData"; // Import useFormData hook

const SignUp = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { errors } = useFormData();

  // asynchronous function that takes an event object as a parameter
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Check if there are no errors
    if (Object.keys(errors).length === 0) {
      // Set loading to true
      setLoading(true);
      // Get the values from the all fields
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];

      try {
        // Create a new user with the provided email and password
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // Get the current timestamp
        const date = new Date().getTime();
        // Create a reference to a file in the storage with the name as displayName + date
        const storageRef = ref(storage, `${displayName + date}`);
        // Upload the file to the storage
        await uploadBytesResumable(storageRef, file).then(() => {
          // Get the download URL of the uploaded file
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update the profile of the user with the display name and the download URL of the uploaded file
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              // Set a document in the "users" collection in the database with the id as the user's uid
              // The document contains the user's uid, display name, email, and the download URL of the uploaded file
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              // Set a document in the "userChats" collection in the database with the id as the user's uid
              // The document is initially empty
              await setDoc(doc(db, "userChats", res.user.uid), {});
              // Navigate to the "/chat" route
              navigate("/chat");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    }
  };

  return (
    <RegistrationForm handleSubmit={handleSubmit} loading={loading} err={err} />
  );
};

export default SignUp;
