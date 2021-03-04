const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/user'); 

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
// router.post('/signup', [
//         body('email')
//         .isEmail()
//         .withMessage('Please enter a valid Email')
//         .custom((value, {req}) => {
//             console.log(User);
//             return User.findOne({ email: value})
//                         .then(userDoc => {
//                             if (userDoc) {
//                                 return Promise.reject('Email address already exists!');
//                             }
//                         }).catch(err => {
//                             console.log('See :' + err);
//                         }) 
//         }).normalizeEmail(),    // This will remove all the extra whitespaces
//         body('password').trim().isLength({min: 5}),
//         body('firstName').trim().not().isEmpty(),
//         body('lastName').trim().not().isEmpty(),
//         // body('confirmPassword').trim().equals(body('password'), equals)
//         ], authController.postSignup);

// router.post('/logout', authController.postLogout);

module.exports = router;