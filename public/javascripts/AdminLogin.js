// Import the required Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// Get references to the form and input fields
const form = document.querySelector('form');
const emailInput = form.querySelector('input[name="email"]');
const passwordInput = form.querySelector('input[name="password"]');
const errorMessage = document.getElementById('msg');

// Add an event listener to the form's submit event
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting and reloading the page

  // Get the email and password values from the input fields
  const email = emailInput.value;
  const password = passwordInput.value;

  // Check if the provided credentials match the admin credentials
  if (email === "admin@gmail.com" && password === "admin") {
    // Redirect to the admin dashboard
    window.location.href = 'admin.html';
  } else {
    // Display an error message for invalid credentials
    displayErrorMessage("Invalid email or password. Please try again.");
  }
});

// Function to display an error message
function displayErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');

  // Remove the error message after a few seconds
  setTimeout(() => {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
  }, 5000);
}
