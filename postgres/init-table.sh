#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE TABLE visitors_list(
	visitor_ip VARCHAR(50) NOT NULL,
	count INTEGER DEFAULT 1,
	whois_data JSON,
	PRIMARY KEY(visitor_ip)
	);
EOSQL
