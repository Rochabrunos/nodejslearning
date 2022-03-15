const supplierRepo = require("../repo/supplier-repo");

class SupplierController {
	findAll() {
		return supplierRepo.getAll();
	}

	findById(id) {
		if (!id) {
			return new Promise((_, reject) => {
				reject(new Error(`Id=${id} inválido.`));
			});
		}
		return supplierRepo.findById(id).then((result) => {
			return new Promise((resolv, reject) => {
				if (result) {
					resolv(result);
					return;
				}
				reject(new Error(`Fornecedor com id = ${id} não encontrado.`));
			});
		});
	}

	newSupplier(newSupplier) {
		return supplierRepo.newSupplier(newSupplier);
	}

	updateById(id, data) {
		const prohibitedFields = [
			"createdAt",
			"updateAt",
			"id",
			"version"
		].filter((field) => {
			return Object.keys(data).includes(field);
		});
		if (!id) {
			return new Promise((_, reject) => {
				reject(new Error(`Id=${id} inválido.`));
			});
		}
		if (prohibitedFields.length) {
			return new Promise((_, reject) => {
				reject(
					new Error(
						"Não é possível atualizar os campos: ID, CreatedAt, UpdatedAt, Version"
					)
				);
			});
		}
		return supplierRepo.updateSupplier(id, data);
	}

	deleteById(id) {
		if (!id) {
			return new Promise((_, reject) => {
				reject(new Error(`Id=${id} inválido.`));
			});
		}
		return supplierRepo.deleteSupplier(id).then((result) => {
			return new Promise((resolv, reject) => {
				if (result === 0) {
					reject(
						new Error(
							`Fornecedor id = ${id} não existe na base de dados.`
						)
					);
					return;
				}
				resolv(result);
			});
		});
	}
}

module.exports = new SupplierController();
