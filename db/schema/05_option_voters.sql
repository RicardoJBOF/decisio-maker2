DROP TABLE IF EXISTS option_voters CASCADE;

CREATE TABLE option_voters (
  id SERIAL PRIMARY KEY NOT NULL,
  weight integer not null,
  option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
  voter_id INTEGER REFERENCES voters(id) ON DELETE CASCADE
);

