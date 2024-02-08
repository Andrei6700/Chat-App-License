const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const creds = require("./config");
const DecryptionSignUp = require("../src/Encryption-SignUp/Decryption/decryption");
const key = require("../src/Encryption-SignUp/Key/Key");

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
  const { email: encryptedEmail } = req.body;

  //Decriptare din binar invers în cod ASCII
  const reversedBinaryCodesEmail = encryptedEmail.match(/.{1,8}/g);
  const asciiCodesEmail = reversedBinaryCodesEmail.map(code =>
    parseInt(code.split("").reverse().join(""), 2)
  );

  //Decriptare cu  Vigenere
  const decryptedEmail = DecryptionSignUp()(asciiCodesEmail); // decripteaaz emailul

 
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
    from: '"Fred Foo 👻" <foo@example.com>',
    to: decryptedEmail, // Trimite emailul decriptat
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
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
