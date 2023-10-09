const db = require("../../data/db-config");

const getAll = async() => {
  return await db("cars")
}

const getById = async(id) => {
  return await db("cars").where({id : id})
}

const create = async(newCar) => {
  const createdCar = await db("cars").insert(newCar);
  return await db("cars").where({id : createdCar[0]}).first();  
}

const update = async(id,changes) => {
  const updatedCar = await db("cars").update(changes).where({id : id}); //eslint-disable-line
  return await db("cars").where({id : id});
}
const remove = async(id) => {
  const removed = await db("cars").del().where({id : id});
  return removed; 
}
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}