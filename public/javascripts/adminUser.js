import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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
const database = getDatabase(app);

const usersRef = ref(database, 'users');
onValue(usersRef, (snapshot) => {
  const userData = snapshot.val();
  const userTable = document.querySelector('.UserData');
  userTable.innerHTML = ''; // Clear the table before populating it

  if (userData) {
    Object.entries(userData).forEach(([userId, user]) => {
      const row = document.createElement('tr');

      // Create table cells for each user property
      const userIdCell = document.createElement('td');
      userIdCell.textContent = userId;
      userIdCell.className = 'column1';
      row.appendChild(userIdCell);

      const firstNameCell = document.createElement('td');
      firstNameCell.textContent = user.name.split(' ')[0];
      firstNameCell.className = 'column2';
      row.appendChild(firstNameCell);

      const lastNameCell = document.createElement('td');
      lastNameCell.textContent = user.name.split(' ')[1] || '';
      lastNameCell.className = 'column3';
      row.appendChild(lastNameCell);

      const mobileCell = document.createElement('td');
      mobileCell.textContent = user.number;
      mobileCell.className = 'column4';
      row.appendChild(mobileCell);

      const emailCell = document.createElement('td');
      emailCell.textContent = user.email;
      emailCell.className = 'column5';
      row.appendChild(emailCell);

      // const reservationsCell = document.createElement('td');
      // reservationsCell.textContent = '0'; // Replace with actual reservation count
      // reservationsCell.className = 'column6';
      // row.appendChild(reservationsCell);

      // const feedbacksCell = document.createElement('td');
      // feedbacksCell.textContent = '0'; // Replace with actual feedback count
      // feedbacksCell.className = 'column7';
      // row.appendChild(feedbacksCell);

      const deleteCell = document.createElement('td');
      deleteCell.innerHTML = '<i class="fi fi-rs-trash"></i>';
      deleteCell.className = 'column8';
      row.appendChild(deleteCell);

      userTable.appendChild(row);
    });
  }
});