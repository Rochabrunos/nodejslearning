const ValueNotAcceptedError = require("./errors/ValueNotAcceptedError");
const jsonToXML = require("jsontoxml");

class Serializer {
	json(data) {
		return JSON.stringify(data);
	}

	xml(data) {
		if (Array.isArray(data)) {
			data = data.map((item) => {
				return jsonToXML({ [this.tagForOne]: item });
			});
			return jsonToXML({ [this.tagForMany]: data });
		}

		return jsonToXML({ [this.tagForOne]: data });
	}

	serialize(data) {
		data = this.filter(data);
		switch (this.contentType) {
			case "application/json":
				return this.json(data);
			case "application/xml":
				return this.xml(data);
			default:
				throw new ValueNotAcceptedError(this.contentType);
		}
	}

	filterFields(data) {
		const newObject = {};
		this.publicFields.forEach((field) => {
			if (data.hasOwnProperty(field)) {
				newObject[field] = data[field];
			}
		});
		return newObject;
	}

	filter(data) {
		if (Array.isArray(data)) {
			data = data.map((item) => {
				return this.filterFields(item);
			});
		} else {
			data = this.filterFields(data);
		}

		return data;
	}
}

// template method - design pattern
class SerializerSupplier extends Serializer {
	constructor(contentType, extraFields = []) {
		super();
		this.contentType = contentType;
		this.publicFields = ["id", "company", "category"].concat(extraFields);
		this.tagForOne = "fonecedor";
		this.tagForMany = "fonecedores";
	}
}

class SerializerError extends Serializer {
	constructor(contentType, extraFields = []) {
		super();
		this.contentType = contentType;
		this.publicFields = ["id", "message", "name"].concat(extraFields);
		this.tagForOne = "error";
		this.tagForMany = "errors";
	}
}

module.exports = {
	Serializer: Serializer,
	SerializerSupplier: SerializerSupplier,
	SerializerError: SerializerError,
	acceptable: ["application/json", "application/xml"]
};
