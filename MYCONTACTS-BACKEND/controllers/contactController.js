//@desc Get all the contacts
//@routes GET  /api/contacts
//@access public
const  getContacts = (req, res) => {
    res.status(200).json({message: "Get All Contacts"});
};

//@desc Create New contact
//@routes POST  /api/contacts
//@access public
const  createContact = (req, res) => {
   const {name, email, phone} = req.body;
   if(!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
   }
    res.status(201).json({message: "Contact has been created"});
};

//@desc Get contact
//@routes GET  /api/contacts/:id
//@access public
const  getContact = (req, res) => {
    res.status(200).json({message: `Get Contact for ${req.params.id}`});
};

//@desc Update contact
//@routes PUT  /api/contacts/:id
//@access public
const  updateContact = (req, res) => {
    res.status(200).json({message: `Update Contact for ${req.params.id}`});
};

//@desc Delete contact
//@routes DELETE  /api/contacts/:id
//@access public
const  deleteContact = (req, res) => {
    res.status(200).json({message: `Delete Contact for ${req.params.id}`});
};

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};