const fs = require('fs').promises
const path = require('path')
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json")


function listContacts() {
    const data = fs.readFile(contactsPath)
    return JSON.parse(data)
}
  
function getContactById(contactId) {
    const contacts = listContacts()
    const result = contacts.find((item) => item.id === contactId)
    if (result === -1) {
        return null
    }
    return result
}

function removeContact(contactId) {
    const contacts = listContacts()
    const index = contacts.findIndex((item) => item.id === contactId)
    if (index === -1) {
        return null
    }
    const [result] = contacts.splice(index, 1)
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}
  
function addContact(name, email, phone) {
    const contacts = listContacts()
    const newContact = { id: nanoid(), name, email, phone }
    contacts.push(newContact)
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
}

module.exports = { listContacts, getContactById, addContact, removeContact }