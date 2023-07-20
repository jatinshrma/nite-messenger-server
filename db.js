const mongoose = require("mongoose")
const CONNECTION_STRING = process.env.CONNECTION_STRING

const connect = () => {
	mongoose
		.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log("Conncted to Mongo successfully"))
		.catch(error => console.log("Failed to connect to Mongo. Error:", error))
}

module.exports = { connect }
