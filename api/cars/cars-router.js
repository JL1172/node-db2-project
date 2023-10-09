const express = require("express");
const CarData = require("./cars-model");
const { checkCarPayload, checkCarId, checkVinNumberValid, checkVinNumberUnique, checkPutPayload } = require("./cars-middleware");

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


router.put("/:id",checkCarId,checkPutPayload,async(req,res,next) => {
    try {
        const updated  = await CarData.update(req.params.id, req.body)
        res.status(200).json(updated)
    } catch (err) {next(err)}
})


router.delete("/:id",checkCarId,async(req,res,next)=> {
    try {
        const removed = await CarData.remove(req.params.id);
        res.status(200).json(removed); 
    } catch (err) {next(err)}
})


router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        stack: error.stack
    })
})
module.exports = router; 
