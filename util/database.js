const Sequelize=require('sequelize');
const sequelize=new Sequelize('nodedb','root','sscfGk2u@',{host:'localhost',dialect:'mysql'});
module.exports=sequelize;