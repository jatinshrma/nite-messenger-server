require("dotenv").config()
require("./db").connect()

const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const methodOverride = require("method-override")
const socketHandler = require("./socket")

const __cors = { origin: "*", credentials: true }
const app = express()
app.use(express.json())
app.use(cors(__cors))
app.use(methodOverride("_method"))

const server = createServer(app)
const io = new Server(server, { cors: __cors })

app.get("/", (req, res) => {
	res.send("NodeSocketServer is up and running.")
})

app.use("/", require("./routes/message"))
app.use("/accounts", require("./routes/account"))
app.use("/dp", require("./routes/upload"))

server.listen(process.env.PORT, () => {
	console.log(`Nite Messenger listening at PORT ${process.env.PORT}`)
})

// io.on("connection", socket => socketHandler(socket, io))
