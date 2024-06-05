const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const creds = require("../config/config");

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
  const { email, subject, text, displayName } = req.body;

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
    from: 'noreply@ChatApp.ro', // sender address
    to: email,
    subject: "Welcome to ChatApp!", // Subject line
    // text: "Hello world?", // plain text body
    html: 
    `
    <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <title>Welcome to ChatApp,</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
    </style>

    <link
      href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;500;600&amp;display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat&amp;display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;500;600&amp;display=swap);
      @import url(https://fonts.googleapis.com/css2?family=Montserrat&amp;display=swap);
    </style>
    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        table.mj-full-width-mobile {
          width: 100% !important;
        }

        td.mj-full-width-mobile {
          width: auto !important;
        }
      }
    </style>
    <style type="text/css">
      a,
      span,
      td,
      th {
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
      }
    </style>
  </head>

  <body style="background-color: #171919">
    <div
      style="
        display: none;
        font-size: 1px;
        color: #ffffff;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
      Preview - Welcome to ChatApp,${displayName}
    </div>
    <br>
    <br>
    <div style="background-color: #171919">
      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tbody></tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Montserrat, Helvetica, Arial,
                                sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 24px;
                              text-align: left;
                              color: #dddddd;
                            "
                          >
                            <h1
                              style="
                                margin: 0;
                                font-size: 46px;
                                line-height: 60px;
                                font-weight: 600;
                                font-family: 'Inknut Antiqua', Helvetica, Arial,
                                  sans-serif;
                              "
                            >
                            ChatApp brings your loved ones closer to you.
                            </h1>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Montserrat, Helvetica, Arial,
                                sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 24px;
                              text-align: left;
                              color: #dddddd;
                            "
                          >
                            <p style="margin: 0">
                              Welcome to ChatApp, ${displayName}! Before we get
                              started, please enjoy !
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          vertical-align="middle"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="border-collapse: separate; line-height: 100%"
                          >
                            <tbody></tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Montserrat, Helvetica, Arial,
                                sans-serif;
                              font-size: 16px;
                              font-weight: 400;
                              line-height: 24px;
                              text-align: left;
                              color: #999999;
                            "
                          >
                            <p style="margin: 0">
                              Have questions or need help? Send an e-mail to: 
                              <a
                                href="mailto:andreibalanoiu67@gmail.com"
                                style="
                                  color: #ffffff;
                                  text-decoration: none;
                                  font-weight: bold;
                                "
                              >
                                andreibalanoiu67@gmail.com
                              </a>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="background: #000000; background-color: #000000; width: 100%"
      >
        <tbody>
          <tr>
            <td>
              <div style="margin: 0px auto; max-width: 600px">
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                        "
                      >
                        <div
                          class="mj-column-per-100 mj-outlook-group-fix"
                          style="
                            font-size: 0px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: top;
                            width: 100%;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="vertical-align: top"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  style="
                                    font-size: 0px;
                                    padding: 10px 25px;
                                    word-break: break-word;
                                  "
                                >
                                  <div
                                    style="
                                      font-family: Montserrat, Helvetica, Arial,
                                        sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      line-height: 24px;
                                      text-align: center;
                                      color: #999999;
                                    "
                                  >
                                    <a
                                      class="footer-link"
                                      href="#"
                                      style="
                                        text-decoration: none;
                                        color: #fff;
                                        font-weight: 400;
                                      "
                                      >Support</a
                                    >
                                    &nbsp; | &nbsp;
                                    <a
                                      class="footer-link"
                                      href="#"
                                      style="
                                        text-decoration: none;
                                        color: #fff;
                                        font-weight: 400;
                                      "
                                      >Privacy Policy</a
                                    >
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  align="center"
                                  style="
                                    font-size: 0px;
                                    padding: 10px 25px;
                                    word-break: break-word;
                                  "
                                >
                                  <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="float: none; display: inline-table"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style="padding: 4px">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              border-radius: 3px;
                                              width: 24px;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    font-size: 0;
                                                    height: 24px;
                                                    vertical-align: middle;
                                                    width: 24px;
                                                  "
                                                >
                                                  <a
                                                    href="#"
                                                    target="_blank"
                                                    style="
                                                      color: #ffffff;
                                                      text-decoration: none;
                                                      font-weight: bold;
                                                    "
                                                  >
                                                    <img
                                                      alt="twitter-logo"
                                                      height="24"
                                                      src="https://codedmails.com/images/social/light/twitter-logo-transparent-light.png"
                                                      style="
                                                        border-radius: 3px;
                                                        display: block;
                                                      "
                                                      width="24"
                                                    />
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="float: none; display: inline-table"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style="padding: 4px">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              border-radius: 3px;
                                              width: 24px;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    font-size: 0;
                                                    height: 24px;
                                                    vertical-align: middle;
                                                    width: 24px;
                                                  "
                                                >
                                                  <a
                                                    href="https://www.instagram.com/andrei_balanoiu/"
                                                    target="_blank"
                                                    style="
                                                      color: #ffffff;
                                                      text-decoration: none;
                                                      font-weight: bold;
                                                    "
                                                  >
                                                    <img
                                                      alt="instagram-logo"
                                                      height="24"
                                                      src="https://codedmails.com/images/social/light/instagram-logo-transparent-light.png"
                                                      style="
                                                        border-radius: 3px;
                                                        display: block;
                                                      "
                                                      width="24"
                                                    />
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="float: none; display: inline-table"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style="padding: 4px">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              border-radius: 3px;
                                              width: 24px;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    font-size: 0;
                                                    height: 24px;
                                                    vertical-align: middle;
                                                    width: 24px;
                                                  "
                                                >
                                                  <a
                                                    href="https://github.com/Andrei6700"
                                                    target="_blank"
                                                    style="
                                                      color: #ffffff;
                                                      text-decoration: none;
                                                      font-weight: bold;
                                                    "
                                                  >
                                                    <img
                                                      alt="instagram-logo"
                                                      height="24"
                                                      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                                                      style="
                                                        border-radius: 3px;
                                                        display: block;
                                                        background-color: #807b7b;
                                                      "
                                                      width="24"
                                                    />
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="float: none; display: inline-table"
                                  >
                                    <tbody>
                                      <tr>
                                        <td style="padding: 4px">
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              border-radius: 3px;
                                              width: 24px;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    font-size: 0;
                                                    height: 24px;
                                                    vertical-align: middle;
                                                    width: 24px;
                                                  "
                                                >
                                                  <a
                                                    href="https://www.linkedin.com/in/andreibalanoiu/"
                                                    target="_blank"
                                                    style="
                                                      color: #ffffff;
                                                      text-decoration: none;
                                                      font-weight: bold;
                                                    "
                                                  >
                                                    <img
                                                      alt="dribbble-logo"
                                                      height="24"
                                                      src="https://codedmails.com/images/social/light/linkedin-logo-transparent-light.png"
                                                      style="
                                                        border-radius: 3px;
                                                        display: block;
                                                      "
                                                      width="24"
                                                    />
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="font-size: 0px; word-break: break-word"
                                >
                                  <div style="height: 20px">&nbsp;</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
    `
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