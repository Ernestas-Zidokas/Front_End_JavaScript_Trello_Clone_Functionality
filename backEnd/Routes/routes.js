const router = require('express').Router();
const listController = require('../Controllers/listController');
const cardController = require('../Controllers/cardController');
const userController = require('../Controllers/userController');
const middleware = require('../Middleware/middleware');

router.route('/createList').post(middleware.authenticate, listController.createList);
router.route('/getAllLists').get(middleware.authenticate, listController.getAllLists);
router.route('/deleteListById/:id/').delete(middleware.authenticate, listController.deleteListById);

router.route('/createCard').post(middleware.authenticate, cardController.createCard);
router.route('/getAllCards').get(middleware.authenticate, cardController.getAllCards);
router.route('/deleteCardById/:id/').delete(middleware.authenticate, cardController.deleteCardById);
router
  .route('/updateCardPosition/:id/')
  .put(middleware.authenticate, cardController.updateCardPosition);

router.route('/register').post(userController.register);
router.route('/getUser').post(userController.getUser);
router.route('/login').post(userController.login);
router.route('/logout').get(middleware.authenticate, userController.logout);

module.exports = router;
