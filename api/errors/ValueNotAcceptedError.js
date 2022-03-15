class ValueNotAcceptedError extends Error {
	constructor(contentType) {
		super(`The content type ${contentType} is not supported.`);
		this.name = "ValueNotAcceptedError";
		this.idError = 3;
	}
}

module.exports = ValueNotAcceptedError;
