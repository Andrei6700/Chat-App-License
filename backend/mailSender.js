const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");
const creds = require("./config");
const bodyParser = require("body-parser");

const app = express();

const transport = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};
const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/send", (req, res) => {
  const { displayName, email } = req.body;
  const content = `name: ${displayName} \n email: ${email}\n `;
  const mail = {
    from: '"Test" <test@gmail.com>',
    to: " test@gmail.com",
    subject: "Data from Form",
    text: `
        Name: ${displayName}
        Email: ${email}
    `,
  };

  transporter.sendMail(mail, (error, data) => {
    if (error) {
      console.error("Error occurred while sending email:", error);
      res.status(500).send("Error occurred while sending email");
    } else {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(data)); //info

      res.send("Email Sent!");
    }
  });
});

app.use(cors());
app.use(express.json());
app.use("/", router);

const port = 3002;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
