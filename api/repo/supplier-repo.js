const instance = require("../database/model/supplier-model");

class SupplierRepo {
	getAll() {
		return instance.findAll({ raw: true });
	}

	findById(id) {
		return instance.findByPk(id, { raw: true });
	}

	newSupplier(data) {
		return instance.create(data);
	}

	updateSupplier(id, data) {
		return instance.update(data, { where: { id } });
	}

	deleteSupplier(id) {
		return instance.destroy({ where: { id } });
	}
}

module.exports = new SupplierRepo();
