![Alt text](src/img/logo2-removebg-preview.png)

## Chat-App (No official name yet)

**Client:** React, JS, CSS

**Server:** Node, Express, Nodemailer


## Description
This is a project that represents my undergraduate thesis!
This project is a similar copy of WhatsApp.

Is not done yet.

## Demo

Using this link : https://chat-app-license.vercel.app/ you can see a demo of this project, thanks to Vercel !


## Run Locally

Clone the project

```bash
  git clone https://github.com/Andrei6700/Chat-App-License
```

Go to the project directory

```bash
  cd Chat-App-License
```

Install dependencies

```bash
  npm install
```

Start the project
```bash
  npm start
```

Go to the server directory

```bash
  cd backend
```
Start the server
```bash
  nodemon serverMailSender.js
```

For the server I used **XAMPP** where I started ``MySQL`` and ``Apache``
## Usage

 
In order to adapt this project to the configuration you have in your firebase, you need to add it to the :  `src\firebase\firebase.js`
```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
// Your web app's Firebase configuration
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);

```
 And to be able to send mails you have to replace in this path:`backend\config.js` with your mail and password, or you can use https://ethereal.email/ for test

```javascript
module.exports = {
  USER: '', // email
  PASS: ''  // password
};
```
### Reminder 
Make sure that **YOU** after ``editing config.js`` put it in ``.gitignore``

## Optimizations

Optimizations, hmmm. 
I assure you that if you have over a nvidia gtx 1650 goes, give and much RAM :))) that eats a lot 


## Features
✅ Light/dark mode toggle at:

   - ✅ sign up page (not 100%)
   - ❌ log in page
   - ✅ chat page


✅Communication between 2 people

✅Adding a person and searching for him/her

✅using a YUP scheme to validate sign up pages

❌ Video call using Firebase + WebRTC

⛔ voicemail, oh hell nah, I don't think so

✅ send mail to the user who made an account 

## Bugs
Off too many 😥

❌ responsive problems when the screen is small:

- all sizes below this (min-width: 576px) and (max-width: 767.98px) will contain page : ``blanlPage.jsx``  does not allow interaction with the chat

- sizes below (min-width: 992px) and (max-width: 1199.98px) will increase the input corruption of the chat page leaving an empty space

- users testing the chat page on their phone will not be able to interact with the input

- images submitted are placed on the center or made as "full page"

❌ the user who chooses to put a video instead of an avatar image will only see it

❌ the first message containing the date of all messages sent that day is too close to the chatInfo div

❌ and more :((


## Feedback & Support

If you have feedback or need assistance, you can contact me at andreibalanoiu67@gmail.com or visit Links.


## Lessons Learned

What I have learned throughout the course of doing this project for my thesis is that I will not, I don't think I will, be a programmer. I enjoyed working on this project, I still do, but that vibe, but I see too many errors, my motivation has dropped extremely, extremely low, I'm facing problems that are easily done for others (now I know, but ANYONE has compared or compares themselves to others), that I've spent a month or more on.

When I try to do something it gives me error, I also browse sometimes at ChatGPT which also put me in depression but at the same time it takes me out of that state a bit but puts me in another one, as mno it's my degree work and it's considered that I only worked on it, whatever.

I was able to learn new stuff, I really recommend anyone to try to do such a project as mno you run into a lot of problems. Mostly I liked working on the frontend, now I'm kinda sorry I didn't take so much time to make it better and responsive for all devices.
I'm glad that server attempt with XAMPP works, I tried to make an account on heroku to put the backend but I failed in creating the account.

If you put me to do this project would I still do it? The answer would be yes and no, but if it's to do it without being able to get inspiration from somewhere I wouldn't be able to do it, that's why I'm left with the thought that I'm not meant to be a programmer, I'm parallel to this field, honestly I'm wondering how I'm an Info student.


## Contributing

Contributions are always welcome!


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=red)](https://www.linkedin.com/in/andreibalanoiu/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/AndreiBalanoiu/)

[![GitGub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
)](https://github.com/Andrei6700/)

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
)](mailto:andreibalanoiu67@gmail.com)