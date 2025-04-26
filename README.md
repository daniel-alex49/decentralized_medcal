 # Decentralized Clinic App

## Overview
The Decentralized Clinic App is a Web3 platform designed to connect patients and doctors while ensuring privacy, security, and transparency through the power of blockchain technology. The app offers decentralized identity management, secure and immutable prescriptions, AI-powered doctor searches, and more, all facilitated using our custom **HTK token**. The goal is to revolutionize the healthcare space by offering trustless, transparent interactions between patients and healthcare professionals.

- `Traditional healthcare systems` have long been plagued by a variety of critical issues, which not only hinder the efficiency of the system but also compromise the security and accessibility of patient care. Some of these challenges include:

- `Data Privacy Concerns`: Centralized medical records are vulnerable to data breaches, identity theft, and unauthorized access. Patients often have little control over who accesses their sensitive health information.

- `Centralization of Patient Records`: Healthcare providers maintain fragmented and siloed records, making it difficult for patients to access their medical history across different providers or regions. This leads to inefficiencies, errors, and delays in treatment.

- `High Transaction Fees`: Traditional healthcare systems often involve intermediaries such as insurance companies, leading to increased administrative costs and high transaction fees. This makes healthcare less affordable and accessible, particularly in regions with limited resources.

- `Limited Accessibility:` In certain parts of the world, especially in remote areas, access to healthcare services is limited due to geographic, economic, and infrastructural constraints. Patients in these areas may face difficulties in obtaining timely care.
Our solution seeks to address these pressing issues by leveraging blockchain technology and machine learning (ML) to create a more secure, efficient, and accessible healthcare experience. The key benefits of our system include:

- `Fully Anonymous Patient-Doctor Interactions`: Through the use of blockchain, patients can interact with healthcare providers without revealing their identities. This ensures privacy, reducing the risks of data breaches and identity theft while maintaining the integrity of medical consultations.

- `Immutable Medical Records`: All patient records are stored on the blockchain, ensuring they are immutable, transparent, and tamper-proof. This guarantees that patient history, diagnoses, and treatment plans are always up-to-date and accessible to both patients and doctors, wherever they may be.

- `Tokenized Transactions`: We introduce a tokenized economy within the healthcare system, allowing patients to pay for services in cryptocurrency or tokens, reducing transaction fees and streamlining payments. This also opens up the possibility of faster cross-border payments and enhances the overall efficiency of financial transactions.

- `Automated Processes with Machine Learning`: By integrating machine learning models, our system automates various tasks such as appointment scheduling, patient record management, and treatment recommendations. This reduces administrative overhead for doctors, allowing them to focus more on patient care while providing an enhanced experience to patients through personalized recommendations and streamlined workflows.

- `Enhanced Accessibility`: Blockchain-based solutions ensure that healthcare services can be delivered securely to patients across geographic boundaries. By removing intermediaries and centralizing records, we can increase the accessibility of care, even in remote or underserved regions.

In essence, our platform is a holistic solution that not only addresses the key pain points in traditional healthcare systems but also creates an efficient, scalable, and secure ecosystem for patient care, while also providing a seamless user experience powered by blockchain and ML technologies.

## Target Audience
- **High-Profile patients** who wish to keep their medical history and record secret so that it does not get leaked to the outside world, also wishes to keep their identity anonymous from the doctors.
- **Tech-savvy patients** who prioritize privacy and control over their personal medical data.
- **Doctors** seeking a transparent and secure method for managing their practices and interacting with patients.
- **Web3 enthusiasts** interested in decentralized applications (dApps) and healthcare innovations.
- **Healthcare providers** in regions lacking efficient, secure, or transparent healthcare systems.
- **Anyone in genral** who wishes to keep their identity and profile secret from their healthcare providers due to personal reasons or termianl illnesses.


## Why Blockchain?
- **Privacy and Anonymity**: Blockchain enables **decentralized identity (DID)**, ensuring that patients and doctors can register and interact anonymously, keeping personal data private and secure.
- **Immutable Records**: By storing prescriptions and medical data on the blockchain, we ensure that patient records are **immutable** and **transparent**, which enhances trust and accountability.
- **Tokenized Payments**: Payments between patients and doctors are made using **HTK tokens**, ensuring fast, secure, and trustless transactions. The tokenized system eliminates intermediaries, offering a lower-cost solution for both parties.

## Key Features

### 1. **Decentralized Identity Management**
Blockchain-based **decentralized identities** (DID) allow patients and doctors to securely register without compromising their privacy. This feature ensures that sensitive data is always under the user’s control and not stored on a centralized server.

### 2. **Appointment Booking and Payments**
Patients can easily book appointments with doctors through the app. Payments are made in **HTK tokens** (100 HTK = 1 ETH), providing a transparent and secure method for financial transactions within the healthcare ecosystem.

### 3. **Immutable Prescriptions**
Doctors can issue **immutable prescriptions** stored on the blockchain, preventing any tampering or fraud. This ensures that the prescriptions are secure, transparent, and can be accessed at any time by the patient or authorized medical professionals.

### 4. **AI-Driven Search**
The app integrates **AI-driven search** capabilities, allowing patients to find doctors based on their specific needs and health concerns through text-based queries. The **GenAI** integration helps patients gain insights into diseases and symptoms, improving the overall healthcare experience.

## Technical Architecture

### **Backend**
- **Blockchain**: Ethereum, using smart contracts for identity management, appointment scheduling, and token transactions.
- **Smart Contracts**: To facilitate the issuance of the **HTK token**, manage appointments, and handle prescription records.
- **Database**: PostgreSQL for user metadata and MongoDB for non-sensitive information.
- **AI Integration**: GenAI for disease insights and AI-powered doctor recommendations.

### **Frontend**
- **Framework**: React.js integrated with **Web3.js** for blockchain interactions, providing a smooth user experience for both patients and doctors.
- **UI**: A modern and responsive user interface designed for intuitive navigation.

### **Security and Verification**
- **Auth0**: Used for **secure authentication** and user login, ensuring that only verified users can interact with the app.
- **Data Encryption**: All sensitive data shared between users and the blockchain is encrypted to ensure security and privacy.

## Challenges We Ran Into
- **Scalability**: Initially, we faced challenges with **blockchain transaction speeds** and high **gas fees** on Ethereum. We overcame this by optimizing smart contracts and exploring layer 2 solutions.
- **Data Privacy Compliance**: Maintaining **compliance with healthcare data privacy regulations** while ensuring the decentralized nature of the app was a significant challenge, but we addressed this through anonymization and consent management protocols.
- **AI Integration**: **AI model accuracy** was a critical factor in providing reliable health information. Ensuring real-time AI recommendations for both patients and doctors was a complex problem, but we utilized continuous learning to improve the model.

## Why Choose Our Platform?
- **Decentralized Identity Management**: Full control over personal data and interactions, with no reliance on centralized entities.
- **Immutable and Transparent Records**: Blockchain guarantees that all medical records and prescriptions are tamper-proof, promoting trust in the healthcare system.
- **Tokenized Payments**: Efficient, low-cost, and transparent payments through **HTK tokens**, providing a seamless experience for both patients and doctors.
- **AI-Enhanced Healthcare**: The integration of **AI** for doctor recommendations and disease insights offers personalized and accessible healthcare information.


# **Project Setup**

 **PostgreSQL** and **MongoDB** databases. The services are managed using **Docker** and **Docker Compose**.

## **Prerequisites**
Before starting, ensure that you have the following installed:

- **Docker** (Follow the installation steps below if Docker is not installed on your system)
- **Docker Compose** (Comes with Docker Desktop for Windows/Mac. If you're on Linux, you may need to install it separately.)

### **Installing Docker**

#### **On macOS**
1. **Download Docker for Mac**:
   - Go to [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop) and download the `.dmg` file.
   - Once downloaded, open the `.dmg` file and drag the Docker icon to the Applications folder.
2. **Install Docker**:
   - Open Docker from your Applications folder.
3. **Verify Installation**:
   - Open your terminal and run:
     ```bash
     docker --version
     ```
   - This will show the installed version of Docker.

#### **On Windows**
1. **Download Docker for Windows**:
   - Go to [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop) and download the installer.
2. **Install Docker**:
   - Run the installer and follow the on-screen instructions.
   - You may need to enable WSL 2 during installation.
3. **Verify Installation**:
   - Open PowerShell or Command Prompt and run:
     ```bash
     docker --version
     ```

#### **On Linux (Ubuntu/Debian)**
1. **Install Docker**:
   - Open your terminal and run:
     ```bash
     sudo apt update
     sudo apt install docker.io
     ```
2. **Enable Docker**:
   ```bash
   sudo systemctl enable --now docker
   ```

**Running the Services**
```bash
docker-compose up -d
docker ps
```


**Setup the env file in correspondence to the env.example file**

```bash
# -----------------------------------------------------------------------------
# App
# -----------------------------------------------------------------------------
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# -----------------------------------------------------------------------------
# Authentication (NextAuth.js)
# -----------------------------------------------------------------------------
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

# -----------------------------------------------------------------------------
# Database (MySQL - PlanetScale)
# -----------------------------------------------------------------------------
DATABASE_URL=""
MONGODB_URI=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# -----------------------------------------------------------------------------
# Blockchain (Contract Addresses)
# -----------------------------------------------------------------------------
NEXT_PUBLIC_TOKEN_ADDRESS=""
NEXT_PUBLIC_CONTRACT_ADDRESS=""
```


## Roadmap
### **Next 6 Months**
- Complete smart contract deployment and refine tokenomics for better user interaction.
- Expand beta testing to include more doctors and patients.
- Implement AI-driven disease insights and recommendation features.
  
### **Beyond 6 Months**
- Expand to additional regions and healthcare providers.
- Integrate telemedicine features for remote consultations.
- Introduce **more AI-powered analytics** to predict and diagnose healthcare conditions.

## Go to Market Strategy
- **Partnerships**: Collaborate with blockchain-based healthcare platforms to enhance interoperability and build credibility.
- **Community Building**: Leverage **social media** and **influencers** in the Web3 and healthcare spaces to spread awareness.
- **Token Incentives**: Offer **HTK token rewards** for early adopters and users who contribute to building the platform's ecosystem.

## Competitor Analysis
While there are other blockchain-based healthcare platforms, such as **Healthereum**, **Solve.Care**, and **Medicalchain**, our platform stands out by offering a fully decentralized ecosystem that focuses on **anonymity** and **user control**. By using **AI for doctor search** and **disease insights**, and providing a **tokenized payment** system, our app brings innovative features to the Web3 healthcare space.

## License
Distributed under the MIT License. See `LICENSE` for more information.


## **Important Links**

- **[Live Deployment Link](https://veil-app.vercel.app/)**  
  Visit the live version of the website deployed on Vercel.


## Contact
For support or inquiries, please contact us at [](rohansen856@gmail.com).

## Acknowledgements
- **Auth0**: For secure authentication solutions.
- **GenAI**: For providing AI-driven healthcare insights.
- **Ethereum**: For the underlying blockchain technology that powers the platform.
