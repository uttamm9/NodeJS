const express = require("express")
const router = express.Router();
const userController = require('../Contreoller/UserController')

router.post('/save',userController.createUser)

router.get('/getAllData',userController.getAlluser)

// router.put('/update/:id',userController.update)
router.patch('/updateuser',userController.updateuser)



module.exports = router;