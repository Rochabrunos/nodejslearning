const Sequelize = require("sequelize");
const instance = require("../index");

// configura o banco de dados de fornecedores(suppliers)

const columns = {
	company: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	category: {
		type: Sequelize.ENUM("Ração", "Brinquedos", "Higiene", "Outros"),
		allowNull: false
	}
};

const options = {
	// nao altera o nome da tabela
	freezeTableName: true,
	// configura o nome da tabela
	tableName: "suppliers",
	// cria as colunas referenteas as createdAt, updatedAt
	timestamps: true,
	// renomea a coluna createdAt
	// createdAt: 'dataCriacao'
	// renomea a coluna updatedAt
	// updatedAt: 'dataAtualizacao'
	// cria a coluna versao para o fornecedor
	version: "version"
};

// define(nome da tabela no codigo, colunas, opcoes)
module.exports = instance.define("suppliers", columns, options);
