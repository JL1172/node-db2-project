// STRETCH
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const vin1 = new Array(17).fill(1).join("");
const vin2 = new Array(17).fill(2).join("");
const vin3 = new Array(17).fill(3).join("")
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('cars').truncate()
    await knex('cars').insert([
      {vin: `${vin1}`, make : "honda", model : "crv", mileage : 1293408, title : "salvage", transmission : null},
      {vin:`${vin2}`, make : "toyato", model : "Supra", mileage : 13233, title : null, transmission : "manual"},
      {vin: `${vin3}`, make : "lexus", model : "LX570", mileage : 20000, title : "clean", transmission : "auto"}
    ]);
  };
  