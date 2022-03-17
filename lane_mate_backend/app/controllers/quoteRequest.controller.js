const quoteRequestModel = require("../models/quoteRequest.model");

const insertQuoteRequest = quoteRequestModel.insertQuoteRequest;
const selectAllQuoteRequests = quoteRequestModel.selectAllQuoteRequests;
const deleteFromQuoteRequestsById =
  quoteRequestModel.deleteFromQuoteRequestsById;
const updateQuoteRequest = quoteRequestModel.updateQuoteRequest;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = {
  getAllQuoteRequests,
  postQuoteRequest,
  deleteQuoteRequest,
  putQuoteRequest,
};

async function postQuoteRequest(req, res) {
  const { salesRepId, customerId, date, equipmentType } = req.body;
  console.log(req.body);

  //create new quoteRequest
  const newQuoteRequest = await insertQuoteRequest({
    salesRepId,
    customerId,
    date,
    equipmentType,
  });
  //send response

  const camelQuoteRequest = keysToCamel(newQuoteRequest);
  console.log(camelQuoteRequest);
  res.json(camelQuoteRequest);
}

//get all quoteRequests
async function getAllQuoteRequests(req, res) {
  try {
    const allQuoteRequests = await selectAllQuoteRequests();
    console.log(allQuoteRequests);
    //get type of date property
    const date = allQuoteRequests[0].date;
    console.log(date);
    console.log(date instanceof Date);
    const allQuoteRequestsCamelCase = allQuoteRequests.map((quoteRequest) => {
      return keysToCamel(quoteRequest);
    });

    res.json(allQuoteRequestsCamelCase);
    console.log(allQuoteRequestsCamelCase);
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
