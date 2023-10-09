const express = require("express");
const CarData = require("./cars-model");
const { checkCarPayload, checkCarId, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const car = await CarData.getAll();
        res.status(200).json(car);
    } catch (err) { next(err) }
})

router.get("/:id", checkCarId, (req, res) => {
    res.status(200).json(req.car);
})

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const created = await CarData.create(req.body);
        res.status(201).json(created);
    } catch (err) { next(err) }
})
router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        stack: error.stack
    })
})
module.exports = router; 
