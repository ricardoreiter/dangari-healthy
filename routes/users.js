var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('User');
var auth = require('../utils/authentication');

// router.get('/:id', function(req, res, next) {
//     User.findOne({
//         _id: req.params.id
//     }, 'name login isAdmin', function(err, user) {
//         if (err) {
//             return next(err);
//         }
//         res.json(user);
//     });
// });

router.get('/summary', function(req, res, next) {
    User.find('login isAdmin banned', function(err, users) {
        if (err) {
            return next(err);
        }
        var user = 0,
            banned = 0,
            admin = 0

        for (u of users) {
            if (u.banned) {
                banned++
            } else if (u.isAdmin) {
                admin++
            } else {
                user++
            }
        }

        res.json({
            users: user,
            banned: banned,
            admin: admin
        });
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

router.get('/last-year', function(req, res, next) {
    var now = new Date()
    var end = new Date(now.setMonth(now.getMonth() + 1)).setDate(1)
    var begin = new Date(now.setFullYear(now.getFullYear() - 1)).setDate(1)
    console.log(begin);
    User.find({
        createdAt: {
            $gte: begin,
            $lt: end
        }
    }, function(err, users) {
        if (err) {
            return next(err);
        }
        var map = _groupByMonth(users)
        var result = {
            labels: [],
            data: []
        }
        for (entry of map) {
            result.labels.push(_strMonth(entry.k) +' '+ entry.v[0].createdAt.getFullYear())
            result.data.push(entry.v.length)
        }
        res.json(result);
    }).sort({
        createdAt: 'asc'
    });
});

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
            userToEdit.photo = reqUser.photo;
            userToEdit.banned = reqUser.banned;
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

function _groupByMonth(users) {
    var result = [];
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        var month = user.createdAt.getMonth()
        var entry = _find(month, result)
        if (entry) {
            entry.v.push(user)
        } else {
            entry = {
                k: month,
                v: [user]
            }
            result.push(entry)
        }
    }
    return result;
}

function _find(month, map) {
    for (var i = 0; i < map.length; i++) {
        entry = map[i]
        if (entry.k === month) {
            return entry
        }
    }
}

function _strMonth(month) {
    switch (month) {
        case 0:
            return 'Janeiro'
        case 1:
            return 'Fevereiro'
        case 2:
            return 'Março'
        case 3:
            return 'Abril'
        case 4:
            return 'Maio'
        case 5:
            return 'Junho'
        case 6:
            return 'Julho'
        case 7:
            return 'Agosto'
        case 8:
            return 'Setembro'
        case 9:
            return 'Outubro'
        case 10:
            return 'Novembro'
        case 11:
            return 'Dezembro'
    }
}

module.exports = router;
