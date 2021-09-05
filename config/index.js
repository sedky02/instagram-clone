const dotenv =require('dotenv');
dotenv.config();

module.exports =  {
  PORT: process.env.PORT,
  DB_URI : process.env.DB_URI ,
  TOKEN_SECRET: process.env.TOKEN_SECRET
};