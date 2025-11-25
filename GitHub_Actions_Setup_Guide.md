# Complete GitHub Actions Setup Guide for Cypress Testing
## (Without Cypress Cloud)

**Author:** Cypress Automation Expert  
**Date:** November 25, 2025  
**Version:** 1.0  
**For:** Beginner to Intermediate Level

---

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Prepare Your Cypress Project](#phase-1-prepare-your-cypress-project)
4. [Phase 2: Initialize Git Repository](#phase-2-initialize-git-repository)
5. [Phase 3: Create GitHub Repository](#phase-3-create-github-repository)
6. [Phase 4: Connect Local to GitHub](#phase-4-connect-local-to-github)
7. [Phase 5: Create GitHub Actions Workflow](#phase-5-create-github-actions-workflow)
8. [Phase 6: Push Workflow to GitHub](#phase-6-push-workflow-to-github)
9. [Phase 7: Verify and Run Tests](#phase-7-verify-and-run-tests)
10. [Phase 8: Access Test Reports](#phase-8-access-test-reports)
11. [Phase 9: Share with Client](#phase-9-share-with-client)
12. [Phase 10: Optional Enhancements](#phase-10-optional-enhancements)
13. [Troubleshooting Guide](#troubleshooting-guide)
14. [FAQ - Frequently Asked Questions](#faq-frequently-asked-questions)
15. [Cost Analysis](#cost-analysis)
16. [Maintenance Checklist](#maintenance-checklist)

---

## Introduction

This guide will walk you through setting up **GitHub Actions** for automated Cypress testing without using Cypress Cloud. This is ideal for clients who want:

- ✅ Free or low-cost CI/CD solution
- ✅ No dependency on third-party services
- ✅ Complete control over test execution
- ✅ Easy integration with existing GitHub repositories
- ✅ Automated test reports

**What is GitHub Actions?**

GitHub Actions is a CI/CD platform that allows you to automate your build, test, and deployment pipeline directly within GitHub.

**Benefits:**
- No additional tools needed
- Runs on every code push
- Manual test execution available
- Free for public repositories
- 2,000 free minutes/month for private repos

---

## Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** installed (version 18 or higher)
- ✅ **Cypress** project set up locally
- ✅ **Git** installed on your machine
- ✅ **GitHub account** (free or paid)
- ✅ **Code editor** (VS Code recommended)
- ✅ All tests passing locally

### Verify Your Setup:

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check Git version
git --version

# Check Cypress works
npx cypress run
```

---

## Phase 1: Prepare Your Cypress Project

### Step 1.1: Verify Project Structure

Your project should have this structure:

```
your-project/
├── cypress/
│   ├── e2e/
│   │   ├── Test1.cy.ts
│   │   ├── Test2.cy.ts
│   │   └── practiceE2E.cy.ts
│   ├── fixtures/
│   ├── support/
│   └── ...
├── node_modules/
├── cypress.config.js
├── package.json
├── package-lock.json
└── tsconfig.json (if using TypeScript)
```

### Step 1.2: Test Locally

Run these commands to ensure everything works:

```bash
# Install dependencies
npm install

# Run all tests
npx cypress run

# Run specific test
npx cypress run --spec "cypress/e2e/Test1.cy.ts"

# Run with specific browser
npx cypress run --browser chrome
```

**Expected Result:** All tests should pass ✅

### Step 1.3: Create .gitignore File

Create a file named `.gitignore` in your project root:

```gitignore
# Dependencies
node_modules/

# Cypress artifacts
cypress/videos/
cypress/screenshots/
cypress/reports/

# System files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# Environment variables
.env
.env.local
```

**Why?** This prevents unnecessary files from being uploaded to GitHub.

---

## Phase 2: Initialize Git Repository

### Step 2.1: Open Terminal

Navigate to your project folder:

```bash
cd C:\Users\YourName\Desktop\YourProject
```

### Step 2.2: Initialize Git

```bash
git init
```

**Expected Output:**
```
Initialized empty Git repository in C:/Users/YourName/Desktop/YourProject/.git/
```

### Step 2.3: Add All Files

```bash
git add .
```

### Step 2.4: Create First Commit

```bash
git commit -m "Initial commit with Cypress automation framework"
```

**Expected Output:**
```
[master (root-commit) abc1234] Initial commit with Cypress automation framework
 15 files changed, 3906 insertions(+)
```

---

## Phase 3: Create GitHub Repository

### Step 3.1: Go to GitHub

1. Open browser and go to: https://github.com
2. Log in to your account

### Step 3.2: Create New Repository

1. Click the **"+"** icon (top right corner)
2. Select **"New repository"**

### Step 3.3: Fill Repository Details

**Field** | **Value** | **Notes**
----------|-----------|----------
Repository name | `ClientName-Cypress-Automation` | Use meaningful name
Description | `Automated tests for [Client Name]` | Optional but recommended
Visibility | **Private** | Recommended for client work
Initialize | **Leave unchecked** | You already have files
README | **Leave unchecked** | Will add later
.gitignore | **None** | Already created locally
License | **None** | Add if needed

### Step 3.4: Create Repository

Click **"Create repository"** button

### Step 3.5: Copy Repository URL

You'll see a URL like:
```
https://github.com/yourusername/ClientName-Cypress-Automation.git
```

**Save this URL** - you'll need it in the next phase.

---

## Phase 4: Connect Local to GitHub

### Step 4.1: Add Remote Origin

In your terminal, run:

```bash
git remote add origin https://github.com/yourusername/ClientName-Cypress-Automation.git
```

**Note:** Replace with your actual repository URL

### Step 4.2: Rename Branch to Main

```bash
git branch -M main
```

**Why?** GitHub uses "main" as default branch name

### Step 4.3: Push to GitHub

```bash
git push -u origin main
```

**First time?** You might need to authenticate with GitHub:
- Browser window will open
- Click "Authorize"
- Return to terminal

**Expected Output:**
```
Enumerating objects: 25, done.
Counting objects: 100% (25/25), done.
Writing objects: 100% (25/25), 37.32 KiB | 2.33 MiB/s, done.
Total 25 (delta 0), reused 0 (delta 0)
To https://github.com/yourusername/ClientName-Cypress-Automation.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Step 4.4: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded ✅

---

## Phase 5: Create GitHub Actions Workflow

### Step 5.1: Create Workflow Directory

In your project, create this folder structure:

```
.github/
└── workflows/
    └── cypress.yml
```

**Commands:**

```bash
# Windows PowerShell
mkdir .github\workflows

# Mac/Linux
mkdir -p .github/workflows
```

### Step 5.2: Create Workflow File

Create file: `.github/workflows/cypress.yml`

### Step 5.3: Add Workflow Configuration

Copy this content to `cypress.yml`:

```yaml
name: Cypress Tests

# When to run this workflow
on: 
  push:
    branches: [main]  # Run on push to main branch
  pull_request:
    branches: [main]  # Run on pull requests
  workflow_dispatch:  # Allow manual trigger
    inputs:
      spec:
        description: 'Spec file to run (leave empty to run all)'
        required: false
        type: choice
        options:
          - 'All Tests'
          - 'cypress/e2e/Test1.cy.ts'
          - 'cypress/e2e/Test2.cy.ts'
          - 'cypress/e2e/practiceE2E.cy.ts'
        default: 'All Tests'
      browser:
        description: 'Browser to use'
        required: false
        type: choice
        options:
          - 'chrome'
          - 'firefox'
          - 'edge'
        default: 'chrome'

# Permissions needed
permissions:
  contents: write
  pages: write
  id-token: write

# Jobs to run
jobs:
  cypress-run:
    runs-on: ubuntu-latest  # Use Ubuntu Linux
    
    steps:
      # Step 1: Get code from repository
      - name: Checkout code
        uses: actions/checkout@v4
      
      # Step 2: Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm ci
      
      # Step 4: Run Cypress tests
      - name: Run Cypress tests
        uses: cypress-io/github-action@v6
        with:
          browser: ${{ github.event.inputs.browser || 'chrome' }}
          spec: ${{ github.event.inputs.spec != 'All Tests' && github.event.inputs.spec || '' }}
          install: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      # Step 5: Upload test results (screenshots, videos, reports)
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()  # Run even if tests fail
        with:
          name: cypress-results-${{ github.run_number }}
          path: |
            cypress/screenshots/
            cypress/videos/
            cypress/reports/
          retention-days: 30
```

### Step 5.4: Understand the Workflow

**Triggers:**
- `push` - Runs automatically when you push code
- `pull_request` - Runs on pull requests
- `workflow_dispatch` - Manual run with options

**Steps Explanation:**

1. **Checkout** - Downloads your code
2. **Setup Node.js** - Installs Node.js environment
3. **Install dependencies** - Runs `npm ci` to install packages
4. **Run tests** - Executes Cypress tests
5. **Upload results** - Saves screenshots, videos, reports

---

## Phase 6: Push Workflow to GitHub

### Step 6.1: Add Workflow File

```bash
git add .github/workflows/cypress.yml
```

### Step 6.2: Commit Changes

```bash
git commit -m "Add GitHub Actions workflow for Cypress tests"
```

### Step 6.3: Push to GitHub

```bash
git push
```

**Expected Output:**
```
Enumerating objects: 9, done.
Writing objects: 100% (5/5), 701 bytes | 350.00 KiB/s, done.
To https://github.com/yourusername/ClientName-Cypress-Automation.git
   abc1234..def5678  main -> main
```

---

## Phase 7: Verify and Run Tests

### Step 7.1: Navigate to Actions Tab

1. Go to your GitHub repository
2. Click **"Actions"** tab (top menu)
3. You should see **"Cypress Tests"** workflow

### Step 7.2: Check Automatic Run

If you just pushed code, the workflow should be running automatically:
- Yellow dot 🟡 = Running
- Green checkmark ✅ = Passed
- Red X ❌ = Failed

### Step 7.3: Manual Run (Optional)

To run tests manually:

1. Click **"Cypress Tests"** (left sidebar)
2. Click **"Run workflow"** button (right side)
3. Select options:
   - **Spec file:** Choose which test to run
   - **Browser:** Choose browser (chrome/firefox/edge)
4. Click **"Run workflow"** (green button)

### Step 7.4: Watch Test Execution

1. Click on the running workflow
2. Click **"cypress-run"** job
3. See each step execute in real-time
4. Expand steps to see detailed logs

**Example Output:**
```
✓ Setup Node.js (2s)
✓ Install dependencies (14s)
✓ Run Cypress tests (1m 28s)
  - Test1.cy.ts: 6 passing
  - Test2.cy.ts: 12 passing
  - practiceE2E.cy.ts: 1 passing
✓ Upload test results (1s)
```

---

## Phase 8: Access Test Reports

### Step 8.1: Download Artifacts

After workflow completes:

1. Scroll down to **"Artifacts"** section
2. Click **"cypress-results-[number]"** to download
3. Save ZIP file to your computer

### Step 8.2: Extract and View

1. Extract the ZIP file
2. Navigate to `cypress/reports/` folder
3. Open `index.html` in web browser

**Report Contains:**
- ✅ Test execution summary
- ✅ Pass/Fail status for each test
- ✅ Execution time
- ✅ Screenshots (if any failures)
- ✅ Detailed error messages
- ✅ Charts and graphs

### Step 8.3: Share Reports

**Option 1: Email**
- Zip the reports folder
- Email to client/team

**Option 2: Cloud Storage**
- Upload to Google Drive/Dropbox
- Share link with team

**Option 3: GitHub Pages** (Advanced)
- Deploy reports to GitHub Pages
- Accessible via URL
- Auto-updates on each run

---

## Phase 9: Share with Client

### Step 9.1: Add Collaborators

1. Go to repository **Settings**
2. Click **"Collaborators"** (left sidebar)
3. Click **"Add people"**
4. Enter client's GitHub username or email
5. Choose access level:
   - **Read:** View code and results only
   - **Write:** Can run tests and modify code
   - **Admin:** Full access

### Step 9.2: Create Client Guide

Send client this information:

**Email Template:**

```
Subject: GitHub Actions - Automated Testing Access

Hi [Client Name],

I've set up automated testing for your project using GitHub Actions.

Repository URL: [Your GitHub Repo URL]

What you can do:

1. VIEW TEST RESULTS:
   - Go to: [Repo URL]/actions
   - Click on any workflow run
   - See test results in real-time

2. DOWNLOAD REPORTS:
   - Open any completed workflow run
   - Scroll to "Artifacts" section
   - Download "cypress-results" ZIP file
   - Extract and open index.html

3. RUN TESTS MANUALLY:
   - Go to Actions tab
   - Click "Cypress Tests"
   - Click "Run workflow"
   - Select test file and browser
   - Click "Run workflow" button

4. VIEW TEST HISTORY:
   - All test runs are saved for 30 days
   - Compare results over time
   - Track test stability

Need help? Reply to this email.

Best regards,
[Your Name]
```

### Step 9.3: Schedule Demo Session

Offer a 15-minute walkthrough:
- Show how to view results
- Explain test status indicators
- Demonstrate manual test runs
- Answer questions

---

## Phase 10: Optional Enhancements

### Enhancement 1: Scheduled Test Runs

Run tests automatically every day at 9 AM:

```yaml
on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM UTC daily
  push:
  workflow_dispatch:
```

**Cron Examples:**
- `0 9 * * *` - 9 AM daily
- `0 9 * * 1-5` - 9 AM weekdays only
- `0 */6 * * *` - Every 6 hours
- `0 0 * * 0` - Midnight every Sunday

### Enhancement 2: Multiple Environments

Test against different environments:

```yaml
strategy:
  matrix:
    environment: [staging, production]
env:
  BASE_URL: ${{ matrix.environment == 'staging' && 'https://staging.example.com' || 'https://example.com' }}
```

### Enhancement 3: Parallel Execution

Run tests faster with parallel execution:

```yaml
strategy:
  matrix:
    containers: [1, 2, 3]
```

This runs 3 instances simultaneously, dividing tests between them.

### Enhancement 4: Slack Notifications

Get notified in Slack when tests fail:

```yaml
- name: Slack Notification
  if: failure()
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
    SLACK_MESSAGE: 'Tests failed! Check GitHub Actions for details.'
```

### Enhancement 5: Email Notifications

GitHub automatically sends emails for workflow failures. Configure in:
- GitHub Settings → Notifications → Actions

### Enhancement 6: Status Badges

Add badge to README.md:

```markdown
# Project Name

![Cypress Tests](https://github.com/username/repo/workflows/Cypress%20Tests/badge.svg)
```

Shows test status directly in repository.

### Enhancement 7: Test Retries

Retry flaky tests automatically:

```yaml
- name: Run Cypress tests
  uses: cypress-io/github-action@v6
  with:
    browser: chrome
    config: retries=2  # Retry failed tests twice
```

### Enhancement 8: Custom Test Reports

Use different reporters:

```yaml
- name: Generate Allure Report
  run: npm run report:allure
  
- name: Generate JUnit XML
  run: npm run report:junit
```

---

## Troubleshooting Guide

### Issue 1: Workflow Doesn't Trigger

**Symptoms:**
- No workflow runs appear after push
- Actions tab shows no workflows

**Solutions:**

1. Check workflow file location:
   ```
   .github/workflows/cypress.yml  ✅ Correct
   github/workflows/cypress.yml   ❌ Wrong
   .github/workflow/cypress.yml   ❌ Wrong (missing 's')
   ```

2. Verify YAML syntax:
   - Use online YAML validator
   - Check indentation (use spaces, not tabs)
   - Ensure no special characters

3. Check branch name:
   - Workflow configured for `main` branch
   - Your branch might be `master`
   - Update workflow or rename branch

### Issue 2: Tests Fail in GitHub Actions But Pass Locally

**Symptoms:**
- Tests pass on your machine
- Same tests fail in GitHub Actions

**Common Causes:**

1. **Environment differences:**
   ```yaml
   # Add environment variables
   env:
     BASE_URL: https://your-app.com
     API_KEY: ${{ secrets.API_KEY }}
   ```

2. **Timing issues:**
   ```javascript
   // Increase timeouts in CI
   cy.get('#element', { timeout: 10000 })
   ```

3. **Screen resolution:**
   ```javascript
   // cypress.config.js
   viewportWidth: 1920,
   viewportHeight: 1080
   ```

4. **Missing dependencies:**
   - Check `package-lock.json` is committed
   - Use `npm ci` instead of `npm install`

### Issue 3: Artifacts Not Uploaded

**Symptoms:**
- No artifacts available for download
- Reports not generated

**Solutions:**

1. Check paths in workflow:
   ```yaml
   path: |
     cypress/screenshots/  # Verify these exist
     cypress/videos/
     cypress/reports/
   ```

2. Ensure reports are generated:
   ```javascript
   // cypress.config.js
   reporter: 'cypress-mochawesome-reporter',
   reporterOptions: {
     reportDir: 'cypress/reports'
   }
   ```

3. Add `if: always()`:
   ```yaml
   - name: Upload artifacts
     if: always()  # Run even if tests fail
   ```

### Issue 4: Out of GitHub Actions Minutes

**Symptoms:**
- Workflows queued but don't run
- "Exceeded limit" message

**Solutions:**

1. Check usage:
   - Go to Settings → Billing
   - View Actions usage

2. Optimize workflow:
   - Run fewer tests
   - Use caching
   - Reduce parallel jobs

3. Upgrade plan:
   - GitHub Pro: 3,000 minutes/month
   - GitHub Team: 3,000 minutes/month
   - GitHub Enterprise: 50,000 minutes/month

### Issue 5: Permission Errors

**Symptoms:**
- "Permission denied" errors
- Can't write to repository

**Solutions:**

Add permissions to workflow:

```yaml
permissions:
  contents: write
  pages: write
  id-token: write
```

### Issue 6: Browser Installation Fails

**Symptoms:**
- "Chrome not found" error
- Browser binary missing

**Solutions:**

Use cypress-io/github-action - it handles browser installation automatically:

```yaml
- uses: cypress-io/github-action@v6
  with:
    browser: chrome
```

For custom setup:

```yaml
- name: Install Chrome
  run: |
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
    sudo apt install ./google-chrome-stable_current_amd64.deb
```

---

## FAQ - Frequently Asked Questions

### Q1: How much does GitHub Actions cost?

**Answer:**

**Free Tier:**
- Public repositories: Unlimited minutes
- Private repositories: 2,000 minutes/month

**After Free Tier:**
- $0.008 per minute (Linux)
- $0.016 per minute (Windows)
- $0.08 per minute (macOS)

**Example:** If tests take 5 minutes:
- 400 runs/month = 2,000 minutes (FREE)
- Each additional run = $0.04

### Q2: Can we run tests on specific schedule?

**Answer:** Yes! Add schedule trigger:

```yaml
on:
  schedule:
    - cron: '0 9 * * 1-5'  # Weekdays at 9 AM
```

### Q3: How long are test results stored?

**Answer:**
- Workflow logs: 90 days
- Artifacts: Configurable (default 90 days, we set 30)
- Can be downloaded before expiry

### Q4: Can we test against multiple browsers?

**Answer:** Yes! Use matrix strategy:

```yaml
strategy:
  matrix:
    browser: [chrome, firefox, edge]
steps:
  - uses: cypress-io/github-action@v6
    with:
      browser: ${{ matrix.browser }}
```

### Q5: What if tests are flaky?

**Answer:** Add retries:

```javascript
// cypress.config.js
{
  retries: {
    runMode: 2,      // Retry 2 times in CI
    openMode: 0      // No retry locally
  }
}
```

### Q6: Can non-technical people run tests?

**Answer:** Yes! They can:
1. Go to Actions tab
2. Click "Run workflow"
3. Select options from dropdown
4. Click "Run workflow" button

No coding or command line needed!

### Q7: How do we get notifications?

**Answer:** Multiple options:

1. **Email (built-in):**
   - GitHub Settings → Notifications → Actions
   - Enable "Send notifications for failed workflows"

2. **Slack:**
   - Add Slack action to workflow
   - Configure webhook

3. **Microsoft Teams:**
   - Use Teams webhook action

4. **Custom webhook:**
   - Send HTTP request to any endpoint

### Q8: Can we run tests for pull requests?

**Answer:** Yes! Already configured:

```yaml
on:
  pull_request:
    branches: [main]
```

Tests run automatically when PR is created/updated.

### Q9: What if client doesn't have GitHub account?

**Answer:** Options:

1. **Create account for them:**
   - Free GitHub account
   - Add as collaborator

2. **Share results externally:**
   - Export reports to PDF
   - Host reports on GitHub Pages
   - Send screenshots via email

3. **Use GitHub Pages:**
   - Public URL for reports
   - No login needed to view

### Q10: Can we run tests against different environments?

**Answer:** Yes! Use environment variables:

```yaml
env:
  BASE_URL: ${{ secrets.STAGING_URL }}
  API_KEY: ${{ secrets.API_KEY }}
```

Configure in: Repository → Settings → Secrets

---

## Cost Analysis

### Monthly Cost Estimation

**Scenario 1: Small Project**
- Tests: 10 minutes per run
- Frequency: 5 runs per day
- Monthly: 150 runs = 1,500 minutes
- **Cost: $0 (within free tier)**

**Scenario 2: Medium Project**
- Tests: 15 minutes per run
- Frequency: 10 runs per day
- Monthly: 300 runs = 4,500 minutes
- Excess: 2,500 minutes
- **Cost: 2,500 × $0.008 = $20/month**

**Scenario 3: Large Project**
- Tests: 30 minutes per run
- Frequency: 20 runs per day
- Monthly: 600 runs = 18,000 minutes
- Excess: 16,000 minutes
- **Cost: 16,000 × $0.008 = $128/month**

### Cost Optimization Tips

1. **Use caching:**
   ```yaml
   - uses: actions/cache@v3
     with:
       path: ~/.npm
       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
   ```

2. **Run only changed tests:**
   - Use smart test detection
   - Skip tests for doc-only changes

3. **Optimize test execution:**
   - Remove unnecessary waits
   - Use parallel execution
   - Delete old artifacts

4. **Schedule wisely:**
   - Run nightly instead of hourly
   - Skip weekends if not critical

---

## Maintenance Checklist

### Daily Tasks
- [ ] Check workflow status
- [ ] Review failed tests
- [ ] Download important reports

### Weekly Tasks
- [ ] Review test execution times
- [ ] Check GitHub Actions usage
- [ ] Update flaky tests
- [ ] Clean up old artifacts

### Monthly Tasks
- [ ] Update dependencies (`npm update`)
- [ ] Review and optimize workflow
- [ ] Check GitHub Actions costs
- [ ] Update test data
- [ ] Review test coverage

### Quarterly Tasks
- [ ] Update Cypress version
- [ ] Update GitHub Actions versions
- [ ] Review test strategy
- [ ] Client feedback session
- [ ] Documentation update

### Yearly Tasks
- [ ] Major framework updates
- [ ] Architecture review
- [ ] Performance optimization
- [ ] Cost analysis and optimization

---

## Best Practices

### 1. Version Control
✅ Commit `package-lock.json`  
✅ Use meaningful commit messages  
✅ Create branches for new features  
✅ Review changes before pushing  

### 2. Test Organization
✅ Use descriptive test names  
✅ Group related tests  
✅ Keep tests independent  
✅ Clean up test data  

### 3. Workflow Configuration
✅ Use latest action versions  
✅ Add comments in YAML  
✅ Keep workflows simple  
✅ Use reusable workflows  

### 4. Security
✅ Never commit secrets  
✅ Use GitHub Secrets for sensitive data  
✅ Limit repository access  
✅ Review workflow permissions  

### 5. Reporting
✅ Generate detailed reports  
✅ Include screenshots for failures  
✅ Archive important test runs  
✅ Share results promptly  

---

## Useful Commands Reference

### Git Commands
```bash
# Check status
git status

# Add files
git add .
git add specific-file.js

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-branch

# Switch branches
git checkout main
```

### npm Commands
```bash
# Install dependencies
npm install
npm ci  # Cleaner install for CI

# Update packages
npm update

# Check outdated packages
npm outdated

# Run scripts
npm run cypress:open
npm run cypress:run
```

### Cypress Commands
```bash
# Open Cypress Test Runner
npx cypress open

# Run all tests headlessly
npx cypress run

# Run specific test
npx cypress run --spec "cypress/e2e/Test1.cy.ts"

# Run with specific browser
npx cypress run --browser chrome
npx cypress run --browser firefox

# Run with custom config
npx cypress run --config viewportWidth=1920,viewportHeight=1080
```

---

## Resources

### Official Documentation
- GitHub Actions: https://docs.github.com/en/actions
- Cypress: https://docs.cypress.io
- Cypress GitHub Action: https://github.com/cypress-io/github-action

### Tutorials
- GitHub Actions Quickstart: https://docs.github.com/en/actions/quickstart
- Cypress Best Practices: https://docs.cypress.io/guides/references/best-practices
- YAML Syntax: https://yaml.org/spec/1.2/spec.html

### Tools
- YAML Validator: https://www.yamllint.com
- Cron Expression Generator: https://crontab.guru
- Markdown Editor: https://stackedit.io

### Community
- GitHub Community: https://github.community
- Cypress Discord: https://discord.gg/cypress
- Stack Overflow: https://stackoverflow.com/questions/tagged/github-actions

---

## Conclusion

Congratulations! You now have a complete understanding of setting up GitHub Actions for Cypress testing.

**What You've Learned:**
✅ How to prepare Cypress projects for CI/CD  
✅ Creating and configuring GitHub repositories  
✅ Writing GitHub Actions workflows  
✅ Running automated tests  
✅ Accessing and sharing test reports  
✅ Troubleshooting common issues  
✅ Optimizing costs and performance  

**Next Steps:**
1. Practice with a sample project
2. Set up CI/CD for a client project
3. Explore advanced features
4. Share knowledge with your team

**Remember:**
- Start simple, add complexity gradually
- Test locally before pushing to GitHub
- Monitor costs and optimize regularly
- Keep documentation updated
- Communicate results with stakeholders

Good luck with your automation journey! 🚀

---

## Appendix A: Sample Workflow Files

### Basic Workflow
```yaml
name: Basic Cypress Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - uses: cypress-io/github-action@v6
```

### Advanced Workflow
```yaml
name: Advanced Cypress Tests
on:
  push:
  schedule:
    - cron: '0 9 * * 1-5'
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox]
        containers: [1, 2]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - uses: cypress-io/github-action@v6
        with:
          browser: ${{ matrix.browser }}
          record: false
          parallel: true
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots
```

---

## Appendix B: Troubleshooting Checklist

When workflow fails, check:

- [ ] YAML syntax is valid
- [ ] File is in `.github/workflows/` directory
- [ ] Branch name matches workflow configuration
- [ ] All dependencies are in `package.json`
- [ ] `package-lock.json` is committed
- [ ] Tests pass locally
- [ ] Node version matches
- [ ] Environment variables are set
- [ ] Permissions are configured
- [ ] GitHub Actions quota not exceeded

---

## Version History

**Version 1.0** (November 25, 2025)
- Initial release
- Complete setup guide
- Troubleshooting section
- FAQ section
- Cost analysis

---

**Document End**

For questions or support, contact: [Your Email]

---

*This document is part of the Cypress Automation Framework project.*
*Last updated: November 25, 2025*
