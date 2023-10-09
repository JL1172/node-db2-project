/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sales').truncate()
  await knex('sales').insert([
    { sale_amount: 15890, car_sale_id : 1 },
    { sale_amount: 111890, car_sale_id : 2 },
    { sale_amount: 18090, car_sale_id : 3 }
  ]);
};
