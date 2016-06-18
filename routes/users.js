var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
var auth = require('../utils/authentication');

router.get('/:id', function(req, res, next) {
    User.findOne({
        _id: req.params.id
    }, 'name login isAdmin', function(err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

router.get('/', function(req, res, next) {
    User.find('name login isAdmin email', function(err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});

// TODO AJEITA ESSA PORRA
router.get('/me/me', auth.ensureAuthorized, function(req, res, next) {
    User.findOne({
        token: req.token
    }, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});

router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.isAdmin = false;

    if (!user.login) {
        res.status(500).send('Empty user login');
        return;
    }

    if (!user.password) {
        res.status(500).send('Empty user password');
        return;
    }

    if (!user.name) {
        res.status(500).send('Empty user name');
        return;
    }

    User.findOne({
        login: req.body.login
    }, function(err, userExists) {
        if (err) {
            return next(err);
        }
        if (userExists) {
            res.status(500).send('User already exists');
        } else {
            user.token = jwt.sign(user, 'nossoSecretDangariHealthy');
            user.save(function(err, salvedUser) {
                if (err) {
                    return next(err);
                }

                res.json(salvedUser);
            });
        }
    });
});

router.put('/:id', auth.ensureAuthorized, function(req, res, next) {
    User.findOne({
        token: req.token
    }, function(err, user) {
        var reqUser = new User(req.body);

        var editAndSaveUser = function(userToEdit, isAdmin) {
            userToEdit.name = reqUser.name;
            userToEdit.email = reqUser.email;
            if (reqUser.password) {
                userToEdit.password = reqUser.password;
            }

            if (isAdmin) {
                userToEdit.isAdmin = reqUser.isAdmin;
            }

            userToEdit.save(function(err, salvedUser) {
                if (err) {
                    return next(err);
                }

                res.json({
                    message: 'Usuário alterado com sucesso!'
                });
            });
        }

        if (!reqUser.email) {
            res.status(500).send('Empty user email');
            return;
        }

        if (!reqUser.name) {
            res.status(500).send('Empty user name');
            return;
        }

        if (user._id == req.params.id) {
            editAndSaveUser(user, user.isAdmin);
        } else if (user.isAdmin) {
            User.findOne({
                _id: req.params.id
            }, function(err, userToEdit) {
                if (err) {
                    return next(err);
                }

                editAndSaveUser(userToEdit, true);
            });
        } else {
            res.status(403).send('Access denied');
        }
    });
});

module.exports = router;
