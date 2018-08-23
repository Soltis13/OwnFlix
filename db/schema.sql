CREATE DATABASE ownflix;

CREATE TABLE users
(
   id INT NOT NULL AUTO_INCREMENT,
   user_first_name VARCHAR (55) NOT NULL,
   user_last_name VARCHAR (55) NOT NUll,
   user_email VARCHAR (55) NOT NULL,
   user_address VARCHAR (255),
   user_city VARCHAR (55),
   user_state VARCHAR (55),
   user_zip INT,
   user_password VARCHAR (55),
   PRIMARY KEY (id)
);