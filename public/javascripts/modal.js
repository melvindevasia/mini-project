// Create the modal structure
const modal = document.createElement("div");
modal.id = "addBusModal";
modal.classList.add("popup");
modal.innerHTML = `
  <div class="modal-content" style="background-color: #fefefe; margin: 5% auto; padding: 20px 40px; border: 1px solid #888; width: 80%; max-width: 600px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); border-radius: 8px;">
    <span class="close" style="color: #aaa; float: right; font-size: 28px; font-weight: bold;">&times;</span>
    <h2 style="text-align: center; margin-bottom: 20px;">Add Bus</h2>
    <form id="addBusForm">
      <div class="form-group" style="margin-bottom: 15px;">
        <label for="busRegNo" style="display: block; font-weight: bold; margin-bottom: 5px;">Bus Registration Number:</label>
        <input type="text" id="busRegNo" name="busRegNo" required style="width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
      </div>
      <div class="form-group" style="margin-bottom: 15px;">
        <label for="busId" style="display: block; font-weight: bold; margin-bottom: 5px;">Bus ID:</label>
        <input type="text" id="busId" name="busId" required style="width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
      </div>
      <div class="form-group" style="margin-bottom: 15px;">
        <label for="busName" style="display: block; font-weight: bold; margin-bottom: 5px;">Bus Name:</label>
        <input type="text" id="busName" name="busName" required style="width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
      </div>
      <div class="form-group" style="margin-bottom: 15px;">
        <label for="busType" style="display: block; font-weight: bold; margin-bottom: 5px;">Bus Type:</label>
        <select id="busType" name="busType" required style="width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
          <option value="AC">AC</option>
          <option value="Non-AC">Non-AC</option>
        </select>
      </div>
      <div class="form-group" style="margin-bottom: 15px;">
        <label for="seat" style="display: block; font-weight: bold; margin-bottom: 5px;">Seats:</label>
        <input type="number" id="seat" name="seat" required style="width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
      </div>
      <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; width: 100%; font-size: 16px;">Add</button>
    </form>
  </div>
`;

// Append the modal to the document body
document.body.appendChild(modal);

// Add the fade-out animation styles
const style = document.createElement("style");
style.innerHTML = `
  .fade-out {
    animation: fadeOut 0.5s forwards;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Get the "Add Bus" button
const addBusBtn = document.getElementById("addBusBtn");

// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// When the user clicks the "Add Bus" button, open the modal
addBusBtn.addEventListener("click", openModal);

// When the user clicks on <span> (x), close the modal
const closeBtn = modal.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Get the form element
const form = document.querySelector("#addBusForm");
let isSubmitting = false; // Track submission status

// Function to handle form submission
function handleForm() {
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (isSubmitting) return; // Prevent multiple submissions
    isSubmitting = true; // Set submitting flag

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/admin/buses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        modal.classList.add('fade-out');
        setTimeout(() => {
          modal.classList.remove('fade-out');
          closeModal();
          window.location.reload(); // Refresh the current page
        }, 500);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle the error if the request fails
    } finally {
      isSubmitting = false; // Reset submitting flag
    }
  });
}

// Initialize form handler
handleForm();
