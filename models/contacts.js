const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    console.log(contactsPath);
    const readContacts = await fs.readFile(contactsPath);
    console.log("Loading...");
    // console.log(JSON.parse(readContacts));
    return JSON.parse(readContacts);
  } catch (error) {
    console.log("Load error", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    const getContact = getContactsList.find((cont) => cont.id === contactId);
    return getContact;
  } catch (error) {
    console.log("Get error", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    const getContactById = await getContactById(contactId);
    const removedContact = await getContactsList.filter(
      (cont) => cont.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(removedContact));
    return getContactById;
  } catch (error) {
    console.log("Remove error", error.message);
  }
};

const addContact = async (body) => {
  try {
    const getContactsList = await listContacts();
    const addNewContact = {
      id: nanoid(),
      ...body,
    };
    const newContactsList = [...getContactsList, addNewContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return addNewContact;
  } catch (error) {
    console.log("Add error", error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const getContactsList = await listContacts();
    const getContactById = await getContactById(contactId);
    const updateContactsList = getContactsList.map((cont) =>
      cont.id === contactId ? { ...cont, ...body } : cont
    );
    await fs.writeFile(contactsPath, JSON.stringify(updateContactsList));
    return updateContactsList;
  } catch (error) {
    console.log("Update error", error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
