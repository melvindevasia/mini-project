window.onload = function() {
    const passengerFormsContainer = document.getElementById('passenger-forms');
    const numSelectedSeats = parseInt(localStorage.getItem('numSelectedSeats'));
  
    // Function to generate passenger form fields
    function createPassengerForm() {
      // ... (existing code to create passenger form fields)
    }
  
    // Generate passenger form fields based on the number of selected seats
    for (let i = 0; i < numSelectedSeats; i++) {
      const passengerForm = createPassengerForm();
      passengerFormsContainer.appendChild(passengerForm);
    }
  
    // Add event listener to the form submission
    const ticketForm = document.getElementById('ticket-form');
    ticketForm.addEventListener('submit', function(event) {
      const passengerForms = document.querySelectorAll('.passenger-form');
      const numFilledForms = Array.from(passengerForms).filter(form => {
        const inputs = form.querySelectorAll('input');
        const select = form.querySelector('select');
        return Array.from(inputs).every(input => input.value.trim() !== '') && select.value !== '';
      }).length;
  
      if (numFilledForms > numSelectedSeats) {
        event.preventDefault(); // Prevent form submission
        alert('You cannot fill more passenger details than the selected number of seats.');
      } else {
        // Proceed with form submission or other actions
        // ...
        document.getElementById("ticket-form").addEventListener("submit", function(event) {
            event.preventDefault();
        
            // Gather user input
            var name = document.getElementById("name").value;
            var seat = document.getElementById("seat").value;
            var gender = document.getElementById("gender").value;
            var from = document.getElementById("from").value;
            var to = document.getElementById("to").value;
        
            // Generate ticket ID (simple demonstration)
            var ticketId = "T" + Math.floor(Math.random() * 10000);
        
            // Add ticket details to history table
            var tableBody = document.getElementById("history-table-body");
            var newRow = tableBody.insertRow();
            newRow.innerHTML = "<td>" + ticketId + "</td><td>" + name + "</td><td>" + seat + "</td><td>" + gender + "</td><td>" + from + "</td><td>" + to + "</td><td>Booked</td><td><button class='delete-btn' data-ticket-id='" + ticketId + "'>Delete</button></td>";
        
            // Display alert for successful booking and generated ticket ID
            alert("Ticket with ID " + ticketId + " has been booked successfully.");
            document.getElementById("ticket-form").reset();
        });
        
        document.getElementById("view-history-btn").addEventListener("click", function() {
            document.getElementById("ticket-history").style.display = "block";
        });
        
        document.getElementById("ticket-history").addEventListener("click", function(event) {
            if (event.target.classList.contains('delete-btn')) {
                var ticketIdToDelete = event.target.getAttribute('data-ticket-id');
                // Delete ticket logic (for demonstration, we'll remove the row from table)
                event.target.closest('tr').remove();
                alert("Ticket with ID " + ticketIdToDelete + " has been deleted.");
            }
        });
      }
    });
  
    // ... (existing code for other functionalities)
  };

// script.js
document.getElementById("ticket-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Gather user input
  var name = document.getElementById("name").value;
  var seat = document.getElementById("seat").value;
  var gender = document.getElementById("gender").value;
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;

  // Generate ticket ID (simple demonstration)
  var ticketId = "T" + Math.floor(Math.random() * 10000);

  // Add ticket details to history table
  var tableBody = document.getElementById("history-table-body");
  var newRow = tableBody.insertRow();
  newRow.innerHTML = "<td>" + ticketId + "</td><td>" + name + "</td><td>" + seat + "</td><td>" + gender + "</td><td>" + from + "</td><td>" + to + "</td><td>Booked</td><td><button class='delete-btn' data-ticket-id='" + ticketId + "'>Delete</button></td>";

  // Display alert for successful booking and generated ticket ID
  alert("Ticket with ID " + ticketId + " has been booked successfully.");
  document.getElementById("ticket-form").reset();
});

document.getElementById("view-history-btn").addEventListener("click", function() {
  document.getElementById("ticket-history").style.display = "block";
});

document.getElementById("ticket-history").addEventListener("click", function(event) {
  if (event.target.classList.contains('delete-btn')) {
      var ticketIdToDelete = event.target.getAttribute('data-ticket-id');
      // Delete ticket logic (for demonstration, we'll remove the row from table)
      event.target.closest('tr').remove();
      alert("Ticket with ID " + ticketIdToDelete + " has been deleted.");
    }
});