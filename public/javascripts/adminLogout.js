// adminLogout.js

document.addEventListener("DOMContentLoaded", function() {
  // Get the logout button
  var logoutButton = document.getElementById("signout");

  // Add click event listener to the logout button
  logoutButton.addEventListener("click", function() {
      // Sign out the user (assuming you're using Firebase Authentication)
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          // Redirect to adminLogin.html
          window.location.href = "./adminLogin.html";
      }).catch(function(error) {
          // An error happened.
          console.error("Error signing out:", error);
      });
  });
});

