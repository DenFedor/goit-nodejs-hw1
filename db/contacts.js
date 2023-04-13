const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.format({ dir: "db", base: "contacts.json" });

async function listContacts() {
  try {
    let contactsString = "";
    await fs
      .readFile(contactsPath, { encoding: "utf-8" })
      .then((res) => {
        contactsString = res;
      })
      .then(() => {
        contactsString = JSON.parse(contactsString);
      });
    return contactsString;
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.filter((item) => item.id === contactId);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter((item) => item.id !== contactId);
   await fs.writeFile(contactsPath, JSON.stringify(filteredContacts), "utf8");
    console.table(await listContacts());
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactObj = {
      name: name,
      email: email,
      phone: phone,
    };
    let contacts = await listContacts();
    contacts.push(contactObj);
   await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    console.table(await listContacts());
  } catch (error) {
    console.error(error.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
