module.exports = app => {
    const tracker = require("../controllers/tracker.controller.js");
    let router = require("express").Router();

    // Stock localisation in redis
    router.post("/stock", tracker.stock);

    // Get the location of user id
    router.get("/", tracker.get);

    app.use('/api/tracker', router);
};