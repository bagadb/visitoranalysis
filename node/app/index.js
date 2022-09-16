var express = require('express')

const { Pool, Client } = require('pg')
const pool = new Pool()

var server = express()

server.get('/', function (req, res) {
	const text = 'INSERT INTO visitors_list(visitor_ip) VALUES ( $1 ) ON CONFLICT ( visitor_ip ) DO UPDATE SET count = visitors_list.count + 1'
	const values = [ req.ip ];
	answer = 'still nothing yet'
	res.send( answer );
})

server.listen(8080)

