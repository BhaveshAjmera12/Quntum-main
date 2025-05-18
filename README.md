# QUANTUM

# Installation Guide

## Step 0: Copy Project Folder
Copy the project folder from the CD and paste it onto the desktop.

## Step 1: Install Node.js
- Download and install Node.js from [Node.js official website](https://nodejs.org/)
- Verify installation:
  ```sh
  node -v
  npm -v
  ```

## Step 2: Install MongoDB
- Download and install MongoDB from [MongoDB official website](https://www.mongodb.com/try/download/community)

## Step 3: Install Mongo Command Line Tool (for restoring laptop data)
- Copy the MongoDB tools path:
  ```sh
  C:\Program Files\MongoDB\Tools\100\bin
  
  ```
- Go to **Edit System Environment Variables**
- Navigate to **Edit Menu** in the **Path Section** and paste the copied path

## Step 4: Install VS Code
- Download and install VS Code from [VS Code official website](https://code.visualstudio.com/)

## Step 5: Open Project in VS Code

## Step 6: Navigate to Project Folder
```sh
cd Desktop
cd Quantum (Main Project Folder)
```

## Step 7: Setup Backend open terminal
```sh
cd backend
npm install
npm i mongoose
npm start
```

## Step 8: Setup Frontend
- Open a new terminal and run:
  ```sh
  cd frontend
  npm install
  npm run dev
  ```

## Step 9: Restore Quantum Database (Laptop Collection)
- Open CMD (**Windows + R**, type `cmd`)
- Navigate to MongoDB dump folder:
  ```sh
  cd Desktop
  cd Quantum
  cd mongodatadump
  ```
- Restore the database using:
  ```sh
    mongorestore --db QUANTUM --collection laptops quantum-laptops-collection.bson
  ```

## Step 10: Run the Project
- Go back to VS Code
- Click on the link generated after running:
  ```sh
  npm run dev
  ```

.

---
Installation is complete. Your MERN stack project is now set up and running!

