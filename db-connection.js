var mysql = require('mysql');
var config = {
  host     : process.env['DB_HOST'],
  user     : process.env['DB_USER'],
  password : process.env['DB_PASSWORD'],
  database : process.env['DB_NAME'],
};

async function dbConnection() {
	const connection = new mysql.createConnection(config);

	connection.connect(function(err) {
		console.log(process.env['NODE_ENV']);

		if (err) {
			console.log('db connecting error');
			return;
		}

		console.log('db connecting success');
	});

	return connection;
};

module.exports = {
  dbConnection
};