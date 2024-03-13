CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  usernumber INT NOT NULL,
  password VARCHAR(100) NOT NULL,
  firstname VARCHAR(20) NOT NULL,
  middlename VARCHAR(20) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  postnumber INT NOT NULL,
  city VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  homebank VARCHAR(50) NOT NULL,
  UNIQUE (usernumber)
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  creationdate DATE NOT NULL,
  name VARCHAR(50) NOT NULL,
  balance FLOAT NOT NULL, 
  balancelimit INT, 
  userid INT NOT NULL REFERENCES users
);

CREATE TABLE messages
(
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  read BOOLEAN NOT NULL,
  title VARCHAR(50) NOT NULL,
  message VARCHAR(1000) NOT NULL,
  userid INT NOT NULL REFERENCES users
);

CREATE TABLE transactions
(
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  transactiontype VARCHAR(20) NOT NULL,
  transactioner VARCHAR(50) NOT NULL,
  transaction FLOAT NOT NULL,
  pending BOOLEAN NOT NULL,
  target VARCHAR(50),
  message VARCHAR(500),
  reference INTEGER,
  accountid INT NOT NULL REFERENCES accounts
);

insert into users (usernumber, password, firstname, middlename, lastname, address, postnumber, city, email, phone, homebank) values (155010, 'cdk51dhh', 'Markku', 'Tapio', 'Vaara', 'Kullerovuorentie 22 B 9', 80000, 'Fingerpori', 'markku.vaara72@customer.com', '0500 111 222', 'Fingerporin Monetarum');

insert into accounts (creationdate, name, balance, balancelimit, userid) values ('11/05/2023', 'KÄYTTÖTILI 1009004555', 590.45, null, 1);
insert into accounts (creationdate, name, balance, balancelimit, userid) values ('11/05/2023', 'SÄÄSTÖTILI 1009004577', 1010, null, 1);
insert into accounts (creationdate, name, balance, balancelimit, userid) values ('11/15/2023', 'LAINATILI 1008001110', -2915, -3000, 1);

insert into transactions (date, transactiontype, transactioner, transaction, pending, accountid) values ('11/19/2023', 'shop', 'K-Citymarket', -22, false, 1);
insert into transactions (date, transactiontype, transactioner, transaction, pending, accountid) values ('11/18/2023', 'unknown', 'Punttipojat', -160, false, 1);
insert into transactions (date, transactiontype, transactioner, transaction, pending, accountid) values ('11/17/2023', 'loan', 'Monetarum opintolaina', -100, false, 1);
insert into transactions (date, transactiontype, transactioner, transaction, pending, accountid) values ('11/10/2023', 'gov', 'KELA', 1100, false, 1);
insert into transactions (date, transactiontype, transactioner, transaction, pending, message, accountid) values ('10/30/2023', 'unknown', 'Markku Vaara', 500, false, 'Rahaa säästöön', 2);

insert into messages (date, read, title, message, userid) values ('01/01/2024', false, 'Tervetuloa', 'Tervetuloa, uusi asiakas. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Et malesuada fames ac turpis egestas integer eget. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Integer feugiat scelerisque varius morbi enim nunc.', 1);

