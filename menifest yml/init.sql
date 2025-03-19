CREATE TABLE expense (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount NUMERIC NOT NULL,
    category VARCHAR(50) NOT NULL
);
