# React Rewards Program App

A simple React application that simulates a **customer rewards program**.  
Customers earn points based on their purchase amounts:

- **2 points** for every dollar spent over $100 in a transaction  
- **1 point** for every dollar spent between $50 and $100 in a transaction  

Example:  
A $120 purchase = (2 × $20) + (1 × $50) = **90 points**

---

## 🚀 Features
- Calculates reward points per transaction
- Aggregates points **per customer per month** and **total**
- Simulates an **asynchronous API call** to fetch transaction data
- Built with **React + Vite**
- No Redux, just React hooks (`useState`, `useEffect`)
- Clean modular structure (API, utils, components)

---


## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Nikhil1103/react-rewards-app.git
cd react-rewards-app

### Install Dependencies 
npm install
npm run dev
