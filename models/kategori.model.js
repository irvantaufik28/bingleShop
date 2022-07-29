const { STRING } = require("sequelize");
const { sequelize, Sequelize } = require("./bundle.model");

module.exports =(sequelize ,Sequelize)=>{
    const Kategori = sequelize.define('kategori',{
        name:{
            type: Sequelize.STRING
        }
    })
    return Kategori
}