const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto')
const ct = require('./db/contacts.json') // object

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, '/db/contacts.json'),
    'utf8',
  ) // string
  const result = JSON.parse(content)
  return result
}

async function listContacts() {
  return await readContent()
}

async function getContactById(contactId) {
  const contacts = await readContent()
  const contact = contacts.find((c) => c.id === contactId)
  return contact ? contact : null
}

async function removeContact(contactId) {
    const contacts = await readContent()
    const delContact = contacts.findIndex((c) => c.id === contactId)
    await fs.writeFile(
        path.join(__dirname, '/db/contacts.json'),
        JSON.stringify(contacts.filter((c) => c.id !== contactId), null, 2),)
    return contacts[delContact]
}

async function addContact(name, email, phone) {
  const contacts = await readContent()
  const newContact = { id: randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, '/db/contacts.json'),
    JSON.stringify(contacts, null, 2),
  )
  return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact }
