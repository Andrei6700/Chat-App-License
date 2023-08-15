import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from "firebase/auth";
import { db, storage } from "../../../firebase";
import { auth } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const OnSubmit = async (data, navigate) => {
  const { name, email, password, avatarFile } = data;

  try {
    console.log('Starting');

    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    console.log('SignInMethods:', signInMethods);

    if (signInMethods.length > 0) {
      console.log('Adresa de email este deja în uz.');
      throw new Error('Adresa de email este deja în uz.');
    }
    
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const date = new Date().getTime();
    const storageRef = ref(storage, `${name + date}`);

    const uploadTask = uploadBytesResumable(storageRef, avatarFile);

    const snapshot = await uploadTask;

    const downloadURL = await getDownloadURL(snapshot.ref);

    await updateProfile(res.user, {
      displayName: name,
      photoURL: downloadURL,
    });

    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      displayName: name,
      email,
      photoURL: downloadURL,
    });

    await setDoc(doc(db, "userChats", res.user.uid), {});

    console.log("User created successfully.");
    navigate("/test"); 
    console.log("Navigating to /test")
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("An error occurred while creating the user.");
  }
};
