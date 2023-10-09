/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("sales", table => {
    table.increments("sales_id").primary();
    table.integer("sale_amount").notNullable();
    table.integer("car_sale_id").unsigned().notNullable().unique();
    table.foreign("car_sale_id").references("cars.id").deferrable("deferred")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("sales")
};
