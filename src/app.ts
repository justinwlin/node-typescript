import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  apiKey,
  partysize,
  reservationDate,
  baseUrl,
  venueId,
  authtoken,
  reservationTimes,
} from "./resyConfig";
import {
  findReservations,
  getReservationDetails,
  bookReservation,
} from "./resyUtil";

const app = express();
const PORT = 3003;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Heylo");
});

app.get("/getOpenSlots", async (req, res) => {
  console.log("Getting open slots");
  // =====================================
  // Find the avaliable reservations for a restaurant
  // at a certain date & time & type
  // =====================================
  let reservations;
  reservations = await findReservations({
    baseUrl,
    day: reservationDate,
    party_size: partysize,
    venue_id: `${venueId}`,
    apiKey,
    reservationTimes,
  });

  // Handle errors / if no reservations are available
  if ("error" in reservations) {
    res.send("Error retrieving reservations available");
    return;
  }
  if (reservations.length === 0) {
    console.log("No reservations available");
    res.send("No reservations available");
    return;
  }
  if (reservations.length > 0) {
    console.log("There is reservations available");
    console.log(reservations);
  }
  // ========================
  // There are reservations > Now check if it matches wanted times
  // ========================
  if (reservations.length > 0) {
    for (let reservationOpenTime of reservations) {
      const reservationDetails = await getReservationDetails({
        config_id: reservationOpenTime.config.token,
        party_size: partysize,
        apiKey,
        baseUrl,
        day: reservationDate,
      });
      if (reservationDetails === undefined) {
        res.send("Error getting reservation details");
        return;
      }
      try {
        console.log("Shooting for the reservation...");
        console.log(reservationOpenTime);
        console.log(reservationDetails);
        console.log("-------------------------------------");
        // res.send("FAKE SUCCESS");
        // const bookedResponse = await bookReservation({
        //   authToken: authtoken,
        //   bookToken: reservationDetails.value,
        //   apiKey,
        //   baseUrl,
        // });
        console.log("SUCCESS!");
        res.send("SUCCESS MOCK!");
        // res.send(bookedResponse);
        return;
      } catch {
        console.log("Error booking reservation, trying next one");
      }
    }
    res.send("Failed to book any reservation");
    return;
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening to ${PORT}`);
});
