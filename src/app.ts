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
  const reservations = await findReservations({
    baseUrl,
    day: reservationDate,
    party_size: partysize,
    venue_id: `${venueId}`,
    apiKey,
  });
  if ("error" in reservations) {
    res.send(reservations);
  } else {
    const reservationDetails = await getReservationDetails({
      config_id: reservations[0].config.token,
      party_size: partysize,
      apiKey,
      baseUrl,
      day: reservationDate,
    });
    if (reservationDetails != null) {
      const bookedResponse = await bookReservation({
        authToken: authtoken,
        bookToken: reservationDetails.value,
        apiKey,
        baseUrl,
      });
      res.send(bookedResponse);
      return;
    }
    res.send(reservationDetails);
    return;
  }
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
