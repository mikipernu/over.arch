CREATE TABLE IF NOT EXISTS guests (
  guest_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP NOT NULL,
  -- person_id INT NOT NULL
);

-- CREATE TABLE IF NOT EXISTS locations (
--   location_id SERIAL PRIMARY KEY,
--   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_at TIMESTAMP NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   zipcode VARCHAR(20),
--   address VARCHAR(255)
-- );

-- CREATE TABLE IF NOT EXISTS users (
--   user_id VARCHAR(255) PRIMARY KEY,
--   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_at TIMESTAMP,
--   email VARCHAR(255) NOT NULL,
--   last_name VARCHAR(255)
-- );

-- CREATE TABLE IF NOT EXISTS people (
--   person_id SERIAL PRIMARY KEY,
--   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_at TIMESTAMP,
--   email VARCHAR(255) NOT NULL,
--   first_name VARCHAR(255) NOT NULL,
--   user_id VARCHAR(255),
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );

-- CREATE TABLE IF NOT EXISTS employees (
--   employee_id SERIAL PRIMARY KEY,
--   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_at TIMESTAMP,
--   person_id INT NOT NULL,
--   FOREIGN KEY (person_id) REFERENCES people(person_id),
--   workplace_id INT NOT NULL,
--   FOREIGN KEY (workplace_id) REFERENCES locations(location_id)
-- );

-- CREATE TABLE IF NOT EXISTS visitations (
--   visitation_id SERIAL PRIMARY KEY,
--   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   modified_at TIMESTAMP,
--   guest_id INT NOT NULL,
--   FOREIGN KEY (guest_id) REFERENCES guests(guest_id),
--   start_time TIMESTAMP,
--   end_time TIMESTAMP
-- );

-- CREATE INDEX idx_email ON people (email);
