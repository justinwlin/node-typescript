import axios from "axios";

// Every 1 min call the API localhost:3003/getOpenSlots
function loopFunction() {
  console.log("Loop function called");
  return axios
    .get("http://localhost:3003/getOpenSlots")
    .then((res) => {
      console.log("Returning response data");
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function main() {
  await loopFunction();
  while (true) {
    // Promise await 1 minutes
    console.log("Waiting...");
    await new Promise((resolve) => setTimeout(resolve, 1000 * 30));
    console.log("Running loop function again..." + new Date().toString());
    const result = await loopFunction();
    // Check if result is object type and has resy_token
    if (typeof result === "object" && "resy_token" in result) {
      console.log("Resy token found");
      console.log(result.resy_token);
      console.log("Exiting program loop");
      return;
    } else {
      console.log("still searching... result of loop function:");
      console.log(result);
    }
  }
}

main();
