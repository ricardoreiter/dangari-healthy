var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
var auth = require('../utils/authentication');

router.get('/:id', function(req, res, next) {
    User.findOne({
        _id: req.params.id
    }, 'name login accountLevel', function(err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

router.get('/', function(req, res, next) {
    User.find(function(err, users) {
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
    user.accountLevel = 0;

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

module.exports = router;
