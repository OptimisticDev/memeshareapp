# MemeVerse is a Meme and Photo sharing webapp
___
## Front-End - React, Context API & materializecss
## Back-End - Node.js, Express.js & MongoDB

---
## Video Link ---
https://www.youtube-nocookie.com/embed/dMZgzxwGy28?start=3
---
___
## Steps to run in development mode:-
* Clone the repo
* Make sure you have yarn Node.js & MongoDB installed in your system.
* Make environment file with the follwoing key's value
  
  ```bash
  MONGO_URI = "path of mongodb url"
  JWT_SECRET = "your secret"
  ```
* In root folder run
  ```bash
  npm install
  ```
* Go to client folder
  ```bash
  npm install
  ``` 
* Go to root folder
  * Run server
    ```bash 
    npm start
       or
    npm run server
    ```
  * Run front-end 
     ```bash
     npm run client
  * Run front-end and backend concurrently
     ```bash
     npm run dev
     ```
## Functionality
  * Signin, Signup and Signout user
  * Forget & Reset password through sending email
  * Signin user can upload image/meme with title and body (title & body not mandatory)
  * After attach the photo user should click the upload button to upload photo after that user can share the photo/post 
  * Signin user can show other user post in the hub (home page) and like unlike and comments the photo/post
  * Signin user can see his/her shared photo and total number of post
