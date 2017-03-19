# Zach's URL Shortener
###### A simple, yet effective URL shortener built using InfernoJS and Koa

### Features
* ES7 async/await
* Koa 2 (HTTP Middleware) - http://koajs.com/
    * Koa Router - https://github.com/alexmingoia/koa-router/tree/master/
    * Koa Bodyparser
* Knex (SQL ORM) - http://knexjs.org/
    * Migrations

### Initial Setup
```
git pull https://github.com/zlshames/koa-api-starter.git
cd koa-knex-starter
cp .env.example .env                // Copy the environment file to be configured
npm install                         // Install dependencies
npm install -g knex                 // Install knex globally to use knex database migrations
```

### Configure Database
* Edit the **.env** file and enter in your database information
* Edit the files in **/migrations** to whatever you want
* For more migration information, visit: http://knexjs.org/

### Database Migrations
```
knex migrate:latest                 // Run migration
knex migrate:rollback               // Rollback previous migration
```

### Run the server
```
npm run server                      // Runs the server in development mode
npm run server:prod                 // Runs the server in prroduction mode
```
