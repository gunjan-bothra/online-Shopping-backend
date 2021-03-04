const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {

}

exports.postLogin = (req, res, next) => {

}

exports.getSignup = (req, res, next) => {

}

exports.postSignup = (req, res, next) => {
    console.log("signup");
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  console.log(req.body);
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
    // const errors = validationResult(req);  // This will collect all the validation errors
    // if (!errors.isEmpty()) {
    //     const error = new Error('Validation Failed!');
    //     error.statusCode = 422;
    //     error.data = errors.array();
    //     throw error;
    // }
    //password encryption
    console.log(req);
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const email = req.body.email;
    // const password = req.body.password;
    // // const confirmPassword = req.body.confirmPassword;
    // const createdAt = new Date();
    
    // bcrypt
    //     .hash(password, 12)
    //     .then(hashedPswd => {
    //         console.log("success password" + hashedPswd);
    //         const user = new User({
    //             firstName: firstName,
    //             lastName: lastName,
    //             email: email,
    //             password: hashedPswd,
    //             createdAt: createdAt
    //         })
    //         return user.save();
    //     })
    //     .then(result => {
    //         console.log("success");
    //         res.status(201).json({message: "User Created Sucessfully", userId: result._id});
    //     })
    //     .catch(err => {
    //         if(!err.statusCode) {
    //             err.statusCode = 500;
    //         }
    //         next(err);
    //     });
}