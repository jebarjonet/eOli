module.exports = {
    total: total
};

function total(req, res, next) {

    //next();
    res.json({test: req.entity._id});
}