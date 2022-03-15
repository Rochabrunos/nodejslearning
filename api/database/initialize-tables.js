const tableModel = require("./model/supplier-model");

tableModel
	.sync()
	.then(() => {
		console.log("Table created successfully");
	})
	.catch(console.log);
