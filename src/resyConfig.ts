// ############
// # ResyKeys #
// ############
// # Your user profile API key. Can be found once you're logged into Resy in most "api.resy.com" network
// # calls (i.e. Try they "/find" API call when visiting a restaurant). Open your web console and look for a request header
// # called "authorization".
// # e.g.
// # resyKeys.api-key="MY_API_KEY"
export const apiKey = "VbWk7s3L4KiK5fzlO7JD3Q5EYolJI7n5";
// # Your user profile authentication token when logging into Resy. Can be found once you're logged into
// # Resy in most "api.resy.com" network calls (i.e. Try the "/find" API call when visiting a restaurant). Open your web
// # console and look for a request header called "x-resy-auth-token".
// # e.g.
// # resyKeys.auth-token="MY_AUTH_TOKEN"
export const authtoken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODE0NDA5MjUsInVpZCI6MTE2MTUyNDksImd0IjoiY29uc3VtZXIiLCJncyI6W10sImxhbmciOiJlbi11cyIsImV4dHJhIjp7Imd1ZXN0X2lkIjo1MjQyMTY0OH19.AEPnm66PMbrd45gdph6aa1AbLEt-EqW7-Ajt5LgFVVcoWgjB1EYfnc6WQtxnZxsZPrzAo2jxzDBFZVA-GfvHzw2kAGP1OlUoDSAmYMXuZGtoFH--sCcwuebnRJkKZw8vReYa6yQ4u4oY6QPJNiGz7D85gPHWjTT-bJKJiJ6KQYVLjgX7";

// ######################
// # ReservationDetails #
// ######################
// # The date you want to make the reservation in YYYY-MM-DD format. This should be set to the day after the
// # last available day with restaurant reservations as this is the day you want to snipe for a reservation once they
// # become available.
// # e.g.
// # resDetails.date="2099-01-30"
export const reservationDate = "2023-03-10";
// # Size of the party reservation
// # e.g.
// # resDetails.party-size=2
export const partysize = 2;
// # The unique identifier of the restaurant you want to make the reservation at. Can be found when viewing
// # available reservations for a restaurant as a query parameter in the `/find` API call if you have the web console open.
// # e.g.
// # resDetails.venue-id=123
// export const venueId = 42534; // The Chicken Bar
export const venueId = 69088; // Testing venue
// # Priority list of reservation times and table types. Time is in military time HH:MM:SS format. This
// # allows full flexibility on your reservation preferences. For example, your priority order of reservations can be...
// #   * 18:00 - Dining Room
// #   * 18:00 - Patio
// #   * 18:15
// #   If you have no preference on table type, then simply don't set it and the bot will pick a reservation for that time
// #   slot regardless of the table type.
// # e.g.
// # resDetails.res-time-types=[
// #     {reservationtime="18:00:00", table-type="Dining Room"},
// #     {reservationtime="18:00:00", table-type="Patio"},
// #     {reservationtime="18:15:00"}
// # ]
export const reservationTimes: { reservationtime: string; type?: string }[] = [
  { reservationtime: "18:00:00", type: "Dining Room" },
  { reservationtime: "18:30:00" },
  { reservationtime: "19:00:00" },
  { reservationtime: "19:30:00" },
  { reservationtime: "20:00:00" },
  { reservationtime: "20:30:00" },
  { reservationtime: "21:00:00" },
  { reservationtime: "21:30:00" },
  { reservationtime: "22:00:00" },
  { reservationtime: "22:30:00" },
  { reservationtime: "23:00:00" },
];

// #############
// # SnipeTime #
// #############
// # Hour of the day when reservations become available and when you want to snipe
// # e.g.
// # snipeTime.hours=9
export const snipeTimeHours = 0;
// # Minute of the day when reservations become available and when you want to snipe
// # e.g.
// # snipeTime.minutes=0
export const snipeTimeMinutes = 18;

// Uncomment the line below to use the staging API
// export const baseUrl = "https://staging-api.resy.com/";
// Uncomment the line below to use the production API
export const baseUrl = "https://api.resy.com/";
