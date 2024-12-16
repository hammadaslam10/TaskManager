const mongoose = require("mongoose");

const connectDataBase = () => {
    mongoose
        .connect(process.env.DB_URI, {
             useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        })
        .then((data) => {
            console.log(`Mongodb connected with server ${data.connection.host}`);
        });
};

module.exports = connectDataBase;