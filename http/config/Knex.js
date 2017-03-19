import dotenv from 'dotenv'

dotenv.config()

const Knex = require('knex')({
  client: process.env.DB_TYPE,
  connection: {
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    charset  : 'utf8'
  }
})

export default Knex
