DROP TABLE IF EXISTS voters CASCADE;

CREATE TABLE voters (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
