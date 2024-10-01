const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Ticket schema
const TicketSchema = new Schema({
  seat_no: {
    type: String,
    required: true,
  },
  boarding_point: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Define the main schema including the tickets array
const ticketSchema = new Schema({
  tickets: [TicketSchema], // Embed the TicketSchema as part of the array
  price: {
    type: Number,
    required: true,
  },
  bus_id: {
    type: Schema.Types.ObjectId,
    ref: "Bus", // Assuming your bus model is named 'Bus'
    required: true,
  },
});

// Compile the model
const Ticket = mongoose.model("Ticket", ticketSchema);

function createTicket(routeData, totalPrice, busId) {
  return new Promise(async (resolve, reject) => {
    const tickets = routeData.map((ticket) => ({
      seat_no: ticket.seat_no,
      boarding_point: ticket.boarding_point,
      destination: ticket.destination,
      price: ticket.price,
    }));

    // Create a new instance of Ticket
    const newTicket = new Ticket({
      tickets,
      price: totalPrice,
      bus_id: busId,
    });

    // Save the new ticket to the database
    const savedTicket = await newTicket.save();
    const leanTicket = savedTicket.toObject({ getters: false, virtuals: false });
    resolve(leanTicket);
  });
}

module.exports = {
  createTicket,
};
