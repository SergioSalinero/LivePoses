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


CREATE TABLE `liveposes`.`public_routines` (
	id INT AUTO_INCREMENT PRIMARY KEY,
    exercises JSON    NOT NULL,
    breakTime   INT NOT NULL,
    description varchar(1000),
    category varchar(50) NOT NULL
);


CREATE TABLE `liveposes`.`statistics`(
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    date   DATETIME DEFAULT    CURRENT_TIMESTAMP,
    trainingTime    INT DEFAULT 0,
    routines    INT DEFAULT 0,
    calories    FLOAT   DEFAULT 0.0,
    FOREIGN KEY (userId) REFERENCES users(id)
);



INSERT INTO start_signal (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, rightKeyPointDistance1, rightKeyPointDistance2, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, leftKeyPointDistance1, leftKeyPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType)
VALUES ('Señal inicio', 12, 14, 16, 12, 14, 11, 13, 15, 11, 13, 90, 55, 25, 0, 'both');

INSERT INTO liveposes.exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType, src)
VALUES ('Front leg raise', 12, 24, 26, 11, 23, 25, 60, 40, 20, 0, 'only_angles', '/_next/static/media/FrontLegRaise.5ac6d4f9.gif');

INSERT INTO liveposes.exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, rightKeyPointDistance1, rightKeyPointDistance2, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, leftKeyPointDistance1, leftKeyPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType, src)
VALUES ('Lunges', 24, 26, 28, 24, 26, 23, 25, 27, 23, 25, 90, 55, 25, 0, 'both', '/_next/static/media/Lunges.a27f9d74.gif');

INSERT INTO liveposes.exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, rightKeyPointDistance1, rightKeyPointDistance2, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, leftKeyPointDistance1, leftKeyPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType, src)
VALUES ('Hamstrings', 12, 24, 26, 16, 26, 11, 23, 25, 15, 25, 90, 70, 20, 0, 'both', '/_next/static/media/Hamstrings.51f1324a.gif');

INSERT INTO liveposes.exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType, src)
VALUES ('Tiryak tasadan', 12, 24, 26, 11, 23, 25, 25, 15, 10, 0, 'only_angles', '/_next/static/media/TiryakTasadan.4908e6c3.gif');

INSERT INTO liveposes.exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, rightKeyPointDistance1, rightKeyPointDistance2, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, leftKeyPointDistance1, leftKeyPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType, src)
VALUES ('Biceps curl', 12, 14, 16, 14, 16, 11, 13, 15, 13, 15, 90, 40, 20, 0, 'both', '/_next/static/media/PullUps.99274066.gif');

INSERT INTO liveposes.exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, rightKeyPointDistance1, rightKeyPointDistance2, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, leftKeyPointDistance1, leftKeyPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType, src)
VALUES ('Pull ups', 12, 14, 16, 16, 10, 11, 13, 15, 15, 9, 90, 40, 20, 0, 'both', '/_next/static/media/BicepsCurl.449b5c5f.gif');

INSERT INTO liveposes.exercises (name, rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, rightKeyPointDistance1, rightKeyPointDistance2, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, leftKeyPointDistance1, leftKeyPointDistance2, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType, src)
VALUES ('Standing crunch', 24, 26, 28, 26, 29, 23, 25, 27, 25, 30, 30, 40, 20, 0, 'both', '/_next/static/media/StandingCrunch.07dc2eb3.gif');


