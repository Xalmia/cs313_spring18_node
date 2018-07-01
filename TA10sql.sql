CREATE TABLE person (
    id SERIAL UNIQUE,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    birth_date DATE
);

CREATE TABLE parent_child (
    father_id_fk INTEGER REFERENCES person(id),
    mother_id_fk INTEGER REFERENCES person(id),
    child_id_fk INTEGER REFERENCES person(id)
);