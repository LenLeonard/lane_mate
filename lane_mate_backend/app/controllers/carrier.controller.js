//export const postCarrier = async (req, res) => {
//authenticate user
//get user data from token payload
// use that to creater carrier
//validate request
//do other stuff
//call insert carrier function(imported frrom model)
const insertCarrier = require("../models/carrier.model");

module.exports = async function postCarrier(req, res) {
  const { carrier_name, phone, contact_ext, contact_email, contact_name } =
    req.body;
  const user = req.user;
  console.log(user);

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
};
