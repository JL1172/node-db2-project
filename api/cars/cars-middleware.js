const db = require("../../data/db-config"); 

const checkCarId = async(req, res, next) => {
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

const checkCarPayload = async(req, res, next) => {
  try {
    const {car_vin, car_make, car_model, car_mileage, car_title, car_transmission} = req.body;
    const require = [car_vin, car_make, car_model, car_mileage, car_title, car_transmission]
    const valuesObj = Object.values(req.body); 
    const keysObj = Object.keys(req.body); 
    if (valuesObj.length !== 4) {
      const finder = [];
      for (let key of require) {
        if (!keysObj.includes(key)) {
          return finder.push(key); 
        }
      }
      next({status : 400, message : `${finder[0]} is missing`})
    } else {
      next(); 
    }
  } catch (err) {next(err)}
}

const checkVinNumberValid = async(req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = async(req, res, next) => {
  // DO YOUR MAGIC
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}