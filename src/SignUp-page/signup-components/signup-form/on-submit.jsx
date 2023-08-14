// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db, storage } from "./firebase"; 
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";

// export const OnSubmit = async (data) => {
//   const { name, email, password, avatar } = data;
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     const storageRef = ref(storage, `${name}-${new Date().getTime()}`);
//     await uploadBytesResumable(storageRef, avatar).then(() => {
//       getDownloadURL(storageRef).then(async (downloadURL) => {
//         await updateProfile(user, {
//           displayName: name,
//           photoURL: downloadURL,
//         });

//         await setDoc(doc(db, "users", user.uid), {
//           uid: user.uid,
//           displayName: name,
//           email,
//           photoURL: downloadURL,
//         });

//       });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };