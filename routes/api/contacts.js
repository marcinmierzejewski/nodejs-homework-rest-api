const express = require('express');
const contacts = require('../../models/contacts');
const { validateAddContact } = require('../tools/validator');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({status: 200, body: contactsList});
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await contacts.getContactById(contactId)
  if (getContact) {
    res.json({status: 200, data: getContact})
  } else {
    res.json({status: 404, message: "Not found"})
  }  
})

router.post('/', async (req, res, next) => {
  const body = req.body;
  const { error, value } = validateAddContact(body);
  if (error) {
    console.log(error);
    return res.json({status: 400, message: "missing required name field"});
  }

  const newContact = await contacts.addContact(body)
  res.json({status: 201, data: newContact})
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await contacts.removeContact(contactId)
  res.json({status: 200, data: deleteContact, message: "contact deleted"})
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  console.log(body)
  const renameContact = await contacts.updateContact(contactId, body)
  res.json({ status: 200, data: renameContact })
})

module.exports = router
