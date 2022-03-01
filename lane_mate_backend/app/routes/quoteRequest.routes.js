const accessToken = require("../auth/accessToken");
const quoteRequestController = require("../controllers/quoteRequest.controller");
const postQuoteRequest = quoteRequestController.postQuoteRequest;
const getAllQuoteRequests = quoteRequestController.getAllQuoteRequests;
const deleteQuoteRequest = quoteRequestController.deleteQuoteRequest;
const putQuoteRequest = quoteRequestController.putQuoteRequest;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new quoteRequest
  app.post("/quoteRequests", validateAccessToken, postQuoteRequest);

  // GET all quoteRequests

  app.get("/quoteRequests", validateAccessToken, getAllQuoteRequests);

  // DELETE a quoteRequest by id
  app.delete("/quoteRequests/:id", validateAccessToken, deleteQuoteRequest);

  // PUT a quoteRequest b id
  app.put("/quoteRequests/:id", validateAccessToken, putQuoteRequest);
};
