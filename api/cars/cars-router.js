const express = require("express");
const CarData = require("./cars-model");
const {} = require("./cars-middleware"); 

const router = express.Router();

router.get("/",async(req,res,next)=> {
    try {
        const car = await CarData.getAll();
        res.status(200).json(car);
    } catch (err) {next(err)}
})

router.get("/:id",(req,res)=> {
    res.status(200).json(req.car); 
})


router.use((error,req,res,next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message : error.message
    })
})
module.exports = router; 
