# Course 4: AI Web App Development
**Production & Delivery Manual**

- **Course Title**: AI Web App Development
- **Price**: ₦20,000 (One-time payment)
- **Slug**: `ai-web-app-development`
- **Target Video Duration**: 2 to 5 minutes per lesson
- **Hardware Requirement**: Laptop / PC required for practical development and deployment (lessons can be viewed on phone)
- **Internet / Data Footprint**: Medium
- **Primary Tools**: Claude / ChatGPT / Cursor, v0.dev / Lovable, GitHub, Supabase / Vercel (All free tiers)

---

# Module 1: Problem Definition and Minimal Scope

---

### Lesson 1.1: Finding One Small, Real Problem to Solve
- **Estimated Video Length**: 3 minutes 45 seconds
- **Lesson Slug**: `lesson-1`
- **Main Skill**: Identify a focused, single-utility problem rather than an overwhelming multi-feature platform.
- **Good Scope vs Bad Scope**:
  - *Bad Scope*: "I want to build an AI app like Uber, Amazon, and Paystack combined."
  - *Good Scope*: "I want to build a simple calculator that helps Nigerian freelancers estimate total withholding tax and bank fees on an invoice."

---

### Lesson 1.2: Defining Inputs, Outputs, and User Flow
- **Estimated Video Length**: 4 minutes 00 seconds
- **Lesson Slug**: `lesson-2`
- **Main Skill**: Map the exact 3-step user journey: what the user enters, what the system calculates, and what is displayed.
- **The 3-Step Flow**:
  1. Input: User types their gross amount and client type.
  2. Processing: App applies calculation formula.
  3. Output: Clean printable summary card showing net payout and WhatsApp share button.

---

### Lesson 1.3: The MVP Rule: What to Leave Out of Version 1
- **Estimated Video Length**: 3 minutes 30 seconds
- **Lesson Slug**: `lesson-3`
- **Main Skill**: Identify non-essential features and cut them so you can ship a working version in days, not months.
- **The Rule**: If the app cannot solve the problem without this feature, keep it. If it is just decorative (custom profile pictures, dark/light theme toggle, complex social logins), remove it from Version 1.

---

### Module 1 Quiz
1. **What is an MVP (Minimum Viable Product)?**
   - Correct: The smallest, simplest version of an app that solves one specific problem for real users.
2. **Why do beginner software projects often fail before launch?**
   - Correct: They try to build too many complex features at once instead of focusing on one working outcome.
3. **Can you build an effective web app that only has one single page?**
   - Correct: Yes, many of the most useful utilities (calculators, converters, form generators) are single-page apps.

---

# Module 2: Prompting AI Coding Assistants

---

### Lesson 2.1: Writing Build Instructions for AI Coding Assistants
- **Estimated Video Length**: 4 minutes 45 seconds
- **Lesson Slug**: `lesson-4`
- **Main Skill**: Structure technical prompts for AI tools (Claude, Cursor, ChatGPT) with clear framework specs and component breakdowns.
- **The Developer Prompt Formula**:
  ```text
  You are an expert full-stack developer.
  Tech Stack: Next.js App Router, TypeScript, Tailwind CSS.
  Goal: Build a single-page Freelance Invoice Fee Calculator.
  Inputs:
  1. Gross Invoice Amount in NGN (number input).
  2. Platform / Channel (dropdown: Direct Bank Transfer, Paystack, Flutterwave).
  Logic:
  - If Direct Bank: Fee is ₦50.
  - If Paystack: Fee is 1.5% + ₦100 (capped at ₦2,000).
  Outputs:
  Display a card showing: Net amount received, Total deductions, and a "Copy Summary" button.
  Design: Clean, mobile-first, using Tailwind CSS, high contrast, warm cream background (#FAF5EE), dark espresso text (#2C1A12).
  Provide the complete, single-file React component code.
  ```

---

### Lesson 2.2: Generating a Mobile-Responsive Interface
- **Estimated Video Length**: 4 minutes 30 seconds
- **Lesson Slug**: `lesson-5`
- **Main Skill**: Prompt and refine responsive layouts that fit perfectly on 360px mobile screens as well as laptops.
- **Mobile Rule**: Use single-column layouts (`flex-col`), full-width buttons (`w-full`), and minimum touch target heights of 44px.

---

### Lesson 2.3: Adding State and Interactive Logic
- **Estimated Video Length**: 4 minutes 15 seconds
- **Lesson Slug**: `lesson-6`
- **Main Skill**: Implement React state (`useState`) to handle live calculations, loading states, and instant user feedback.

---

### Module 2 Quiz
1. **What details should you always include when prompting an AI coding assistant?**
   - Correct: Tech stack, exact user inputs, processing logic, and mobile UI constraints.
2. **Why is mobile-first design critical in Nigeria and Africa?**
   - Correct: Over 80% of web traffic in Africa comes from mobile devices.

---

# Module 3: Data, APIs, and Safe Secret Handling

---

### Lesson 3.1: Connecting a Basic Data Store or Supabase Table
- **Estimated Video Length**: 4 minutes 45 seconds
- **Lesson Slug**: `lesson-7`
- **Main Skill**: Set up a free Supabase PostgreSQL database to store user submissions and read saved records.

---

### Lesson 3.2: Safe API Key Handling: Protecting Secrets on the Server
- **Estimated Video Length**: 4 minutes 30 seconds
- **Lesson Slug**: `lesson-8`
- **Main Skill**: Understand why API keys and database service keys must NEVER be exposed in frontend code.
- **Security Rule**:
  - `NEXT_PUBLIC_` variables are visible to anyone inspecting the browser bundle.
  - Private secrets (Gemini API keys, Paystack Secret Keys) must only be called in Next.js Server Actions or Route Handlers (`app/api/`).

---

### Lesson 3.3: Handling Errors and Failed Requests Gracefully
- **Estimated Video Length**: 3 minutes 45 seconds
- **Lesson Slug**: `lesson-9`
- **Main Skill**: Build resilient error states when network connectivity drops or third-party APIs fail.
- **Checklist**:
  - Show friendly error messages (e.g., *"Network timeout. Check your data and retry."*).
  - Disable buttons during loading to prevent double-charging or duplicate submissions.

---

### Module 3 Quiz
1. **Why is it dangerous to put a private API key in a frontend JavaScript file?**
   - Correct: Anyone can open the browser developer tools, copy your key, and run up charges or steal data.
2. **Where should secret API keys and database credentials be kept in Next.js?**
   - Correct: In private server-side environment variables without the `NEXT_PUBLIC_` prefix.

---

# Module 4: Testing, Deployment, and Review

---

### Lesson 4.1: Testing on Mobile and Edge-Case Inputs
- **Estimated Video Length**: 4 minutes 00 seconds
- **Lesson Slug**: `lesson-10`
- **Main Skill**: Test zero inputs, negative numbers, extreme character lengths, and small screens before deploying.

---

### Lesson 4.2: Free Deployment on Vercel
- **Estimated Video Length**: 4 minutes 15 seconds
- **Lesson Slug**: `lesson-11`
- **Main Skill**: Connect a GitHub repository to Vercel, set production environment variables, and deploy a live `.vercel.app` URL.

---

### Lesson 4.3: Presenting Your App and Explaining Its Limitations
- **Estimated Video Length**: 3 minutes 30 seconds
- **Lesson Slug**: `lesson-12`
- **Main Skill**: Write a clear `README.md` and user disclaimer explaining what the app does, known limits, and privacy boundaries.

---

### Final Project: Published Mobile-Friendly Utility Web App
- **Objective**: Build and deploy a real, functioning mobile-first web app on Vercel.
- **Deliverables**:
  1. Problem statement and defined target user.
  2. Public live Vercel URL.
  3. Public GitHub repository link.
  4. Test documentation showing 3 normal tests and 2 handled edge-case inputs.

#### Assessment Rubric
- [x] App loads cleanly on mobile screens without horizontal overflow.
- [x] Solves one clearly defined utility problem with input and output.
- [x] No API keys or secrets exposed in frontend code.
- [x] Form inputs handle errors and invalid inputs gracefully.
- [x] Live URL is functional and publicly accessible.
