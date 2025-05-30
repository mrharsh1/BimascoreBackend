const mysql1 = require('mysql')

module.exports ={
  sql1:function(){
    return mysql1.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })
  }
}