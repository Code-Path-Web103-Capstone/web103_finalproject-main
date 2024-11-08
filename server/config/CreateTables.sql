-- Drop constraints if they exist
ALTER TABLE expenses_recurrent DROP CONSTRAINT IF EXISTS fk_expenses_actual;
ALTER TABLE expenses_recurrent DROP CONSTRAINT IF EXISTS fk_expenses_predicted;
ALTER TABLE incomes_recurrent DROP CONSTRAINT IF EXISTS fk_incomes_actual;
ALTER TABLE incomes_recurrent DROP CONSTRAINT IF EXISTS fk_incomes_predicted;

-- Drop tables if they exist with cascade
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS budgets CASCADE;
DROP TABLE IF EXISTS expenses_actual CASCADE;
DROP TABLE IF EXISTS incomes_actual CASCADE;
DROP TABLE IF EXISTS expenses_predicted CASCADE;
DROP TABLE IF EXISTS incomes_predicted CASCADE;
DROP TABLE IF EXISTS incomes_recurrent CASCADE;
DROP TABLE IF EXISTS expenses_recurrent CASCADE;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

-- Create budgets table
CREATE TABLE IF NOT EXISTS budgets (
  id BIGSERIAL PRIMARY KEY,
  create_at TIMESTAMP,
  user_id TEXT NOT NULL,
  budget_name TEXT NOT NULL,
  plan VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create expenses_actual table
CREATE TABLE IF NOT EXISTS expenses_actual (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR NOT NULL,
  date_posted TIMESTAMP,
  amount FLOAT,
  category VARCHAR,
  budget_id INTEGER NOT NULL,
  FOREIGN KEY (budget_id) REFERENCES budgets(id)
);

-- Create incomes_actual table
CREATE TABLE IF NOT EXISTS incomes_actual (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR NOT NULL,
  date_posted TIMESTAMP,
  amount FLOAT,
  category VARCHAR,
  budget_id INTEGER NOT NULL,
  FOREIGN KEY (budget_id) REFERENCES budgets(id)
);

-- Create expenses_predicted table
CREATE TABLE IF NOT EXISTS expenses_predicted (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR NOT NULL,
  date_posted TIMESTAMP,
  amount FLOAT,
  category VARCHAR,
  budget_id INTEGER NOT NULL,
  FOREIGN KEY (budget_id) REFERENCES budgets(id)
);

-- Create incomes_predicted table
CREATE TABLE IF NOT EXISTS incomes_predicted (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR NOT NULL,
  date_posted TIMESTAMP,
  amount FLOAT,
  category VARCHAR,
  budget_id INTEGER NOT NULL,
  FOREIGN KEY (budget_id) REFERENCES budgets(id)
);

-- Create incomes_recurrent table
CREATE TABLE IF NOT EXISTS incomes_recurrent (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR NOT NULL,
  date_posted TIMESTAMP,
  amount FLOAT,
  category VARCHAR
  );

-- Create expenses_recurrent table
CREATE TABLE IF NOT EXISTS expenses_recurrent (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR NOT NULL,
  date_posted TIMESTAMP,
  amount FLOAT,
  category VARCHAR
);

-- Add additional references
-- ALTER TABLE expenses_recurrent
-- ADD CONSTRAINT fk_expenses_actual FOREIGN KEY (id) REFERENCES expenses_actual(id);
--
-- ALTER TABLE expenses_recurrent
-- ADD CONSTRAINT fk_expenses_predicted FOREIGN KEY (id) REFERENCES expenses_predicted(id);
--
-- ALTER TABLE incomes_recurrent
-- ADD CONSTRAINT fk_incomes_actual FOREIGN KEY (id) REFERENCES incomes_actual(id);
--
-- ALTER TABLE incomes_recurrent
-- ADD CONSTRAINT fk_incomes_predicted FOREIGN KEY (id) REFERENCES incomes_predicted(id);