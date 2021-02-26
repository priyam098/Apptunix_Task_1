const userRouter = require('express').Router();
const mWare = require('../middlewares/auth');
const Services = require('../Services/index');
const multer = require('../middlewares/multer');

userRouter.get('/profileUser',mWare.authenticateToken,Services.userAPI.profileUser);
userRouter.post('/signupUser',multer.upload.single('fileName'),Services.userAPI.signupUser);
userRouter.post('/loginUser',Services.userAPI.loginUser);
userRouter.post('/updateUser',mWare.authenticateToken,Services.userAPI.updateUser);
userRouter.post('/placeOrder',mWare.authenticateToken,Services.userAPI.placeOrder);

exports.userRouter = userRouter;