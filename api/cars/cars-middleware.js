const db = require("../../data/db-config"); 
const vinValidator = require("vin-validator"); 

async function checkCarId (req, res, next) {
  try {
    const carById = await db("cars").where({car_id : req.params.id}).first();
    if (!carById) {
      next({status : 404, message: `car with id ${req.params.id} is not found` })
    } else {
      req.car = carById; 
      next();
    }

  } catch (err) {next(err)}
}

async function checkCarPayload(req, res, next) {
  try {


    const valuesObj = Object.values(req.body); 
    const keysObj = Object.keys(req.body); 

    if (valuesObj.length < 4) {
  
      const require = ["car_vin", "car_make", "car_model", "car_mileage", "car_title", "car_transmission"]

      const finder = [];

      for (let key of require) {
        if (!keysObj.includes(key)) {
           finder.push(key); 
        }
      }
    
      next({status : 400, message : `${finder[0]} is missing`})

    } else {

      next(); 
    }
  } catch (err) {next(err)}
}

async function checkVinNumberValid(req, res, next) {
  try {
    const {car_vin} = req.body;
    const isValid = vinValidator.validate(car_vin)
    if (isValid) {
      next();
    } else {
      next({status : 400, message : `vin ${car_vin} is invalid`})
    }
  } catch (err) {next(err)}
}

async function checkVinNumberUnique(req, res, next) {
  try {
    const {car_vin} = req.body;
    const searchForVin = await db("cars").where({car_vin : car_vin}).first();
    if (!searchForVin) {
      next();
    } else {
      next({status : 400, message : `vin ${car_vin} already exists`})
    }
  } catch (err) {next(err)}
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}