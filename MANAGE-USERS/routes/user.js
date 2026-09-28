const express = require("express");

const router = express.Router();
const { handleGetAllUsers, handlegetUserById, handleUpdateUserById, handleCreateNewUser } = require("../controllers/user");



// Routes
router.get('/', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers
            .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
     .join()}
    </ul>
    `;
    res.send(html);
   //return res.json(allDbUsers);
}) ;

router.route('/:id')
.get( async (req, res) => {
    const id = Number(req.params.id);

   //const user = users.find(user => user.id === id);
   const user = await User.findById(req.params.id);
    return res.json(user);
})
.patch((req, res) => {
    return res.json({status : "Pending"});
})
.delete((req, res) => {
    return res.json({status : "Pending"});
})

router.post('/', handleCreateNewUser);


router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
});

router.patch('/:id', handleUpdateUserById)

router.delete('/:id', (req, res) => {
    //Delete the user with ID
    return res.json({status: "pending"});
});

module.exports = router;