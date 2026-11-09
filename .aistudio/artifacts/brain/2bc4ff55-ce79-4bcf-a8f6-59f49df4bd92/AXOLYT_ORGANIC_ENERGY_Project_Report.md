# CH. BANSI LAL POLYTECHNIC, BHIWANI
## DEPARTMENT OF COMPUTER ENGINEERING
*(Affiliated to Haryana State Board of Technical Education, Panchkula)*

---

# A MAJOR PROJECT REPORT ON
# “AXOLYT ORGANIC ENERGY”
### A Modern Cloud-Native Botanical E-Commerce & 5-Stage Cold-Chain Tracking Platform

**Submitted in partial fulfillment of the requirements for the award of**  
**DIPLOMA IN COMPUTER ENGINEERING**

---

### SUBMITTED TO:
**Ms. Pratibha Dhaiya**  
Lecturer & Project Guide  
Department of Computer Engineering  
Ch. Bansi Lal Polytechnic, Bhiwani

### SUBMITTED BY:
**Prince Kumar**  
Roll No: **240790825012**  
Diploma in Computer Engineering  
Final Year (6th Semester)

**ACADEMIC SESSION: 2026–2027**

---

## CERTIFICATE OF APPROVAL

This is to certify that the project entitled **"AXOLYT ORGANIC ENERGY — A Modern Cloud-Native Botanical E-Commerce & Supply-Chain Tracking Web Application"** has been successfully executed and submitted by **PRINCE KUMAR**, bearing **Roll No. 240790825012**, in partial fulfillment of the requirements for the award of the Diploma in Computer Engineering from **Ch. Bansi Lal Polytechnic, Bhiwani**, during the academic session 2026–2027.

This report reflects original, authentic, and high-quality software engineering work carried out under my direct supervision and guidance. The project incorporates modern enterprise web architectures including React 19, TypeScript, Tailwind CSS v4, Motion Physics, and Google Firebase Cloud Firestore with custom role-based security rules and order gating.

To the best of my knowledge and professional evaluation, this project report or any substantial part thereof has not been submitted to any other university, board, or institution for the award of any diploma, degree, or academic credential.

**Ms. Pratibha Dhaiya**  
Project Guide & Lecturer  
Dept. of Computer Engineering  
Ch. Bansi Lal Polytechnic, Bhiwani  

**Head of Department**  
Dept. of Computer Engineering  
Ch. Bansi Lal Polytechnic, Bhiwani  

**External Examiner**  
State Board of Technical Education, Haryana  

---

## CANDIDATE'S DECLARATION

I, **PRINCE KUMAR**, student of Diploma in Computer Engineering at **Ch. Bansi Lal Polytechnic, Bhiwani**, hereby solemnly declare that the project entitled **"AXOLYT ORGANIC ENERGY"** submitted to the Department of Computer Engineering is a record of original, authentic, and independent development work carried out by me under the supervision and guidance of **Ms. Pratibha Dhaiya**, Lecturer in Computer Engineering.

I confirm that:
1. **Authenticity of Implementation**: The entire source code, system architecture, database modeling, security rules, and user interfaces represent my authentic engineering effort and genuine system design.
2. **No Plagiarism**: The practical implementation and written report contain no plagiarized material from any other student project or unauthorized source.
3. **Real Integration**: All features detailed in this report, including Firebase Authentication, Firestore NoSQL database operations, Cold-chain supply tracking, and the Admin Command Center, are functional and operational.
4. **Compliance**: I have strictly adhered to the academic, ethical, and professional guidelines established by Ch. Bansi Lal Polytechnic and the State Board of Technical Education.

Date: 08 November 2026  
Place: Bhiwani, Haryana  

**Prince Kumar**  
Roll No: 240790825012  
Diploma in Computer Engineering  
Ch. Bansi Lal Polytechnic, Bhiwani  

---

## ACKNOWLEDGEMENT

The completion of any substantial engineering undertaking is enriched by the encouragement, technical guidance, and supportive environment provided by teachers, mentors, and academic institutions. I express my deepest gratitude to all individuals who have contributed to the success of the AXOLYT Organic Energy project.

First and foremost, I express my sincere and heartfelt gratitude to my esteemed project guide, **Ms. Pratibha Dhaiya**, Lecturer in the Department of Computer Engineering, for her invaluable mentorship, insightful technical suggestions, and continuous encouragement throughout the conception, architectural design, and coding of this project. Her meticulous attention to software engineering standards, user interface aesthetics, and security hardening helped elevate this application to an enterprise-grade standard.

I also extend my sincere thanks to the **Head of the Department of Computer Engineering** and all faculty members of the department for their academic guidance, constructive feedback during project reviews, and for establishing a collaborative educational atmosphere.

I am profoundly indebted to the **Principal and Administration of Ch. Bansi Lal Polytechnic, Bhiwani**, for providing the necessary infrastructural resources, computer lab facilities, and high-speed internet access that enabled continuous development and real-time cloud testing.

Lastly, I express my warm appreciation to my parents, family members, and friends whose patience, moral support, and motivation sustained my focus throughout this project.

**Prince Kumar**  
Roll No: 240790825012  

---

## ABSTRACT

In contemporary digital commerce, consumers increasingly demand full ingredient provenance, sustainable packaging, and transparent supply chains, particularly within the organic food and functional beverage industries. Traditional e-commerce platforms frequently fail to bridge the gap between premium brand storytelling, real-time logistics transparency, and strict data security.

This project presents **AXOLYT ORGANIC ENERGY**, an enterprise-grade, full-stack Single Page Application (SPA) designed to deliver an elevated e-commerce experience for cold-pressed, adaptogenic, and plant-based energy beverages. Developed using **React 19, TypeScript, Tailwind CSS v4, and Google Firebase Cloud Firestore**, the platform unites modern sensory web design with rigorous cloud data security.

### Key Technical Achievements:
- **Strict Authentication Gating**: Enforces zero guest checkouts by automatically preserving uncompleted shopping sessions and launching the authentication portal, preventing orphaned transactions.
- **Real-Time Supply Chain Tracking**: Features an interactive 5-stage cold-chain delivery tracker (Confirmed -> Chilled Packaging -> Clean Line-Haul -> Local Route -> Doorstep Verification) with live step progression.
- **Full-Featured Admin Command Center**: Equips store administrators with real-time analytics, order lifecycle management with deletion permissions, multi-flavor inventory monitoring, and live store banner announcements.
- **3D Kinetic Botanical Physics**: Implements custom interactive tilt-shift cards utilizing Motion 12 spring mechanics, inverted parallax textures, and specular light sheen.
- **Cloud Firestore RBAC Security**: Enforces strict collection-level rules preventing cross-user data leaks and restricting administrative mutations to authenticated master accounts.

---

## TABLE OF CONTENTS

- Certificate of Approval
- Candidate's Declaration
- Acknowledgement
- Abstract
- List of Figures & Tables
- **Chapter 1**: Introduction & Project Overview
- **Chapter 2**: Problem Statement, Objectives & Feasibility Study
- **Chapter 3**: Scope of the Project
- **Chapter 4**: Hardware & Software Requirements
- **Chapter 5**: Technologies Used — Frontend Engineering & Cloud Architecture
- **Chapter 6**: System Analysis & Software Requirements Specification (SRS)
- **Chapter 7**: System Architecture & Component Design
- **Chapter 8**: Database Design & Cloud Security Rules (RBAC)
- **Chapter 9**: Data Flow Diagrams (DFD Level 0 & Level 1) & Use Cases
- **Chapter 10**: Website Modules & Core Feature Breakdown
- **Chapter 11**: Implementation & Application Screenshots
- **Chapter 12**: Software Testing & Comprehensive Test Cases Matrix
- **Chapter 13**: Platform Advantages & Technical Limitations
- **Chapter 14**: Future Scope & Planned Enhancements
- **Chapter 15**: Conclusion & Academic Learnings
- References & Bibliography

---

## CHAPTER 1: INTRODUCTION

### 1.1 Project Background and Motivation
The global energy drink marketplace has traditionally been dominated by mass-market formulations characterized by high concentrations of synthetic caffeine, refined crystalline sugars, artificial colorings, and chemical stimulants. While these beverages provide transient energy spikes, clinical nutrition research demonstrates that they frequently induce severe post-consumption hypoglycemic fatigue ("sugar crash"), cardiac palpitations, and endocrine stress.

In response, a growing demographic of health-conscious professionals, collegiate scholars, endurance athletes, and wellness consumers are actively transitioning to clean-label, certified organic alternatives. AXOLYT ORGANIC ENERGY was formulated as an answer to this lifestyle shift, utilizing cold-pressed plant essences, organic Japanese ceremonial matcha, high-altitude yerba mate, and cognitive adaptogens like L-Theanine and Lion’s Mane.

### 1.2 Purpose of the Digital Application
An exceptional physical product requires an equally innovative digital platform. The AXOLYT web application was conceived not merely as a transactional storefront, but as an immersive sensory commerce experience. Developed by Prince Kumar at Ch. Bansi Lal Polytechnic, the platform demonstrates how contemporary web engineering can eliminate friction from modern consumer journeys while maintaining strict data isolation and real-time synchronization.

---

## CHAPTER 2: PROBLEM STATEMENT & OBJECTIVES

### 2.1 Problem Statement
Traditional beverage e-commerce websites exhibit three pervasive operational and architectural shortcomings:
1. **Impersonal & Flat Visual Presentation**: Static 2D grids neglect brand storytelling, botanical sensory immersion, and tactile micro-interactions.
2. **Logistical Opacity**: Conventional tracking fails to give visibility into cold-chain preservation.
3. **Insecure Guest Checkout Leaks**: Fragmented customer records and inability to enforce verified delivery histories.

### 2.2 Project Objectives
1. **Immersive Sensory UI**: Build a modern dark-forest botanical interface with 3D spring tilt physics, fluid navigation, and Web Audio nature sound synthesis.
2. **Gated Checkout Security**: Design an automated gatekeeper preserving uncompleted checkout states, forcing authentication before order commitment.
3. **Real-Time Logistics Tracking**: Implement an interactive 5-stage cold-chain tracker displaying order confirmation, chilling, transit, and doorstep delivery.
4. **Cloud-Native Data Persistence**: Deploy Google Firebase Cloud Firestore with hardened security rules for isolated subcollections and administrator RBAC.
5. **Operational Admin Command Center**: Empower administrators with order management, step progression, manual deletion, inventory tracking, and announcement banners.

---

## CHAPTER 3: SCOPE OF THE PROJECT

### 3.1 Functional Scope & Boundaries
The platform covers full end-to-end customer and administrative workflows:
- Customer Catalog & Cart Management (6 botanical formulations, Single vs 12-Pack, promo engine, free shipping threshold).
- Session-Preserving Authentication Gate (automatic detection of guest status, state hold, auto-resume).
- Interactive Cold-Chain Tracker (5 real-time stages, text invoice export).
- Administrative Oversight Hub (secured by master email `princeyadav391yadav@gmail.com`).

---

## CHAPTER 4: HARDWARE & SOFTWARE REQUIREMENTS

### Table 4.1: Hardware Requirements
| Component | Minimum Development Spec | Recommended Production Spec | Client Target Spec |
| :--- | :--- | :--- | :--- |
| **Processor (CPU)** | Dual-Core 2.0 GHz x64 | Quad-Core 2.8 GHz or Apple M-series | Modern ARM / x64 PC or Mobile |
| **Memory (RAM)** | 4.0 GB DDR4 | 8.0 GB - 16.0 GB DDR4/LPDDR5 | 2.0 GB RAM minimum |
| **Storage Space** | 10.0 GB Available SSD | 25.0 GB High-Speed NVMe SSD | 50 MB Browser Cache |
| **Display Resolution**| 1366 x 768 WXGA | 1920 x 1080 Full HD or Retina | 360px to 4K Ultra HD |
| **Network** | Broadband 2 Mbps | Fiber 10+ Mbps | 4G / 5G / Wi-Fi |

### Table 4.2: Software Requirements
| Layer / Tool | Package Name | Version | Role in AXOLYT Platform |
| :--- | :--- | :--- | :--- |
| **Operating System** | Ubuntu Linux / Windows 11 | LTS | Development & build hosting |
| **Runtime Engine** | Node.js | v22.23.2 | Execution & package management |
| **Frontend Framework**| React & React-DOM | v19.0.1 | Reactive component rendering |
| **Type System** | TypeScript | v7.0.2 | Compile-time static typing |
| **Bundler** | Vite | v8.3.0 | Hot Module Replacement & build |
| **Styling** | Tailwind CSS & @tailwindcss/vite | v4.3.3 | Utility-first modern styling |
| **Animation Engine** | Motion (Framer Motion) | v12.23.24 | 3D spring tilt physics |
| **Cloud Database** | Firebase Firestore & Auth | v13.2.0 | NoSQL persistence & OAuth identity |
| **Icon Library** | Lucide React | v0.546.0 | Scalable lightweight SVG icons |

---

## CHAPTER 5: TECHNOLOGIES USED

### 5.1 React 19 Frontend Library
Fine-grained reactivity, functional components, and hooks (`useState`, `useEffect`, `useRef`).

### 5.2 TypeScript 5.x Static Typing
Strict domain interfaces (`User`, `Product`, `CartItem`, `UserOrder`, `LogisticsStep`, `AppConfig`), preventing runtime bugs.

### 5.3 Tailwind CSS v4 Utility Styling
Direct `@import "tailwindcss"` integration, deep forest obsidian palette (`#051109`), emerald accents, and glassmorphic panels.

### 5.4 Motion 12 Spring Kinetic Animations
Interactive 3D tilt-shift cards with inverted parallax sheen and tactile button interactions.

### 5.5 Google Firebase Cloud Firestore
Document-oriented NoSQL model with live WebSocket updates and isolated user subcollections.

### 5.6 Web Audio API Synthetic Soundscape
Browser-synthesized nature waterfall sound generation utilizing procedural brownian noise and biquad filtering.

---

## CHAPTER 6: SYSTEM ANALYSIS & SRS

### Functional Requirements:
- **FR-01**: Catalog browsing with dynamic single ($3.49) vs 12-pack ($36.99) pricing.
- **FR-02**: Shopping cart with promo codes (`PUREENERGY` for 15% off) and free shipping calculator.
- **FR-03**: Gated authentication intercepting guest checkout.
- **FR-04**: Real-time order creation with unique tracking IDs.
- **FR-05**: 5-stage cold-chain tracker with invoice generation.
- **FR-06**: Admin management for order status, deletion, stock, and store banner.

### Non-Functional Requirements:
- **NFR-01**: Sub-1.2s DOM load time, 60 FPS transitions.
- **NFR-02**: Firestore collection-level security rules enforcing strict isolation.
- **NFR-03**: Fully responsive from 360px mobile to 4K desktop screens.
- **NFR-04**: 99.95% serverless cloud availability.

---

## CHAPTER 7: SYSTEM ARCHITECTURE

### Three-Tier Model:
1. **Tier 1: Presentation Layer (Client SPA)**: React 19, Tailwind CSS v4, Motion 12, Web Audio.
2. **Tier 2: Business Logic Layer**: Gated checkout interceptor, cold-chain state machine, RBAC validator.
3. **Tier 3: Persistence Layer (Google Cloud)**: Cloud Firestore NoSQL subcollections and Firebase Auth.

---

## CHAPTER 8: DATABASE DESIGN & SECURITY RULES

### Table 8.1: Firestore Collections Schema
| Collection Path | Document ID | Purpose | Access Level |
| :--- | :--- | :--- | :--- |
| `/users/{userId}` | User UID | User profile (name, email, role) | Owner or Admin |
| `/users/{userId}/orders/{orderId}` | AXO-xxxxxx | Customer order details, logistics steps | Owner or Admin |
| `/settings/app_config` | `app_config` | Store announcement banner, promo codes | Public Read, Admin Write |
| `/inventory/{productId}` | Product ID | Stock counts, reorder alerts | Public Read, Admin Write |
| `/feedback/{feedbackId}` | UUID | Customer ratings and reviews | Public Create, Admin Read |

### Hardened `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null; }
    function isOwner(userId) { return isSignedIn() && request.auth.uid == userId; }
    function isAdmin() {
      return isSignedIn() && (
        request.auth.token.email == 'princeyadav391yadav@gmail.com' ||
        exists(/databases/$(database)/documents/admins/$(request.auth.uid))
      );
    }
    match /users/{userId}/orders/{orderId} {
      allow read, write: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
  }
}
```

---

## CHAPTER 9: DATA FLOW DIAGRAMS & USE CASES

### Level 0 Context Diagram:
- **Customer** -> Submits orders, receives dynamic total, receipt, and tracker updates.
- **AXOLYT Backbone** -> Coordinates validation, session preservation, and persistence.
- **Administrator** -> Controls store announcements, shipping stages, and order deletions.

### Table 9.1: Use Case Matrix
| Use Case ID | Name | Primary Actor | Pre-condition | Post-condition |
| :--- | :--- | :--- | :--- | :--- |
| **UC-01** | Browse & Select Drinks | Customer / Guest | App loaded | Cart updated |
| **UC-02** | Apply Promo Code | Customer / Guest | Items in cart | 15% discount applied |
| **UC-03** | Initiate Checkout (Guest) | Guest | Items in cart | AuthModal opened; state saved |
| **UC-04** | Member Login | Customer | AuthModal open | User logged in; checkout resumes |
| **UC-05** | Finalize Order | Logged-in User | Valid address | Order saved; tracker launched |
| **UC-06** | Advance Shipping Step | Customer / Member | Active order | Next step marked complete |
| **UC-07** | Admin Panel Login | Administrator | Password input | Command center unlocked |
| **UC-08** | Delete Order | Administrator | Order exists | Order removed from Firestore |

---

## CHAPTER 10: WEBSITE MODULES & FEATURES
1. **Module 1**: Dynamic Navigation & Web Audio Water Synthesizer.
2. **Module 2**: Botanical Product Carousel & 3D Tilt Kinetic Cards.
3. **Module 3**: Slide-Over Cart Drawer with Promo Engine (`PUREENERGY`).
4. **Module 4**: Gated Express Checkout Modal.
5. **Module 5**: 5-Stage Live Cold-Chain Tracker & Invoice Download.
6. **Module 6**: Admin Command Center with Order Deletion & Inventory Monitor.

---

## CHAPTER 11: IMPLEMENTATION & APPLICATION SCREENSHOTS
- **Figure 11.1**: Homepage Hero Section & Waterfall Botanical Atmosphere.
- **Figure 11.2**: Botanical Ingredients Showcase & Adaptogenic Nutrient Profiles.
- **Figure 11.3**: Admin Command Center Access & Security Verification Gateway.
- **Figure 11.4**: Mobile Customer Portal & Live Order Tracking Screen.
- **Figure 11.5**: Signature Organic Flavor Lineup — Green Spring & Wild Berry Cans.

---

## CHAPTER 12: SOFTWARE TESTING & TEST CASES

### Table 12.1: Test Cases Matrix
| Test ID | Scenario Description | Input Data | Expected Output | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Switch Pack Pricing | Click "12-Pack Case" | Price updates to $36.99 | Price changed instantly | **PASSED** |
| **TC-02** | Apply Valid Promo | Code: "PUREENERGY" | 15% discount applied | 15% deducted cleanly | **PASSED** |
| **TC-03** | Apply Invalid Promo | Code: "EXPIRED99" | Error message displayed | Error toast rendered | **PASSED** |
| **TC-04** | Guest Checkout Gate | Guest clicks Checkout | Order halted; AuthModal opens | Cart saved; modal opened | **PASSED** |
| **TC-05** | Auto-Resume Checkout | Login completes | CheckoutModal auto-opens | Modal opened pre-filled | **PASSED** |
| **TC-06** | Address Validation | Empty email field | Form error: "Email required"| Submission halted | **PASSED** |
| **TC-07** | Order Dispatch | Confirm checkout | Order AXO-xxx created in DB | Committed to Firestore | **PASSED** |
| **TC-08** | Live Tracker Step | Click "Simulate Step" | Step moves to "Processing" | Tracker updated live | **PASSED** |
| **TC-09** | Download Receipt | Click "Download Invoice"| AXOLYT-Invoice-xxx.txt saved | Invoice downloaded | **PASSED** |
| **TC-10** | Admin Password Check | Invalid password | "Incorrect password..." error | Exact error shown | **PASSED** |
| **TC-11** | Admin Order Deletion | Click Delete on order | Order removed from Firestore | Deleted with confirmation| **PASSED** |
| **TC-12** | Audio Ambiance | Toggle sound button | Nature sound synthesized | Ambiance plays cleanly | **PASSED** |

---

## CHAPTER 13: ADVANTAGES & LIMITATIONS

### Advantages:
- Single-page application speed with zero page reloads.
- Strict subcollection data isolation preventing peer data leaks.
- Zero-cost serverless scalability via Google Cloud Firestore.
- Engaging 3D kinetic card physics and ambient nature audio synthesis.

### Limitations:
- Simulated payment authorization rather than live banking gateway.
- Cloud order submission requires active internet connectivity.

---

## CHAPTER 14: FUTURE SCOPE
- Integration with live payment gateways (Stripe Elements & Razorpay Webhooks).
- Packaging into native mobile apps (Android APK & iOS IPA) via Capacitor.
- Google Gemini AI botanical nutrition assistant for custom adaptogen advice.
- IoT temperature telemetry sensors linked directly to Firestore order tracking.

---

## CHAPTER 15: CONCLUSION
The development of the **AXOLYT ORGANIC ENERGY** project represents a complete, production-grade software engineering achievement fulfilling all academic requirements for the award of the Diploma in Computer Engineering from Ch. Bansi Lal Polytechnic, Bhiwani.

---

## REFERENCES & BIBLIOGRAPHY
1. React 19 Official Documentation (Meta Open Source, 2026).
2. TypeScript Language Specification (Microsoft Corporation, 2026).
3. Tailwind CSS v4 Documentation (Tailwind Labs, 2026).
4. Google Firebase Cloud Firestore & Auth Manuals (Google Cloud, 2026).
5. Motion Animation Library Specification (Matt Perry, 2026).
6. W3C Web Audio API Recommendation (World Wide Web Consortium).
7. Pressman, Roger S. "Software Engineering: A Practitioner's Approach", 9th Edition.
8. Sommerville, Ian. "Software Engineering", 10th Edition.
9. Haryana State Board of Technical Education (HSBTE) Diploma Curriculum Guidelines.
