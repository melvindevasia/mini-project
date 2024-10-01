import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAyMrUy6nc8uhvdj6LoQ60-lYyhqksxgyU",
    authDomain: "journey-sync-73635.firebaseapp.com",
    databaseURL: "https://journey-sync-73635-default-rtdb.firebaseio.com",
    projectId: "journey-sync-73635",
    storageBucket: "journey-sync-73635.appspot.com",
    messagingSenderId: "685877190695",
    appId: "1:685877190695:web:e1b451f89f0fdac1f7ee02",
    measurementId: "G-C0M74LYZ41"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export function register(email, password, name, number) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        name: name,
        email: email,
        number: number,
      })
      .then(() => {
        showSuccessPopup();
      })
      .catch((error) => {
        showErrorPopup(error.message);
      });
    })
    .catch((error) => {
      showErrorPopup(error.message);
    });
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showSuccessPopup();
    })
    .catch((error) => {
      showErrorPopup(error.message);
    });
}

function showSuccessPopup() {
  document.getElementById("success").classList.add("open-success");
}

function showErrorPopup(errorMessage) {
  const errorBox = document.getElementById("error");
  errorBox.querySelector(".message p").textContent = errorMessage;
  errorBox.classList.add("open-error");
}

export function closeError() {
  document.getElementById("error").classList.remove("open-error");
}