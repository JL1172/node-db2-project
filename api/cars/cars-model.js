const db = require("../../data/db-config");

const getAll = async() => {
  return await db("cars")
}

const getById = async(id) => {
  return await db("cars").where({car_id : id})
}

const create = async(newCar) => {
  const createdCar = await db("cars").insert(newCar);
  return createdCar; 
}

module.exports = {
  getAll,
  getById,
  create,
}