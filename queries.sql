CREATE TABLE USERS (
   UserID SERIAL PRIMARY KEY,
   FirstName VARCHAR(50) NULL,
   LastName VARCHAR(50) NULL,
   Username VARCHAR(50) NOT NULL,
   Password VARCHAR(50) NOT NULL,
   Email VARCHAR(50) NULL,
   DateCreated TIMESTAMP NOT NULL,
   DateUpdated TIMESTAMP NOT NULL
);


INSERT INTO users(Username, Password, DateCreated, DateUpdated)
VALUES
 ('foo', 'bar', '2017-10-24T16:31:02.349Z', '2017-10-24T16:31:02.349Z');

select * from users;