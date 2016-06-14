module.exports = {
    ensureAuthorized: function(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
					console.log(bearerHeader);
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[0];
            req.token = bearerToken;
            next();
        } else {
            res.send(403);
        }
    }
};
