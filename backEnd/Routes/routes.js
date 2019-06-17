const router = require('express').Router();
const listController = require('../Controllers/listController');
const cardController = require('../Controllers/cardController');
const userController = require('../Controllers/userController');
const middleware = require('../Middleware/middleware');

// router
//   .route('/toDoItem')
//   .post(middleware.authenticate, toDoController.createToDoItem)
//   .get(middleware.authenticate, toDoController.getAllItems);
// router.route('/deleteitem').post(middleware.authenticate, toDoController.deleteItem);
// router.route('/deleteItemById/:id/').delete(middleware.authenticate, toDoController.deleteItemById);
// router.route('/getItem/:id/').get(middleware.authenticate, toDoController.getItem);

router.route('/createList').post(middleware.authenticate, listController.createList);
router.route('/getAllLists').get(middleware.authenticate, listController.getAllLists);

router.route('/createCard').post(middleware.authenticate, cardController.createCard);
router.route('/getAllCards').get(middleware.authenticate, cardController.getAllCards);

router.route('/register').post(userController.register);
router.route('/getUser').post(userController.getUser);
router.route('/login').post(userController.login);
router.route('/logout').get(middleware.authenticate, userController.logout);

module.exports = router;
