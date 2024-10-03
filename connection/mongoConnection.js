const mongoose = require("mongoose");

async function mongoConnect(title) {
    return mongoose.connect(title);
}



module.exports = mongoConnect;
