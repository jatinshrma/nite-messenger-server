let users = []

const addUser = (userId, socketId) => {
	users = users.filter(i => i.userId !== userId).concat([{ userId, socketId }])
}

const removeUser = socketId => {
	users = users.filter(user => user.socketId != socketId)
}

const getUser = async userId => {
	return await users.find(user => user.userId === userId)
}

const socketHandler = (socket, io) => {
	try {
		io.emit("chatOpen", true)

		socket.on("addUser", username => {
			console.log(`Socket ${socket.id} connected by ${username}`)
			addUser(username, socket.id)
			io.emit("getUsers", users)
		})

		socket.on("disconnect", () => {
			console.log(`Socket ${socket.id} disconnected`)
			removeUser(socket.id)
			io.emit("getUsers", users)
		})

		socket.on("sendMessage", async (message, receiver) => {
			const user = await getUser(receiver)
			if (user) io.to(user.socketId).emit("getMessage", message)
		})

		socket.on("typing", async (isTyping, receiver) => {
			const user = await getUser(receiver)
			console.log({ typing: user, receiver })
			if (user) io.to(user.socketId).emit("isFriendTyping", isTyping)
		})
	} catch (error) {
		console.error("Error in socket", error)
	}
}

module.exports = socketHandler
