let express = require('express');
let app = express();
process.env.MESSAGE_STYLE == "uppercase";
console.log(process.env.MESSAGE_STYLE);
var bodyParser = require("body-parser");

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

//console.log("Hello World");

//app.get('/', (req, res) => {
//	res.send("Hello Express");
//});

app.use((req, res, next) => {
	let log = `${req.method} ${req.path} - ${req.ip}`;
	console.log(log);
	next();
});

app.get("/now", (req, res, next) => {
	req.time = new Date().toString();
	next();
}, (req, res) => {
	res.send({
		time: req.time
	});
}
);

app.get("/:word/echo", (req, res) => {
	const { word } = req.params;
	res.json({
		echo: word
	});
});

app.get("/name", (req, res) => {
	var firstName = req.query.first;
	var lastName = req.query.last;
	res.json({ name: `${firstName} ${lastName}` });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/name", (req, res) => {
	//handle the data in the request
	var string = req.body.first + " " + req.body.last;
	res.json({ name: string });
});

var message = {"message": "Hello json"};

//app.get('/', (req, res) => {
//	res.sendFile(__dirname + '/views/index.html');
//});

//app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		res.json({"message" : "HELLO JSON"})
	}else{
		res.json(message)
	}
});
module.exports = app;





































 module.exports = app;
