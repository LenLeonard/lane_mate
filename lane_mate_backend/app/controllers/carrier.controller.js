const carrierModel = require("../models/carrier.model");

const insertCarrier = carrierModel.insertCarrier;
const selectAllCarriers = carrierModel.selectAllCarriers;
const deleteFromCarriersById = carrierModel.deleteFromCarriersById;
const updateCarrier = carrierModel.updateCarrier;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = { getAllCarriers, postCarrier, deleteCarrier, putCarrier };

async function postCarrier(req, res) {
  const { carrierName, phone, contactExt, contactEmail, contactName, userId } =
    req.body;
  const user = req.user;

  //create new carrier
  const newCarrier = await insertCarrier({
    carrierName,
    phone,
    contactExt,
    contactEmail,
    contactName,
    userId: user.id,
  });
  //send response
  console.log(newCarrier);
  const newCarrierCamelCase = keysToCamel(newCarrier);

  res.json(newCarrierCamelCase);
}

//get all carriers
async function getAllCarriers(req, res) {
  try {
    const allCarriers = await selectAllCarriers();

    //covert each carrier object to camel case

    const allCarriersCamelCase = allCarriers.map((carrier) => {
      return keysToCamel(carrier);
    });

    res.json(allCarriersCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a carrier
async function deleteCarrier(req, res) {
  const { id } = req.params;
  const deletedCarrier = await deleteFromCarriersById(id);

  const deletedCarrierCamelCase = keysToCamel(deletedCarrier);
  res.json(deletedCarrierCamelCase);
}

//update a carrier

async function putCarrier(req, res) {
  const { id } = req.params;
  const {
    carrier_name,
    phone,
    contact_ext,
    contact_email,
    contact_name,
    user_id,
  } = req.body;
  const updatedCarrier = await updateCarrier(id, {
    carrier_name,
    phone,
    contact_ext,
    contact_email,
    contact_name,
    user_id,
  });
  const updatedCarrierCamelCase = keysToCamel(updatedCarrier);
  res.json(updatedCarrierCamelCase);
}
