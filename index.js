const express = require("express");
const app = express();
const port = 3000;
const IP = require("ip");
const axios = require("axios");
const API_KEY = "322b9b2204db4b25b3901d4a37669f34";
const URL = "https://ipgeolocation.abstractapi.com/v1/?api_key=" + API_KEY;

const sendAPIRequest = async (ipAddress) => {
  try {
    const apiResponse = await axios.get(URL + "&ip_address=" + ipAddress);
    return apiResponse.data;
  } catch (error) {
    return -1;
  }
};

app.get("/", async (req, res) => {
  // const ipAddress = IP.address();
  try {
    const ip =
      req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "";

    const ipAddressInformation = await sendAPIRequest(ip);
    res.send(ipAddressInformation);
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
