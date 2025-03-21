package com.liveposesdb.main.model;

public class Exercise {

	private int id;
	private String name;
	private int rightKeyPoint1;
	private int rightKeyPoint2;
	private int rightKeyPoint3;
	private int rightKeyPointDistance1;
	private int rightKeyPointDistance2;
	private int leftKeyPoint1;
	private int leftKeyPoint2;
	private int leftKeyPoint3;
	private int leftKeyPointDistance1;
	private int leftKeyPointDistance2;

	private int upperAngleMax;
	private int upperAngleMin;
	private int lowerAngleMax;
	private int lowerAngleMin;

	private String recognitionType;

	private String src;

	/* CONSTRUCTORS */
	public Exercise(int id, String name, int rightKeyPoint1, int rightKeyPoint2, int rightKeyPoint3,
			int rightKeyPointDistance1, int rightKeyPointDistance2, int leftKeyPoint1, int leftKeyPoint2,
			int leftKeyPoint3, int leftKeyPointDistance1, int leftKeyPointDistance2, int upperAngleMax,
			int upperAngleMin, int lowerAngleMax, int lowerAngleMin, String recognitionType, String src) {
		super();
		this.id = id;
		this.name = name;
		this.rightKeyPoint1 = rightKeyPoint1;
		this.rightKeyPoint2 = rightKeyPoint2;
		this.rightKeyPoint3 = rightKeyPoint3;
		this.rightKeyPointDistance1 = rightKeyPointDistance1;
		this.rightKeyPointDistance2 = rightKeyPointDistance2;
		this.leftKeyPoint1 = leftKeyPoint1;
		this.leftKeyPoint2 = leftKeyPoint2;
		this.leftKeyPoint3 = leftKeyPoint3;
		this.leftKeyPointDistance1 = leftKeyPointDistance1;
		this.leftKeyPointDistance2 = leftKeyPointDistance2;
		this.upperAngleMax = upperAngleMax;
		this.upperAngleMin = upperAngleMin;
		this.lowerAngleMax = lowerAngleMax;
		this.lowerAngleMin = lowerAngleMin;
		this.recognitionType = recognitionType;
		this.src = src;
	}

	public Exercise() {
		this.id = -1;
		this.name = "UNKNOWN";
		this.rightKeyPoint1 = -1;
		this.rightKeyPoint2 = -1;
		this.rightKeyPoint3 = -1;
		this.leftKeyPoint1 = -1;
		this.leftKeyPoint2 = -1;
		this.leftKeyPoint3 = -1;
		this.upperAngleMax = -1;
		this.upperAngleMin = -1;
		this.lowerAngleMax = -1;
		this.lowerAngleMin = -1;
		this.recognitionType = "UNKNOWN";
		this.src = "UNKNOWN";
	}

	/* GETTERS AND SETTERS */
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getRightKeyPoint1() {
		return rightKeyPoint1;
	}

	public void setRightKeyPoint1(int rightKeyPoint1) {
		this.rightKeyPoint1 = rightKeyPoint1;
	}

	public int getRightKeyPoint2() {
		return rightKeyPoint2;
	}

	public void setRightKeyPoint2(int rightKeyPoint2) {
		this.rightKeyPoint2 = rightKeyPoint2;
	}

	public int getRightKeyPoint3() {
		return rightKeyPoint3;
	}

	public void setRightKeyPoint3(int rightKeyPoint3) {
		this.rightKeyPoint3 = rightKeyPoint3;
	}

	public int getRightKeyPointDistance1() {
		return rightKeyPointDistance1;
	}

	public void setRightKeyPointDistance1(int rightKeyPointDistance1) {
		this.rightKeyPointDistance1 = rightKeyPointDistance1;
	}

	public int getRightKeyPointDistance2() {
		return rightKeyPointDistance2;
	}

	public void setRightKeyPointDistance2(int rightKeyPointDistance2) {
		this.rightKeyPointDistance2 = rightKeyPointDistance2;
	}

	public int getLeftKeyPoint1() {
		return leftKeyPoint1;
	}

	public void setLeftKeyPoint1(int leftKeyPoint1) {
		this.leftKeyPoint1 = leftKeyPoint1;
	}

	public int getLeftKeyPoint2() {
		return leftKeyPoint2;
	}

	public void setLeftKeyPoint2(int leftKeyPoint2) {
		this.leftKeyPoint2 = leftKeyPoint2;
	}

	public int getLeftKeyPoint3() {
		return leftKeyPoint3;
	}

	public int getLeftKeyPointDistance1() {
		return leftKeyPointDistance1;
	}

	public void setLeftKeyPointDistance1(int leftKeyPointDistance1) {
		this.leftKeyPointDistance1 = leftKeyPointDistance1;
	}

	public int getLeftKeyPointDistance2() {
		return leftKeyPointDistance2;
	}

	public void setLeftKeyPointDistance2(int leftKeyPointDistance2) {
		this.leftKeyPointDistance2 = leftKeyPointDistance2;
	}

	public void setLeftKeyPoint3(int leftKeyPoint3) {
		this.leftKeyPoint3 = leftKeyPoint3;
	}

	public int getUpperAngleMax() {
		return upperAngleMax;
	}

	public void setUpperAngleMax(int upperAngleMax) {
		this.upperAngleMax = upperAngleMax;
	}

	public int getUpperAngleMin() {
		return upperAngleMin;
	}

	public void setUpperAngleMin(int upperAngleMin) {
		this.upperAngleMin = upperAngleMin;
	}

	public int getLowerAngleMax() {
		return lowerAngleMax;
	}

	public void setLowerAngleMax(int lowerAngleMax) {
		this.lowerAngleMax = lowerAngleMax;
	}

	public int getLowerAngleMin() {
		return lowerAngleMin;
	}

	public void setLowerAngleMin(int lowerAngleMin) {
		this.lowerAngleMin = lowerAngleMin;
	}

	public String getRecognitionType() {
		return recognitionType;
	}

	public void setRecognitionType(String recognitionType) {
		this.recognitionType = recognitionType;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

}
