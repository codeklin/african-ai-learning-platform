# ItuwaAfrica Course Content Prompts for Claude

Each section below is a complete, self-contained prompt. Copy the full block between the
START and END markers and paste it into Claude. Claude will return a valid JSON array
of 10 lessons following the exact schema used across all ItuwaAfrica courses.

Completed courses (prompts already generated and saved):
- AI Video Creation: data/ai-video-creation-lessons.json
- AI Graphic Design: prompt given, JSON not yet saved

---

## PROMPT 1: YouTube Monetization Policies and Copyright

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "YouTube Monetization Policies and Copyright" on ItuwaAfrica.

TARGET AUDIENCE:
Beginners and everyday creators in Nigeria and Africa who want to understand YouTube's monetization rules, copyright system, and how to keep their channel safe while earning money from their content.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact terms to search for.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: What YouTube Monetization Actually Is and What It Requires
Lesson 2: Understanding the YouTube Partner Program Requirements Step by Step
Lesson 3: What Copyright Means and How It Applies to Your Videos
Lesson 4: How to Use Music on YouTube Without Getting a Strike
Lesson 5: Fair Use, Creative Commons, and What They Actually Allow
Lesson 6: How to Handle a Copyright Claim or Strike When It Happens
Lesson 7: Setting Up AdSense and Understanding Your Revenue Dashboard
Lesson 8: Channel Memberships, Super Thanks, and Other Built-In Revenue Features
Lesson 9: Avoiding the Policy Violations That Kill Monetization
Lesson 10: Keeping Your Channel Safe as YouTube Policies Change Over Time

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "What YouTube Monetization Actually Is and What It Requires",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 2: Starting a Faceless YouTube Channel

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "Starting a Faceless YouTube Channel" on ItuwaAfrica.

TARGET AUDIENCE:
Beginners and digital freelancers in Nigeria and Africa who want to build a YouTube channel and earn from it without ever appearing on camera.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact prompts to use.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: What a Faceless Channel Is and What Makes One Actually Work
Lesson 2: Choosing a Niche That Earns Without Showing Your Face
Lesson 3: Planning Your First 10 Videos Before You Record Anything
Lesson 4: Writing Clear, Engaging Scripts for Faceless Narration
Lesson 5: Finding and Using Stock Footage Legally on a Free Budget
Lesson 6: Using AI Voiceover Tools to Narrate Your Videos
Lesson 7: Editing a Faceless Video in CapCut from Start to Finish
Lesson 8: Creating a Channel Brand and Identity Without a Personal Face
Lesson 9: Growing an Audience Without On-Camera Personality
Lesson 10: Monetizing a Faceless Channel and Setting Realistic Income Expectations

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "What a Faceless Channel Is and What Makes One Actually Work",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 3: AI for Your Freelance Business

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "AI for Your Freelance Business" on ItuwaAfrica.

TARGET AUDIENCE:
Beginners and aspiring digital freelancers in Nigeria and Africa who are not sure what service to offer, how to price it, or how to find their first client. They want practical guidance on starting and growing a freelance income using AI tools.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact prompts to use.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: Finding the One Problem You Can Solve for a Paying Client
Lesson 2: Turning Your Skill into a Clear, Sellable Freelance Offer
Lesson 3: Setting a Price That Is Fair, Competitive, and Earns You Respect
Lesson 4: Finding Your First Client Without a Portfolio or Experience
Lesson 5: Using AI Tools to Speed Up Your Freelance Work and Deliver Faster
Lesson 6: Writing Proposals and Pitches That Win Jobs
Lesson 7: Managing Client Communication and Setting Clear Expectations
Lesson 8: Delivering Work Professionally and Getting Paid Without Drama
Lesson 9: Building a Simple Online Presence That Attracts Inbound Clients
Lesson 10: Growing from Your First Client to a Consistent Monthly Income

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "Finding the One Problem You Can Solve for a Paying Client",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 4: AI-Powered YouTube Content Production

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "AI-Powered YouTube Content Production" on ItuwaAfrica.

TARGET AUDIENCE:
Beginner and intermediate YouTube creators in Nigeria and Africa who want to use AI tools to get past the blank page, produce better content faster, and publish more consistently, while still keeping their own voice and originality.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact prompts to use.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: Using AI to Find Video Ideas That People Are Already Searching For
Lesson 2: Writing a Strong YouTube Script with AI Assistance and Your Own Voice
Lesson 3: Creating Click-Worthy Thumbnails with Free AI Design Tools
Lesson 4: Using AI to Plan a Realistic and Consistent Upload Schedule
Lesson 5: Generating B-Roll and Visual Assets with AI When You Lack Footage
Lesson 6: AI Tools for Editing, Captioning, and Cleaning Up Your Audio
Lesson 7: Writing Titles, Descriptions, and Tags with AI for Better Search Reach
Lesson 8: Keeping Your Originality and Voice in AI-Assisted Content
Lesson 9: Repurposing One Long Video into Shorts, Posts, and Clips with AI
Lesson 10: Reviewing Quality, Disclosure, and Platform Rules Before You Publish

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "Using AI to Find Video Ideas That People Are Already Searching For",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 5: YouTube Shorts Growth Strategy

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "YouTube Shorts Growth Strategy" on ItuwaAfrica.

TARGET AUDIENCE:
Beginner creators in Nigeria and Africa who want to grow a YouTube audience quickly using short vertical videos. They have a smartphone and want practical, honest guidance on what actually works without false promises about viral success.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact prompts to use.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: How YouTube Shorts Works and Why It Is Different from Long-Form Video
Lesson 2: Choosing a Topic Your Audience Already Cares About
Lesson 3: Planning a Short That Holds Attention for the Full Duration
Lesson 4: Filming or Generating a Vertical Short on a Smartphone Budget
Lesson 5: Editing a Short in CapCut for Maximum Viewer Retention
Lesson 6: Writing a Title and Description That Helps Shorts Get Discovered
Lesson 7: Building a Posting Schedule You Can Maintain Without Burnout
Lesson 8: Reading Your Shorts Analytics and Knowing What to Change
Lesson 9: Converting Shorts Viewers into Long-Form Subscribers
Lesson 10: Building a Repeatable Shorts System That Grows Week by Week

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "How YouTube Shorts Works and Why It Is Different from Long-Form Video",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 6: YouTube SEO and Analytics

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "YouTube SEO and Analytics" on ItuwaAfrica.

TARGET AUDIENCE:
Beginner and growing YouTube creators in Nigeria and Africa who want more people to find their videos through search, understand what their channel statistics actually mean, and use data to make smarter decisions about what to create next.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact terms to search.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: What YouTube SEO Is and Why It Decides Who Finds Your Videos
Lesson 2: How to Find Keywords People Are Actually Searching For Right Now
Lesson 3: Writing Titles That Both People and YouTube Want to Click
Lesson 4: Writing Descriptions That Help YouTube Understand Your Video
Lesson 5: Choosing Tags, Categories, and Chapter Markers Correctly
Lesson 6: Reading YouTube Studio Analytics Without Getting Confused
Lesson 7: Understanding Audience Retention and What It Tells You About Your Content
Lesson 8: Using Click-Through Rate Data to Improve Your Thumbnails
Lesson 9: What to Do When a Video Underperforms
Lesson 10: Building an SEO Habit That Compounds Your Growth Over Time

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "What YouTube SEO Is and Why It Decides Who Finds Your Videos",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 7: Prompting for Better Work

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "Prompting for Better Work" on ItuwaAfrica.

TARGET AUDIENCE:
Complete beginners in Nigeria and Africa who already use AI tools like ChatGPT or Gemini but keep getting answers that do not help them. They want to learn how to give better instructions to AI so the output is actually useful for their work, writing, design, and business tasks.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact prompts to type and test.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: What a Prompt Is and Why Most People Use AI the Wrong Way
Lesson 2: The Four Parts of a Prompt That Get Better Results Every Time
Lesson 3: Prompting for Written Content: Emails, Captions, and Scripts
Lesson 4: Prompting for Images: Getting What You Actually Imagined
Lesson 5: Prompting for Research: Getting Answers You Can Actually Trust
Lesson 6: Giving the AI a Role and Context to Dramatically Improve Output
Lesson 7: Iterating on a Prompt When the First Answer Is Not Right
Lesson 8: Checking AI Output for Errors Before You Use It Anywhere
Lesson 9: Prompting for Simple Automation and Spreadsheet Tasks Without Coding
Lesson 10: Building a Personal Prompt Library You Can Reuse Every Week

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "What a Prompt Is and Why Most People Use AI the Wrong Way",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 8: Building a Creator Business Beyond Ad Revenue

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "Building a Creator Business Beyond Ad Revenue" on ItuwaAfrica.

TARGET AUDIENCE:
YouTube and social media creators in Nigeria and Africa who already have a channel or audience but rely only on ad revenue, which is unpredictable and low in African markets. They want honest, practical guidance on building additional income streams from their existing content and audience.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact strategies to test.
6. Never promise guaranteed income. All income examples must be framed as possibilities, not guarantees.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: Why Ad Revenue Alone Is Not a Reliable Creator Business
Lesson 2: Identifying Services You Can Offer Directly to Your Audience
Lesson 3: Creating a Simple Digital Product to Sell Without a Big Team
Lesson 4: Setting Up a Paid Community or Membership for Your Most Loyal Fans
Lesson 5: Finding Brand Partnership Opportunities Without a Huge Channel
Lesson 6: Affiliate Marketing: Earning a Commission from Products You Recommend
Lesson 7: Using Your YouTube Channel to Sell a Course, Workshop, or Coaching Session
Lesson 8: Setting Up a Simple Shop for Physical or Digital Products
Lesson 9: Managing Multiple Income Streams Without Burning Out or Losing Quality
Lesson 10: Writing a 12-Month Creator Business Plan You Can Actually Follow

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "Why Ad Revenue Alone Is Not a Reliable Creator Business",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 9: YouTube Monetization (Main Paid Course)

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "YouTube Monetization" on ItuwaAfrica.

TARGET AUDIENCE:
Aspiring and active YouTube creators in Nigeria and Africa who want a full, honest education on how creator revenue actually works: from qualifying for the Partner Program to understanding copyright, building alternative income, and making decisions based on real data rather than hype.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact strategies to test.
6. Never promise monetization approval, guaranteed views, or guaranteed income. All income examples must be framed as possibilities, not promises.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: The Reality of YouTube Creator Revenue in Africa
Lesson 2: What the YouTube Partner Program Requires and How to Qualify
Lesson 3: How Ad Revenue Is Calculated, Paid, and Why It Fluctuates
Lesson 4: Channel Memberships, Super Thanks, and YouTube Shopping Features
Lesson 5: Copyright, Fair Use, and What Actually Gets Your Monetization Removed
Lesson 6: Building Original Content That Platforms and Audiences Value Long Term
Lesson 7: Alternative Revenue Streams: Courses, Services, and Affiliate Income
Lesson 8: Reading Your Revenue Dashboard and Understanding the Numbers
Lesson 9: What Happens When YouTube Changes Its Policies and How to Stay Ready
Lesson 10: Writing a Monetization Plan That Does Not Depend on a Single Source

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "The Reality of YouTube Creator Revenue in Africa",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 10: YouTube Business Fundamentals

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "YouTube Business Fundamentals" on ItuwaAfrica.

TARGET AUDIENCE:
Complete beginners in Nigeria and Africa who want to start a YouTube channel with a business mindset from day one. They want honest answers about what it costs, how long it takes, what the realistic income path looks like, and how to avoid the common mistakes that cause new channels to fail silently.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact decisions to make.
6. Never promise income, views, or subscriber numbers. Frame all outcomes as possibilities based on consistent effort.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: What a YouTube Business Is and What It Realistically Costs to Start
Lesson 2: Choosing a Niche That Has Both an Audience and a Revenue Path
Lesson 3: Setting Up Your Channel Correctly from Day One
Lesson 4: Understanding What Makes People Subscribe and Come Back
Lesson 5: Planning Your First Month of Content Before You Record Anything
Lesson 6: The Minimum Equipment Setup for a Professional-Looking Channel
Lesson 7: Building a Posting Schedule You Can Maintain for at Least 90 Days
Lesson 8: Understanding YouTube's Rules Before You Break Them by Accident
Lesson 9: Measuring Real Progress in Your First 90 Days
Lesson 10: Realistic Income Timelines and How to Stay Motivated Without Hype

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "What a YouTube Business Is and What It Realistically Costs to Start",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---


---

## PROMPT 11: Build Your First AI Workflow

---START PROMPT---
You are a senior educational architect, expert curriculum developer, and author of best-selling "For Dummies" practical guides.

I need complete, highly detailed lesson content for my online course: "Build Your First AI Workflow" on ItuwaAfrica.

TARGET AUDIENCE:
Freelancers, small business owners, and creators in Nigeria and Africa who repeat the same digital tasks every day by hand: copying data, sending follow-up messages, posting content, or organizing files. They want to stop doing these tasks manually by building simple AI-powered automations, with no coding knowledge required.

CRITICAL TONE AND STYLE RULES:
1. Plain, everyday English that a 10-year-old can follow with zero confusion.
2. No bogus buzzwords, no corporate filler, and no abstract theory.
3. ABSOLUTELY ZERO EM DASHES (the long dash). Never use it anywhere. Use colons, commas, or periods instead.
4. ABSOLUTELY ZERO EMOJIS anywhere in the output.
5. Every lesson must have concrete, actionable steps: tell the student exact buttons to tap, free tools to open, and exact workflow configurations to set up.

COURSE TOPICS TO COVER (ALL 10 LESSONS):
Lesson 1: What an AI Workflow Is and Why It Saves You Hours Every Week
Lesson 2: Identifying One Routine Task in Your Day That Is Worth Automating
Lesson 3: Understanding the Tools: Make, Zapier, and Free Alternatives for African Users
Lesson 4: Building Your First Automation: Connect Two Apps Without Writing a Single Line of Code
Lesson 5: Using AI to Process, Summarize, or Rewrite Text Automatically in a Workflow
Lesson 6: Automating Social Media Posts and Content Scheduling Across Platforms
Lesson 7: Automating Client Communication, Follow-Up Messages, and Invoice Reminders
Lesson 8: Testing Your Workflow, Finding What Breaks, and Fixing It Without Stress
Lesson 9: Keeping Your Workflows Secure and Protecting Client Data Inside Automations
Lesson 10: Expanding One Workflow into a Productive Daily System for Your Business

INTERNAL LESSON STRUCTURE (Apply to every lesson body):
Each lesson body must have these four distinct sections separated by double newlines:

THE BIG IDEA:
Explain what this lesson is and why it matters in simple terms. Use an everyday physical analogy.

STEP-BY-STEP WALKTHROUGH:
Step 1: [Action title and exact instructions]
Step 2: [Action title and exact instructions]
Step 3: [Action title and exact instructions]
Step 4: [Action title and exact instructions]

COMMON MISTAKES TO AVOID:
Highlight 2 common traps beginners fall into and how to prevent them.

ONE PRACTICAL TASK FOR TODAY:
One 5-minute exercise the student must complete right now on their phone or laptop.

OUTPUT FORMAT:
Output ONLY a single, valid JSON array containing all 10 lessons. No conversational preamble, no markdown formatting outside the JSON, no backticks at the beginning or end.

Each object must follow this exact schema:
[
  {
    "position": 1,
    "title": "What an AI Workflow Is and Why It Saves You Hours Every Week",
    "accessLevel": "free",
    "readTimeMin": 4,
    "body": "THE BIG IDEA:\n...\n\nSTEP-BY-STEP WALKTHROUGH:\nStep 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\n\nCOMMON MISTAKES TO AVOID:\n...\n\nONE PRACTICAL TASK FOR TODAY:\n...",
    "takeaway": "One short, punchy sentence defining the primary golden rule of this lesson."
  }
]

ACCESS LEVEL RULES:
Lessons 1, 2, and 3 must have "accessLevel": "free".
Lessons 4 through 10 must have "accessLevel": "paid".
---END PROMPT---
