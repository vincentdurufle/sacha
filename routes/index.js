var express = require('express');
var router = express.Router();
const siteControllers = require('../controllers/siteControllers');
const userController = require('../controllers/userController');



/* GET home page. */
router.get('/', siteControllers.homePage);
router.get('/index', siteControllers.homePage);
router.get('/about', siteControllers.about);
router.get('/contact', siteControllers.contact);


router.get('/new_portfolio', siteControllers.getAlbums);

router.get('/users/add', 
  userController.isLoggedIn, 
  siteControllers.addAlbum);
router.post('/users/add',
  siteControllers.upload,
  siteControllers.resize,
  siteControllers.createAlbum
);

router.get('/users/edit', siteControllers.editingAlbumPage);

router.post('/users/add/:id',
  siteControllers.upload,
  siteControllers.resize, 
  siteControllers.updateAlbum);
router.get('/album/:id/edit', siteControllers.editAlbum);

router.get('/album/:slug', siteControllers.getAlbumBySlug);

router.get('/users', userController.loginForm);
router.post('/users', userController.login);

router.get('/video', siteControllers.video);

module.exports = router;