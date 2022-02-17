//export const postCarrier = async (req, res) => {
//authenticate user
//get user data from token payload
// use that to creater carrier
//validate request
//do other stuff
//call insert carrier function(imported frrom model)
const carrierModel = require("../models/carrier.model");

const insertCarrier = carrierModel.insertCarrier;
const selectAllCarriers = carrierModel.selectAllCarriers;
const deleteFromCarriersById = carrierModel.deleteFromCarriersById;
const updateCarrier = carrierModel.updateCarrier;

module.exports = { getAllCarriers, postCarrier, deleteCarrier, putCarrier };

async function postCarrier(req, res) {
  const { carrier_name, phone, contact_ext, contact_email, contact_name } =
    req.body;
  const user = req.user;

  //create new carrier
  const newCarrier = await insertCarrier({
    carrier_name,
    phone,
    contact_ext,
    contact_email,
    contact_name,
    user_id: user.id,
  });
  //send response
  res.json(newCarrier);
}

//get all carriers
async function getAllCarriers(req, res) {
  try {
    const allCarriers = await selectAllCarriers();

    res.json(allCarriers);
  } catch (error) {
    console.log(error);
  }
}

//delete a carrier
async function deleteCarrier(req, res) {
  const { id } = req.params;
  const deletedCarrier = await deleteFromCarriersById(id);
  res.json(deletedCarrier);
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
  res.json(updatedCarrier);
}
