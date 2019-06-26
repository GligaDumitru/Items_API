const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  connection:
    process.env.MONGODB_URI ||
    "mongodb://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASSWORD +
      "@ds259742.mlab.com:59742/items_api"
};
