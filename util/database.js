const mysql=require('mysql2');

const pool=mysql.createPool(
    {
        host:'localhost',
        user:'root',
        database:'nodedb',
        password:'sscfGk2u@'
    }
);

module.exports=pool.promise();