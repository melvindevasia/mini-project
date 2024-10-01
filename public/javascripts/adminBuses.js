// Initialize Firebase
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to open the add bus popup window
function openAddBusPopup() {
  document.getElementById("addBusModal").style.display = "block";
}

// Function to close the add bus popup window
function closeAddBusPopup() {
  document.getElementById("addBusModal").style.display = "none";
}

// Add event listener to open the add bus popup window
document.getElementById("addBusBtn").addEventListener("click", openAddBusPopup);

// Add event listener to handle form submission for adding bus details
document.getElementById("addBusForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get bus details from the form
  const busName = document.getElementById("busName").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const journeyDay = document.getElementById("journeyDay").value;
  const departure = document.getElementById("departure").value;
  const seat = document.getElementById("seat").value;
  // Get other bus details similarly

  // Send bus details to Firestore database
  db.collection("buses").add({
    busName: busName,
    from: from,
    to: to,
    journeyDay: journeyDay,
    departure: departure,
    seat: seat
    // Add other bus details similarly
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    // Optionally, display a success message to the user
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    // Optionally, display an error message to the user
  });

  // Close the add bus popup window
  closeAddBusPopup();
});

// Function to fetch bus data from Firestore and display it on the dashboard
function fetchAndDisplayBuses() {
  const busList = document.querySelector(".UserData");

  // Clear existing bus data
  busList.innerHTML = "";

  // Fetch bus data from Firestore
  db.collection("buses").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // Create table row for each bus
      const data = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.busName}</td>
        <td>${data.from}</td>
        <td>${data.to}</td>
        <td>${data.journeyDay}</td>
        <td>${data.departure}</td>
        <td>${data.seat}</td>
        <!-- Add other table cells for bus details -->
      `;
      busList.appendChild(tr);
    });
  });
}

// Call fetchAndDisplayBuses function to initially load bus data
fetchAndDisplayBuses();
