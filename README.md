# LivePoses: Computer Vision-Based Exercise Monitoring Platform

## 📌 Project Overview
LivePoses is an innovative platform designed to enhance remote rehabilitation and mobility exercises through **computer vision**. Leveraging **Google's BlazePose** for real-time posture estimation, the system provides users with immediate feedback on exercise execution, ensuring proper form and reducing the risk of injury.

The platform enables **personalized exercise routines**, user activity tracking, and statistical insights, making it a valuable tool for physical rehabilitation, injury prevention, and overall fitness improvement.

## 🚀 Features
- **Real-time posture tracking** with BlazePose (MediaPipe & TensorFlow)
- **Personalized exercise routines**, created by users or healthcare professionals
- **Live feedback on exercise accuracy** to prevent incorrect movements
- **Routine sharing** for community collaboration
- **User activity tracking**, including training time, completed exercises, and estimated calorie burn
- **Secure user management system** with authentication
- **Scalable architecture** based on a microservices approach

## 🏗 System Architecture
The system is structured into three key subsystems:

### 1️⃣ **Frontend** (React.js)
The **Frontend** subsystem provides the user interface, built with **React.js**.

📂 **Key Directories:**
- `/app` – General project configurations, global styles, and platform icon
- `/pages` – Application pages, including authentication, routine management, and statistics
- `/components` – Reusable UI components
- `/libraries` – Core functionalities, including BlazePose integration
- `/utils` – Global configurations, such as color themes and API service access

📜 **Important Pages:**
- `Signup.js` / `Login.js` / `ForgotPassword.js` – User authentication
- `Home.js` – Dashboard with access to exercises, user profile, statistics, and history
- `PoseRecognition.js` – Loads BlazePose for real-time exercise tracking
- `RoutineBuilding.js` / `PublishRoutine.js` – Allows users to create and share exercise routines
- `Profile.js` – User information management
- `Statistics.js` – Displays user performance insights

### 2️⃣ **Backend** (Java + Spring Boot 4)
The **Backend** subsystem manages API requests and business logic, using **Java** with **Spring Boot 4** to create microservices.

📂 **Key Directories:**
- `/controller` – Handles API requests (Authentication, Exercises, Statistics, Users)
- `/model` – Defines data models
- `/services` – Implements business logic
- `/utils` – Utility functions (JWT authentication, email services, password encryption)

### 3️⃣ **Database** (SQL/NoSQL)
The **Data subsystem** ensures modularity, security, and scalability. It processes requests from the Backend and stores user information, statistics, and exercise data.

📂 **Key Directories:**
- `/model` – Data storage structures
- `/services` – Database query management
- `/utils/DBConnection.java` – Handles database connectivity and operations

## 🛠 Technologies Used
### **Frontend:**
- **React.js** – Component-based UI framework
- **JavaScript (ES6+)** – Core scripting language
- **BlazePose (MediaPipe)** – Real-time posture estimation
- **CSS** – Styling and layout management

### **Backend:**
- **Java 17** – Backend development
- **Spring Boot 4 (v3.2.4)** – REST API development
- **JWT Authentication** – Secure user access
- **Email Services** – Password recovery and notifications

### **Database:**
- **SQL & NoSQL** – Flexible storage solutions

## 📌 Installation & Setup
### **Frontend Setup**
```bash
# Clone repository
git clone https://github.com/yourusername/liveposes.git
cd liveposes

# Install dependencies
npm install

# Start React development server
npm run dev
```

### **Backend Setup**
```bash
# Open project in Eclipse 2024-03-R-linux
# Run Spring Boot application
mvn spring-boot:run
```

## 📜 License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

## 📧 Contact
For any inquiries, feel free to reach out via email or create an issue in this repository.


