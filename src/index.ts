import { createApp } from "vue"
import top from "../src/top.vue"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj3p5-7PohwJ8tGHmLQ9GIskI9hAyf7XI",
  authDomain: "article-93c38.firebaseapp.com",
  projectId: "article-93c38",
  storageBucket: "article-93c38.appspot.com",
  messagingSenderId: "719505331249",
  appId: "1:719505331249:web:74c8ec9f1778910c217110"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(top);
app.mount("#app");