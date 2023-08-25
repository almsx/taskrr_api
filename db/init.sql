-- CREATE DATABASE IF NOT EXISTS taskrr_db
SELECT 'CREATE DATABASE taskrr_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'taskrr_db')\gexec