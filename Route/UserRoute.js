const express = require("express")
const router = express.Router();
const userController = require('../Contreoller/UserController')

router.post('/save',userController.createUser)

router.post('/login',userController.userLogin)

router.get('/getAllData',userController.getAlluser)

router.get('/single',userController.singledetail)

// router.put('/update/:id',userController.update)
router.patch('/updateuser',userController.updateuser)

router.delete('/delete/:id',userController.deleteOne)



module.exports = router;