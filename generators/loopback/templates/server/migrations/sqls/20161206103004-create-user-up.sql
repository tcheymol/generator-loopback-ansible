CREATE TYPE sex AS ENUM ('m', 'f', 'n');

CREATE TABLE "user" (
    id UUID PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    realm VARCHAR(255),
    username VARCHAR(20),
    email VARCHAR(50),
    emailverified BOOLEAN,
    password VARCHAR(255),
    credentials TEXT,
    challenges TEXT,
    verificationtoken VARCHAR(255),
    createdat TIMESTAMP WITH TIME ZONE,
    updatedat TIMESTAMP WITH TIME ZONE
);

CREATE TABLE accesstoken (
    id VARCHAR(255) PRIMARY KEY,
    ttl INTEGER,
    created TIMESTAMP WITH TIME ZONE,
    userid UUID REFERENCES "user"(id)
);

CREATE TABLE acl (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255),
    property VARCHAR(255),
    accesstype VARCHAR(255),
    permission VARCHAR(255),
    principaltype VARCHAR(255),
    principalid VARCHAR(255)
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created TIMESTAMP WITH TIME ZONE,
    modified TIMESTAMP WITH TIME ZONE
);

CREATE TABLE rolemapping (
    id SERIAL PRIMARY KEY,
    principaltype VARCHAR(255),
    principalid VARCHAR(255),
    roleid INTEGER REFERENCES role(id)
);
