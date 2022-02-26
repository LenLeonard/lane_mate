const accessToken = require("../auth/accessToken");
const quoteRequestController = require("../controllers/quoteRequest.controller");
const postQuoteRequest = quoteRequestController.postQuoteRequest;
const getAllQuoteRequests = quoteRequestController.getAllQuoteRequests;
const deleteQuoteRequest = quoteRequestController.deleteQuoteRequest;
const putQuoteRequest = quoteRequestController.putQuoteRequest;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new quoteRequest
  app.post("/quote_requests", validateAccessToken, postQuoteRequest);

  // GET all quoteRequests

  app.get("/quote_requests", validateAccessToken, getAllQuoteRequests);

  // DELETE a quoteRequest by id
  app.delete("/quote_requests/:id", validateAccessToken, deleteQuoteRequest);

  // PUT a quoteRequest b id
  app.put("/quote_requests/:id", validateAccessToken, putQuoteRequest);
};
