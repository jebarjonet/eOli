module.exports = {
    remove: remove
};

function remove(req, res, next) {
    // delete middleware
    next();
}