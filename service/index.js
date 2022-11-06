const Contact = require("./schemas/contactSchemas");

const getAllContacts = () => {
  return Contact.find();
};

const getContactById = (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return Contact.findOne({ _id: id });
  }
  return null;
};

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const removeContact = (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return Contact.findOneAndRemove({ _id: id });
  }
  return null;
};

const updateContact = (id, fields) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
  }
  return null;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
};
