const quoteRequestModel = require("../models/quoteRequest.model");

const insertQuoteRequest = quoteRequestModel.insertQuoteRequest;
const selectAllQuoteRequests = quoteRequestModel.selectAllQuoteRequests;
const deleteFromQuoteRequestsById =
  quoteRequestModel.deleteFromQuoteRequestsById;
const updateQuoteRequest = quoteRequestModel.updateQuoteRequest;

module.exports = {
  getAllQuoteRequests,
  postQuoteRequest,
  deleteQuoteRequest,
  putQuoteRequest,
};

async function postQuoteRequest(req, res) {
  const { salesRepId, customerId } = req.body;
  console.log(req.body);

  //create new quoteRequest
  const newQuoteRequest = await insertQuoteRequest({
    salesRepId,
    customerId,
  });
  //send response
  console.log(newQuoteRequest);
  res.json(newQuoteRequest);
}

//get all quoteRequests
async function getAllQuoteRequests(req, res) {
  try {
    const allQuoteRequests = await selectAllQuoteRequests();

    res.json(allQuoteRequests);
  } catch (error) {
    console.log(error);
  }
}

//delete a carrier
async function deleteQuoteRequest(req, res) {
  const { id } = req.params;
  const deletedQuoteRequest = await deleteFromQuoteRequestsById(id);
  res.json(deletedQuoteRequest);
}

//update a carrier

async function putQuoteRequest(req, res) {
  const { id } = req.params;
  const { quoteRequestId, carrierId, rate, notes } = req.body;
  const updatedQuoteRequest = await updateQuoteRequest(id, {
    salesRepId,
    customerId,
  });
  res.json(updatedQuoteRequest);
}
