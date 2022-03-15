const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const acceptable = require("./serializer").acceptable;

app.use(bodyParser.json());

app.use((req, res, next) => {
	const headerAccept =
		req.header("Accept") === "*/*"
			? "application/json"
			: req.header("Accept");
	if (acceptable.indexOf(headerAccept) === -1) {
		res.status(406);
		res.end();
		return;
	}

	res.setHeader("content-type", headerAccept);

	next();
});

// delega as rotas /api/suppliers para router/index.js
const routes = require("./router/index.js");
const { header } = require("express/lib/request");
app.use("/api/suppliers", routes);

// inicia o servidor na porta API.port
app.listen(config.get("api.port"), () => {
	console.log("Server listening on port 3000");
});
