var express = require('express')

const { Pool, Client } = require('pg')
const pool = new Pool()

var server = express()

var myvar = 'nothing yet';

server.get('/', function (req, res) {
	pool.query('INSERT INTO visitors_list values ( ' + req.ip + ' ) ON CONFLICT ( visitor_ip ) DO UPDATE SET count = visitors_list.count + 1; SELECT * FROM visitors_list;', (err, res) => {
		myvar = res;
	})
	res.send('psql says ' + JSON.stringify(myvar) )
})

server.listen(8080)

