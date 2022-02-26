const accessToken = require("../auth/accessToken");
const offerController = require("../controllers/offer.controller");

const validateAccessToken = accessToken.validateAccessToken;
const postOffer = offerController.postOffer;
const getAllOffers = offerController.getAllOffers;
const deleteOffer = offerController.deleteOffer;
const putOffer = offerController.putOffer;

module.exports = (app) => {
  // POST new offer
  app.post("/offers", validateAccessToken, postOffer);

  // GET all offers

  app.get("/offers", validateAccessToken, getAllOffers);

  // DELETE a offer by id
  app.delete("/offers/:id", validateAccessToken, deleteOffer);

  // PUT a offer b id
  app.put("/offers/:id", validateAccessToken, putOffer);
};
