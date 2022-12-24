var express = require('express');

const path = require('path');
const https = require('https');

const { Pool, Client } = require('pg');
const { setDefaultResultOrder } = require('dns');
const { response, json } = require('express');
const { table } = require('console');
const pool = new Pool()

var server = express()

function getWhoisDataFromAPI(ip_address) {
    return new Promise(function(resolve, reject) {

		let apiUrl = 'ipinfo.io'
		let ipinfo_token = process.env.IPINFO_TOKEN;
		let path = `${ip_address}?token=${ipinfo_token}`
	
		var req = https.get(`https://${apiUrl}/${path}`, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
				console.log(`api_res: ${body}`)
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        req.end();
    });
}


function updateWhoisForIP( ip_address, whois_data ){
	return new Promise((resolve, reject) => {
		pool.query("UPDATE visitors_list SET whois_data = $1 WHERE visitor_ip = $2;",[ whois_data , ip_address ])
		.catch( err => 
			setImmediate(() => {
			throw err
		  })
		)
		.then(response => {
			console.log(`db_res: ${response}`)
			resolve(response)
		} )
	})
}


async function fillMissingWhoisData(){
	const current_table = await pool.query('SELECT * FROM visitors_list');
	tableRows = current_table.rows;
	console.log(tableRows);
	
	for( let index = 0; index < tableRows.length; index++){
		if (tableRows[index].whois_data == null || tableRows[index].whois_data == undefined ) {

			console.log(`${index}: ${tableRows[index].visitor_ip} ${ tableRows.whois_data }	`);

			const new_whoisdata = await getWhoisDataFromAPI(tableRows[index].visitor_ip);
			const db_response = await updateWhoisForIP(tableRows[index].visitor_ip, new_whoisdata)
			console.log('new whoisdata: ' + new_whoisdata + db_response );
		}
	}
	return 'OK';
}

//
// Handlers for routes
//

server.get('/', function (req, res) {
	pool
		.query('INSERT INTO visitors_list(visitor_ip) VALUES ( $1 ) ON CONFLICT ( visitor_ip ) DO UPDATE SET count = visitors_list.count + 1',[ req.ip ])
		.then(answer => res.sendFile('index.html',{ root: __dirname }) )
		.catch(err =>
			setImmediate(() => {
				throw err
			})
		)
})


server.get('/table', function( req, res ){
	
	fillMissingWhoisData().then(success => {
		pool.query('SELECT * FROM visitors_list')
		.then( answer => { 
			res.send(answer.rows);	
		})
		.catch(err =>
			setImmediate(() => {
				throw err
			})
		)	
	})
});

server.use('/assets', express.static(path.join(__dirname, 'assets')))

server.listen(process.env.NODEPORT);