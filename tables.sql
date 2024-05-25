-- Example database & table create statements

CREATE DATABASE VERSO;

CREATE TABLE tomangisensor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Time DATETIME NOT NULL,
    Temperature FLOAT NOT NULL,
    Humidity FLOAT NOT NULL,
    DewPoint FLOAT NOT NULL,
    Pressure FLOAT NOT NULL,
    Gas INT NOT NULL,
    GrdMoisture INT NOT NULL
);
