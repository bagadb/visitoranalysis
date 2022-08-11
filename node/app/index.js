var express = require('express')

const { Pool, Client } = require('pg')
const pool = new Pool()

var server = express()

var myvar;

server.get('/', function (req, res) {
	pool.query('SELECT NOW() AS the_date', (err, res) => {
		myvar = res.rows[0].the_date;
		console.log(myvar);
	})
	res.send('psql says' + myvar)
})

server.listen(8080)

