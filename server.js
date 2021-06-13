const express = require("express");
const cors = require("cors");
const _ = require("lodash");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here
app.delete("/:id", function (request, response) {
  let isDeleted = false;
  bookings.forEach((item, index) => {
    if (item.id === parseInt(request.params.id)) {
      bookings.splice(index, 1);
      isDeleted = true;
    }
  });
  if (isDeleted) {
    response.sendStatus(202);
  } else {
    response.status(404).send("please enter valid id");
  }
});

const PORT = process.env.PORT || 5000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
