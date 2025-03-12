const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AXNxTTCAF2Uudj9h7PefGPBsyIRkoBvSbNjEUnOJHiPXIvc3T8JPjyQ8rWnuxmOLWmm9WSdrRyWrajg-",
  client_secret: "EIRj9qggUvM38YjmWrBbLScLgDnymNVElL1gybTuB9zm_kXRKynNrFww5tdKqQss0a4Rv84Ef5d_Y_fB",
});

module.exports = paypal;
