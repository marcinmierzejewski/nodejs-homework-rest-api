const express = require("express");
const router = express.Router();
const ctrlContact = require('../../controller/contactsController')
const authorization = require("../../tools/authorization");

router.get("/", authorization, ctrlContact.get);

router.get('/:contactId', ctrlContact.getById);

router.post('/', ctrlContact.createContact)

router.delete("/:contactId", ctrlContact.removeContact)

router.put("/:contactId", ctrlContact.updateContact)

router.patch('/:contactId/favorite', ctrlContact.updateFavorite)

module.exports = router;