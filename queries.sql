-- create the users table
CREATE TABLE Users (
   UserID SERIAL PRIMARY KEY,
   FirstName VARCHAR(50) NULL,
   LastName VARCHAR(50) NULL,
   Username VARCHAR(50) NOT NULL,
   Password VARCHAR(150) NOT NULL,
   Email VARCHAR(50) NULL,
   DateCreated TIMESTAMPTZ NOT NULL,
   DateUpdated TIMESTAMPTZ NOT NULL
);

-- insert a demo user
INSERT INTO users(Username, Password, DateCreated, DateUpdated)
VALUES
 ('demouser', '$2a$07$UFyTGTzoCEsoj3lPsyowH.RVR04Zox0E8VNFDsBiltJ2ijRTLbOCC', '2017-10-24 22:20:19.793', '2017-10-24 22:20:19.793');

-- view the demo user
select * from users;