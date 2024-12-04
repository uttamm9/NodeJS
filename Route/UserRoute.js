const express = require("express")
const router = express.Router();
const userController = require('../Contreoller/UserController');
const userAuth = require("../middleware/userAuth"); 
// const userAuth = require('../middleware/userAuth';)

router.post('/save',userController.createUser)

router.post('/login',userController.userLogin)

router.get('/getAllData',userController.getAlluser)

router.get('/single',userAuth,userController.singledetail)

// router.put('/update/:id',userController.update)
router.patch('/updateuser',userController.updateuser)

router.delete('/delete/:id',userController.deleteOne)

router.post('/mail',userController.sendMail)



module.exports = router;