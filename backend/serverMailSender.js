const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const creds = require("./config");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);

app.post("/signup", async (req, res) => {
  const { email, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: creds.USER,
      pass: creds.PASS,
    },
  });

  const mailOptions = {
    from: "",
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
