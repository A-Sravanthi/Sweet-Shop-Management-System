const { Router } = require('express');
const routeController = require('../controller/routeController');
const router = Router();

router.post('/userSignup', routeController.usersignup_post);
router.post('/userLogin', routeController.userlogin_post);
router.post('/adminSignup', routeController.adminsignup_post);
router.post('/adminLogin', routeController.adminlogin_post);



module.exports = router;
