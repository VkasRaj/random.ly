const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");

const { mongoURI } = require("./server/config/keys/index");

// Express and Socket Server =============
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Routes Imports
const auth = require("./server/routes/auth");
const user = require("./server/routes/user");
require("./server/routes/chat")(io);

// "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --port 27017 --dbpath C:\mongodb\data\db
mongoose
	.connect(mongoURI)
	.then(() => console.log("MongoDB successfully connected!"))
	.catch(e => console.log(e));

const PORT = process.env.PORT || 5000;

/* EXPRESS MIDDLEWARES */
// Using build after deployment ==========
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "client/build")));
	app.get("*", (req, res) =>
		res.sendfile(path.resolve(__dirname, "client/build", "index.html"))
	);
} else {
	// Enabling CORS [for developement] ============
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	});
}

// Cookie Parser =========
app.use(cookieParser());

// Body Parser ===========
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Passport Serialize or Deserialize ========
app.use(passport.initialize());
app.use(passport.session());

/*
    1) React proxy will not work with only root url, which just have '/'.
    2) Make sure you add specific domain to work with react proxy i.e., '/user/login' or '/user/signup'.
*/

server.listen(PORT, () => {
	console.log(`Server is up on port: ${PORT}`);
});

app.get("/", (req, res) => {
	res.send({
		welcome: "home"
	});
});

// routes registration
app.use("/auth", auth);
require("./server/config/passport")(passport);
app.use("/user", user);
