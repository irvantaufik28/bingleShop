module.exports={
    BASE_URL: 'http://localhost:3000/',
    HOST: 'localhost',
    USER:'postgres',
    PASSWORD:'123456',
    DBNAME :'bingleShop_db',
    dialect: 'postgres',
    DBPORT: 5432,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}