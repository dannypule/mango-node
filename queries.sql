CREATE TABLE USERS (
   id SERIAL PRIMARY KEY,
   first_name VARCHAR(50) NULL,
   last_name VARCHAR(50) NULL,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   email VARCHAR(50) NULL,
   date_created TIMESTAMP NOT NULL,
   date_updated TIMESTAMP NOT NULL
);


INSERT INTO users(username, password, date_created, date_updated)
VALUES
 ('foo', 'bar', '2017-10-24T16:31:02.349Z', '2017-10-24T16:31:02.349Z');

select * from users;