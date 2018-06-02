require('dotenv').config();

console.log(process.env.MONGO_CONNECTION_STRING);
module.exports = {
  port: process.env.APP_PORT || 4000,
  db: {
    connectionString: process.env.MONGO_CONNECTION_STRING,
  },
  auth: {
    secret: process.env.AUTH_SECRET,
  }
};
