#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE TABLE visitors_list(
	visitor_ip varchar(20) NOT NULL,
	count integer DEFAULT 1,
	PRIMARY KEY(visitor_ip)
	);
EOSQL
