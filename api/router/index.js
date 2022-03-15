const router = require("express").Router();
const SupplierController = require("../controllers/supplier-controller");
const Supplier = require("../models/supplier");
const { SerializerSupplier, SerializerError } = require("../serializer");

function sendError(error, res) {
	const serializerErorr = new SerializerError(res.getHeader("Content-type"));
	res.status(400).send(serializerErorr.serialize(error));
}
// trata a rota get("/api/suppliers/") para lista todos os fornecedores
router.get("/", (_, res) => {
	const serializer = new SerializerSupplier(res.getHeader("Content-type"));
	const serializerErorr = new SerializerError(res.getHeader("Content-type"));
	SupplierController.findAll()
		.then((result) => res.send(serializer.serialize(result)))
		.catch((error) => sendError(error, res));
});

// trata a rota get("/api/suppliers/:id") para um id especifico
router.get("/:id", (req, res) => {
	const id = req.params.id;
	const serializer = new SerializerSupplier(res.getHeader("Content-type"), [
		"email",
		"createdAt",
		"updatedAt",
		"version"
	]);

	SupplierController.findById(id)
		.then((result) => res.send(serializer.serialize(result)))
		.catch((error) => sendError(error, res));
});

// trata a rota post("/api/suppliers") para criar um novo fornecedor
router.post("/", (req, res) => {
	const newSupplier = new Supplier(req.body);
	const serializer = new SerializerSupplier(res.getHeader("Content-type"));

	SupplierController.newSupplier(newSupplier)
		.then((result) => {
			res.status(201).send(serializer.serialize(result));
		})
		.catch((error) => sendError(error, res));
});

// trata a rota put("/api/suppliers/:id") para editar informações de um fornecedor
router.put("/:id", (req, res) => {
	const id = req.params.id;
	const supplierChangeData = req.body;

	SupplierController.updateById(id, supplierChangeData)
		.then(() => res.status(203).send())
		.catch((error) => sendError(error, res));
});
//trata a rota delete("/api/suppliers/:id") para deletar um fornecedor
router.delete("/:id", (req, res) => {
	const id = req.params.id;
	SupplierController.deleteById(id)
		.then(() => res.status(204).end())
		.catch((error) => sendError(error, res));
});

module.exports = router;
