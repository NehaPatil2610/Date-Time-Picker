# 🚀 Submission & Upload Guide

Follow these simple steps to put your project on GitHub and get your live Chromatic link.

## Step 1: Upload to GitHub
When you create your repository on GitHub, upload these files (Drag & Drop or Git):
- 📁 `src/`
- 📁 `public/`
- 📁 `.github/` (Crucial for the automated link!)
- 📄 `package.json`
- 📄 `README.md`
- 📄 `REPORT.md`
- 📄 `tailwind.config.js`
- 📄 `vite.config.ts`
- 📄 `index.html`

> **Note:** DO NOT upload `node_modules`.

## Step 2: Add the Chromatic Secret (One-time setup)
To make the live link work, you must tell GitHub your Chromatic token:
1.  On your GitHub repo, click **Settings** (top tab).
2.  On the left, go to **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  **Name**: `CHROMATIC_PROJECT_TOKEN`
5.  **Secret**: `chpt_fa8b599b87e57a8`
6.  Click **Add secret**.

## Step 3: Get your Live Link
1.  Once you upload your files, click the **Actions** tab at the top of your GitHub repo.
2.  You will see a workflow named **"Chromatic"** running.
3.  Wait for it to finish (green checkmark).
4.  Click on the run, and in the "Publish to Chromatic" step, it will give you your **live Storybook URL**.

Congratulations on completing the project!
