CREATE DATABASE accounts_app;
USE accounts_app;

CREATE TABLE accounts (
    accountID integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(10) NOT NULL,
    password VARCHAR(25) NOT NULL
);