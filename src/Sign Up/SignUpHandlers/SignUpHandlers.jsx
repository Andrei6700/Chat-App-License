<<<<<<< HEAD
import axios from "axios";

export const OnSubmit = (data) => {
  axios
    .post("/api/sendEmail", data)
    .then((response) => {
      console.log(response.data);
      alert("Email sent successfully!");
    })
    .catch((error) => {
      console.log(error);
      alert("Error sending email");
    });
};
=======
import axios from 'axios';

export const OnSubmit = (data) => {
  console.log(data)
  axios.post('http://localhost:3002/send', data)
    .then(response => {
      console.log(response.data);
      alert('Email sent successfully!');
    })
    .catch(error => {
      console.log(error);
      alert('An error occurred while sending the email.');
    });
};
export const OnChange = (e) => {
    e.preventDefault();
    const formData = {
        displayName: e.target.displayName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        }
        console.log(formData);
        OnSubmit(formData);
        };
>>>>>>> a4271641edaec1e1bc0388f3a92227d1771fe8f3
