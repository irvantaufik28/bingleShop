import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

// struktur table users = nama tabel > field > opsi
const User = db.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
},{
    freezeTableName:true
})


export default User;

// function untuk mengenrate tabel jika tabel user tidak terdapat di database
(async()=>{
    await db.sync()
})()
// () >> panggil functionnya