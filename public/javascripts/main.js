console.log("this js is working");

var firebaseConfig = {
    apiKey: "AIzaSyAyMrUy6nc8uhvdj6LoQ60-lYyhqksxgyU",
    authDomain: "journey-sync-73635.firebaseapp.com",
    databaseURL: "https://journey-sync-73635-default-rtdb.firebaseio.com",
    projectId: "journey-sync-73635",
    storageBucket: "journey-sync-73635.appspot.com",
    messagingSenderId: "685877190695",
    appId: "1:685877190695:web:e1b451f89f0fdac1f7ee02",
    measurementId: "G-C0M74LYZ41"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                email: email,
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            // Done
            alert('User Created!!');
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;
            alert(error_message);
        });
}

// Set up our login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            const user = auth.currentUser;
            const database_ref = database.ref();
            const user_data = {
                password: password,
                last_login: Date.now()
            };

            database_ref.child('users/' + user.uid).update(user_data);
            alert('User Logged In!!');
            moveToPage(); // Call the moveToPage function after successful login
        })
        .catch(function(error) {
            const error_code = error.code;
            const error_message = error.message;
            alert(error_message);
        });
}

// Validate Functions
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field !== null && field.length > 0;
}

function moveToPage() {
    window.location.href = "homepage.html";
}