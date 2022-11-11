const User = require("./schemas/userSchemas");

const findUserByEmail = async ( email ) => {
  return await User.findOne(email);
}

const findUserByIdAndUpdate = async (id, token) => {
  return await User.findByIdAndUpdate(id, token);
}

module.exports = {
  findUserByEmail,
  findUserByIdAndUpdate
}