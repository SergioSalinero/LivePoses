/**
 * Exercise Recognition Library
 * 
 * The Exercise Recognition Library is a comprehensive toolkit designed to facilitate the recognition and analysis of various exercises performed by
 * individuals. This library integrates an algorithm to accurately identify and classify a wide range of physical movments commonly encountered in
 * fitness, rehabilitation, sports training, and wellness applications.
 * 
 * An exercise has two parts, the upper and lower part. On the other hand, the human body has also two parts, right and left parts. Consequently,
 * the algorithm works calculating the distances between two articulations, the angle between two lines or both for each part of the exercise for
 * each part of human body. This way, if the exercise is executed correctly, the requirements of the distances and angles will be satisfied and the
 * repetition will be valid.
 */


/**
 * exerciseRecognitionByDistances FUNCTION:
 *      It determinates if a specific exercises repetition is valid by calculating distances between points.
 * 
 *      Given a human pose by the next parameters:
 *          RightKeyPoint1: Integer         First right human part articulation 
 *          RightKeyPoint2: Integer         Second right human part articulation
 *          LeftKeyPoint1: Integer          First left human part articulation
 *          LeftKeyPoint2: Integer          Second left human part articulation
 */
export function exerciseRecognitionByDistances(rightKeyPoint1, rightKeyPoint2, leftKeyPoint1, leftKeyPoint2) {

}


/**
 * exerciseRecognitionByAngles FUNCTION:
 *      It determinates if a specific exercises repetition is valid by calculating only angles between lines.
 * 
 *      Given a human pose by the next parameters:
  *         RightKeyPoint1: Integer         First right human part articulation 
 *          RightKeyPoint2: Integer         Second right human part articulation
 *          RightKeyPoint3: Integer         Third right human part articulation. It will be used to calculate angles
 *          LeftKeyPoint1: Integer          First left human part articulation
 *          LeftKeyPoint2: Integer          Second left human part articulation
 *          LeftKeyPoint3: Integer          Third left human part articulation. It will be used to calculate angles
 *          UpperAngleMax: Integer          Upper part of the exercise maximun allowed angle
 *          UpperAngleMin: Integer          Upper part of the exercise minimun allowed angle
 *          LowerAngleMax: Integer          Lower part of the exercise maximun allowed angle
 *          LowerAngleMin: Integer          Lower part of the exercise minimun allowed angle
 */
export function exerciseRecognitionByAngles(rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin) {

}


/**
 * exerciseRecognitionByAnglesAndDistances FUNCTION:
 *      It determinates if a specific exercises repetition is valid by calculating distances between points and angles between lines.
 * 
 *      Given a human pose by the next parameters:
  *          RightKeyPoint1: Integer         First right human part articulation 
 *          RightKeyPoint2: Integer         Second right human part articulation
 *          RightKeyPoint3: Integer         Third right human part articulation. It will be used to calculate angles
 *          LeftKeyPoint1: Integer          First left human part articulation
 *          LeftKeyPoint2: Integer          Second left human part articulation
 *          LeftKeyPoint3: Integer          Third left human part articulation. It will be used to calculate angles
 *          UpperAngleMax: Integer          Upper part of the exercise maximun allowed angle
 *          UpperAngleMin: Integer          Upper part of the exercise minimun allowed angle
 *          LowerAngleMax: Integer          Lower part of the exercise maximun allowed angle
 *          LowerAngleMin: Integer          Lower part of the exercise minimun allowed angle
 */
export function exerciseRecognitionByAnglesAndDistances(rightKeyPoint1, rightKeyPoint2, rightKeyPoint3, leftKeyPoint1, leftKeyPoint2, leftKeyPoint3, upperAngleMax, upperAngleMin, lowerAngleMax, lowerAngleMin) {

}


/**
 * calculateAngleBeweenTwoLines FUNCTION:
 *      Calculates the adjacent angle beween two lines that intersect at single point.
 *      The directing vectors will be calculated and the equations of the straight lines will be obtained from them.
 * 
 *      Three points are neccessary
 */
export function calculateAngleBetweenTwoLines(point1, point2, point3) {
    const vectorD1 = {
        x: point1.x - point2.x,
        y: point1.y - point2.y
    };

    const vectorD2 = {
        x: point3.x - point2.x,
        y: point3.y - point2.y
    };

    const den = Math.abs(vectorD1.x * vectorD2.x + vectorD1.y * vectorD2.y);
    const num = Math.sqrt(vectorD1.x * vectorD1.x + vectorD1.y * vectorD1.y) * Math.sqrt(vectorD2.x * vectorD2.x + vectorD2.y * vectorD2.y);

    return Math.acos(den / num) / (Math.PI / 180);
}


/**
 * QUITAR EL EXPORT DE LA FUNCIÓN calculateAngleBetweenTwoLines
 */