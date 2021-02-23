const vendorRouter = require('express').Router();
const Services = require('../Services/index');
const mWare = require('../middlewares/auth');

vendorRouter.get('/profileVendor',mWare.authenticateToken,Services.vendorAPI.profileVendor);
vendorRouter.post('/registerVendor',Services.vendorAPI.registerVendor);
vendorRouter.post('/loginVendor',Services.vendorAPI.loginVendor);
vendorRouter.post('/updateVendor',mWare.authenticateToken,Services.vendorAPI.updateVendor);
vendorRouter.post('/addCategory',mWare.authenticateToken,Services.vendorAPI.addCategory);
vendorRouter.post('/addSubCategory',mWare.authenticateToken,Services.vendorAPI.addSubCategory);
vendorRouter.post('/addProduct',mWare.authenticateToken,Services.vendorAPI.addProduct);
vendorRouter.post('/getProduct',mWare.authenticateToken,Services.vendorAPI.getProduct);

exports.vendorRouter = vendorRouter;