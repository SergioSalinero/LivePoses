--mysql -u tu_usuario -p tu_base_de_datos < create_table.sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(1000)
);


CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25),
    rightKeyPoint1 INT,
    rightKeyPoint2 INT,
    rightKeyPoint3 INT,
    rightKeyPointDistance1 INT,
    rightKeyPointDistance2 INT,
    leftKeyPoint1 INT,
    leftKeyPoint2 INT,
    leftKeyPoint3 INT,
    leftKeyPointDistance1 INT,
    leftKeyPointDistance2 INT,
    upperAngleMax INT,
    upperAngleMin INT,
    lowerAngleMax INT,
    lowerAngleMin INT,
    recognitionType VARCHAR(50) NOT NULL
);


CREATE TABLE `liveposes`.`current_routine` (
	id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    exercises JSON    NOT NULL,
    breakTime   INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);



-- First standing exercise configuration
INSERT INTO exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType)
VALUES ('Pierna frontal', 12, 24, 26, 11, 23, 25, 60, 40, 20, 0, 'only_angles');

INSERT INTO exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, rightKeyPointDistance1, rightKeyPointDistance2, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, leftKeyPointDistance1, leftKeyPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType)
VALUES ('Sentadillas Lunge', 24, 26, 28, 24, 26, 23, 25, 27, 23, 25, 90, 55, 25, 0, 'both');
