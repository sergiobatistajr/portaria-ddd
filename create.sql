create schema portaria
create table portaria.user (
    id uuid,
    name text,
    email text,
    status text,
    role text,
    password text
)
create table portaria.guest (
    id uuid,
    name text,
    entryDate timestamp,
    plate text,
    model text,
    pax numeric,
    apartment numeric,
    createdBy uuid,
    observation text,
    departureDate timestamp,
    status text
)