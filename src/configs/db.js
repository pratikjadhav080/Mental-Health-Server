const mongoose = require("mongoose");

let connect = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ekhq7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
};



module.exports = connect;


//myFirstDatabase
