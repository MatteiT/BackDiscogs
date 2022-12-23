const { strict } = require('assert');
const monngoose = require('mongoose');

const dbConn = async () => {
    try {
        await monngoose.connect(process.env.DATA_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,        
        });
        console.log('Database connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbConn;