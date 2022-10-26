const express = require('express');
const contacts = require('../../models/contacts')

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
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
