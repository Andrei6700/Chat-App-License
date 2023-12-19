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
