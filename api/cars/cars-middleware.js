const db = require("../../data/db-config"); 
const vinValidator = require("vin-validator"); 



async function checkCarId (req, res, next) {
  try {
    const carById = await db("cars").where({id : req.params.id}).first();
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

    const {vin,make,model,mileage} = req.body;

    if (!vin || !make || !model || !mileage) {
  
      const require = ["vin", "make", "model", "mileage"]
      const objKeys = Object.keys(req.body); 
      for (let key of require) {
        if (!objKeys.includes(key)) {
           next({status : 400, message : `${key} is missing`})
           break; 
        }
      }

    } else {
      next(); 
    }
  } catch (err) {next(err)}
}



async function checkVinNumberValid(req, res, next) {
  try {
    const {vin} = req.body;
    const isValid = vinValidator.validate(vin)
    if (isValid) {
      next();
    } else {
    //  res.status(400).json({message : `vin ${vin} is invalid`})
     next({status : 400, message : `vin ${vin} is invalid` })
    }
  } catch (err) {next(err)}
}



async function checkVinNumberUnique(req, res, next) {
  try {
    const {vin} = req.body;
    const searchForVin = await db("cars").where({vin : vin}).first();
    if (!searchForVin) {
      next();
    } else {
      next({status : 400, message : `vin ${vin} already exists`})
    }
  } catch (err) {next(err)}
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}