# 📦 Node.js App – Jenkins Integration Guide

This guide explains how to configure Jenkins to build and deploy a **Node.js** application using the **NodeJS Plugin**.

---
## ✅ Step 1: Install the NodeJS Plugin

1. Open Jenkins and go to:  
   **Dashboard → Manage Jenkins → Manage Plugins**

2. Click the **Available** tab.

3. Search for **"NodeJS"**.

4. Select the **NodeJS Plugin**.

5. Click **Download now and install after restart**.

6. After installation, **restart Jenkins** to complete the setup.

---

## 🔧 Step 2: Configure NodeJS in Global Tool Configuration

1. Navigate to:  
   **Dashboard → Manage Jenkins → Global Tool Configuration**

2. Scroll down to the **NodeJS** section.

3. Click **Add NodeJS**.

4. Configure the following:
   - **Name**: e.g., `NodeJS-20`
   - **Installation Method**:
     - **Install automatically from nodejs.org**  
       - Select desired version (e.g., 18.x, 20.x)
     - **Install manually**  
       - Provide the Node.js installation path on the Jenkins agent

5. Click **Save**

---

Now your Jenkins is ready to build Node.js applications using the configured NodeJS environment.

# Required Software on Node.js Deployment Server

This guide lists the required software and installation steps to set up a production-ready Node.js environment on various Linux server platforms.

---

## 1. Node.js Runtime (Latest LTS - v20.x)

**Purpose**: Runs your JavaScript application.

---

### For Amazon Linux 2

> Recommended: Use Node.js **v20.x LTS**

```bash
# Add Node.js 20.x repository from NodeSource
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# Install Node.js and npm
sudo yum install -y nodejs

# Verify installation
node -v
npm -v
```