-- Your SQL goes here
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  complete BOOLEAN NOT NULL DEFAULT 'f'
)