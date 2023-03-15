import axios from "axios";
import {
  apiKey,
  partysize,
  reservationDate,
  baseUrl,
  venueId,
} from "./resyConfig";
import {
  formattedReservationToDateAndTime,
  Reservation,
  bookTokenReservationDetail,
} from "./resyTypes";

export function findReservations(param: {
  baseUrl: string;
  day: string;
  party_size: number;
  venue_id: string;
  apiKey: string;
  reservationTimes: { reservationtime: string; type?: string }[];
}): Promise<
  | formattedReservationToDateAndTime[]
  | {
      error: string;
    }
> {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${param.baseUrl}4/find?lat=40.696235726060294&long=-73.97968099999999&day=${param.day}&party_size=${param.party_size}&venue_id=${param.venue_id}`,
    headers: {
      Authorization: `ResyAPI api_key="${param.apiKey}"`,
    },
  };

  // Convert reservationTimes into a Set of startTime
  const reservationTimes = param.reservationTimes.map((time) => {
    return time.reservationtime;
  });
  const reservationTimesSet = new Set(reservationTimes);

  // const reservationTypes = param.reservationTimes.map((time) => {
  //   return time.type;
  // });
  // const reservationTypesSet = new Set(reservationTypes);
  // reservationTypesSet.delete(undefined);

  return axios(config)
    .then(function (response) {
      // Parse response for just slots
      const availableSlots: Reservation[] =
        response.data.results.venues[0].slots;
      // Parse the available slots for just the date and config
      const availableSlotsFormatted: formattedReservationToDateAndTime[] =
        availableSlots
          .filter((slot) => {
            // Check if the startTime is in the reservationTimesSet
            return reservationTimesSet.has(slot.date.start.split(" ")[1]);
          })
          .map((slot) => {
            return {
              config: slot.config,
              startdate: slot.date.start.split(" ")[0],
              enddate: slot.date.end.split(" ")[0],
              startTime: slot.date.start.split(" ")[1],
              endTime: slot.date.end.split(" ")[1],
            };
          });
      // Console the slots out
      return availableSlotsFormatted;
    })
    .catch(function (error) {
      return { error: "There was an error retrieving the reservations." };
    });
}

export function getReservationDetails(param: {
  config_id: string;
  party_size: number;
  apiKey: string;
  baseUrl: string;
  day: string;
}) {
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${param.baseUrl}/3/details?party_size=${param.party_size}&day=${param.day}&config_id=${param.config_id}`,
    headers: {
      Authorization: `ResyAPI api_key="${param.apiKey}"`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  return axios(config)
    .then(function (response) {
      const reservationDetail: bookTokenReservationDetail = response.data;
      // Map the response to the book_token object
      return reservationDetail.book_token;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function bookReservation(param: {
  authToken: string;
  bookToken: string;
  apiKey: string;
  baseUrl: string;
}) {
  var axios = require("axios");
  var qs = require("qs");
  var data = qs.stringify({
    book_token: param.bookToken,
    source_id: "resy.com-venue-details",
    struct_payment_method: '{"id":14077625}', // Special payment method id for credit card
  });
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}3/book`,
    headers: {
      authority: "api.resy.com",
      authorization: `ResyAPI api_key="${param.apiKey}"`,
      "x-resy-auth-token": param.authToken,
      "x-resy-universal-auth": param.authToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  return axios(config)
    .then(function (response: { data: any }) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
