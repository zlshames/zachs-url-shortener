
exports.up = (knex, Promise) => {
  return knex.schema.createTable('urls', (table) => {
    table.increments()
    table.string('url').notNullable().unique()
    table.string('path').notNullable().unique()
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('urls')
}
