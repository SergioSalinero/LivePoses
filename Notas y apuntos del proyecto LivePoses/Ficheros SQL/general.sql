CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rightKeyPoint1 INT,
    rightKeyPoint2 INT,
    rightKeyPoint3 INT,
    leftKeyPoint1 INT,
    leftKeyPoint2 INT,
    leftKeyPoint3 INT,
    upperAngleMax INT,
    upperAngleMin INT,
    lowerAngleMax INT,
    lowerAngleMin INT,
    recognitionType VARCHAR(50) NOT NULL
);


-- First standing exercise configuration
INSERT INTO exercises (rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin, recognitionType)
VALUES (11, 23, 25, 12, 24, 26, 40, 15, 15, 0, 'only_angles');
