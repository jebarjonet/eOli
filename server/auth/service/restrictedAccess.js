module.exports = checkAuthenticated;

// backend middleware auth validation
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/#/login');
}