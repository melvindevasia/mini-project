console.log("this js is working")
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
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth()
// const database = firebase.database()


// // Set up our register function
// function register () {
//   // Get all our input fields
//   email = document.getElementById('email').value;
//   password = document.getElementById('password').value;
  
//   // Validate input fields
//   if (validate_email(email) == false || validate_password(password) == false) {
//     alert('Email or Password is Outta Line!!')
//     return
//     // Don't continue running the code
//   }
  
 
//   // Move on with Auth
//   auth.createUserWithEmailAndPassword(email, password)
//   .then(function() {
//     // Declare user variable
//     var user = auth.currentUser

//     // Add this user to Firebase Database
//     var database_ref = database.ref()

//     // Create User data
//     var user_data = {
//       email : email,
      
//       last_login : Date.now()
//     }

//     // Push to Firebase Database
//     database_ref.child('users/' + user.uid).set(user_data)

//     // DOne
//     alert('User Created!!')
//   })
//   .catch(function(error) {
//     // Firebase will use this to alert of its errors
//     var error_code = error.code
//     var error_message = error.message

//     alert(error_message)
//   })
// }


// // Set up our login function
// function login () {
//   // Get all our input fields
//   email = document.getElementById('email').value
//   password = document.getElementById('password').value

//   // Validate input fields
//   if (validate_email(email) == false || validate_password(password) == false) {
//     alert('Email or Password is Outta Line!!')
//     return
//     // Don't continue running the code
//   }

//   auth.signInWithEmailAndPassword(email, password)
//   .then(function() {
//     // Declare user variable
//     var user = auth.currentUser

//     // Add this user to Firebase Database
//     var database_ref = database.ref()

//     // Create User data
//     var user_data = {
//        password : password,
//       last_login : Date.now()
//     }

//     // Push to Firebase Database
//     database_ref.child('users/' + user.uid).update(user_data)

//     // DOne
//     alert('User Logged In!!')

//   })
//   .catch(function(error) {
//     // Firebase will use this to alert of its errors
//     var error_code = error.code
//     var error_message = error.message

//     alert(error_message)
//   })
// }




// // Validate Functions
// function validate_email(email) {
//   expression = /^[^@]+@\w+(\.\w+)+\w$/
//   if (expression.test(email) == true) {
//     // Email is good
//     return true
//   } else {
//     // Email is not good
//     return false
//   }
// }

// function validate_password(password) {
//   // Firebase only accepts lengths greater than 6
//   if (password < 6) {
//     return false
//   } else {
//     return true
//   }
// }

// function validate_field(field) {
//   if (field == null) {
//     return false
//   }

//   if (field.length <= 0) {
//     return false
//   } else {
//     return true
//   }
// }


// // Import the required Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   // Paste your Firebase configuration object here
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);

// Authenticate the admin user
// const adminEmail = "admin@gmail.com"; // Replace with your admin email
// const adminPassword = "admin"; // Replace with your admin password

// signInWithEmailAndPassword(auth, adminEmail, adminPassword)
//   .then((userCredential) => {
//     // Admin user is authenticated
//     const user = userCredential.user;
//     console.log("Admin user logged in:", user.email);

//     // You can now access Cloud Firestore as the admin user
//     // ...
//   })
//   .catch((error) => {
//     console.error("Error logging in admin user:", error);
//   });







