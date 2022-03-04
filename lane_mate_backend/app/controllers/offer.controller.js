const offerModel = require("../models/offer.model");

const insertOffer = offerModel.insertOffer;
const selectAllOffers = offerModel.selectAllOffers;
const deleteFromOffersById = offerModel.deleteFromOffersById;
const updateOffer = offerModel.updateOffer;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = { getAllOffers, postOffer, deleteOffer, putOffer };

async function postOffer(req, res) {
  const { quoteRequestId, carrierId, rate, notes } = req.body;
  const user = req.user;

  //create new carrier
  const newOffer = await insertOffer({
    quoteRequestId,
    carrierId,
    rate,
    notes,
  });
  //send response
  const camelOffer = keysToCamel(newOffer);
  res.json(camelOffer);
}

//get all offers
async function getAllOffers(req, res) {
  try {
    const allOffers = await selectAllOffers();
    const allOffersCamelCase = allOffers.map((offer) => {
      return keysToCamel(offer);
    });
    res.json(allOffersCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a carrier
async function deleteOffer(req, res) {
  const { id } = req.params;
  const deletedOffer = await deleteFromOffersById(id);
  const camelDeletedOffer = keysToCamel(deletedOffer);
  res.json(camelDeletedOffer);
}

//update a carrier

async function putOffer(req, res) {
  const { id } = req.params;
  const { quoteRequestId, carrierId, rate, notes } = req.body;
  const updatedOffer = await updateOffer(id, {
    quoteRequestId,
    carrierId,
    rate,
    notes,
  });
  const camelUpdatedOffer = keysToCamel(updatedOffer);
  res.json(camelUpdatedOffer);
}
