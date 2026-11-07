# DOC 2 — Content Data for the Portfolio
**Owner: Harshal Yadav** · Companion to `DOC1_PORTFOLIO_PLAN.md` · Version 1.0 · 6 Nov 2026

This file contains **information only**. It maps 1:1 to the `content/` folder described in Doc 1 (Section 16). The agent converts each YAML block below into the matching typed file (`content/site.ts`, `content/about.ts`, …).

---

## 0. Rules for the agent (read first)

1. Use this data **exactly**. Do not add facts, numbers, links or achievements that are not here.
2. **Markers** inside the data:
   - `TODO_USER` → the owner has not supplied this yet. Render a neat visible placeholder (or hide the element if it is a link/image) and keep the marker as a code comment so it is easy to find.
   - `DRAFT_VERIFY` → text drafted for the owner in his voice from his real repos, resume and event deck. The owner will read and edit it. Use as written; keep a `// DRAFT_VERIFY` comment next to it.
3. **Images:** the owner will supply real photos after the build. Until then use **neutral placeholders**: a simple generated graphic (initials or a gradient) for the avatar and each project/certificate thumbnail. Never hot-link or download random images.
4. **Links:** show a link button only if its value is a real URL (not `TODO_USER`).
5. **Language:** keep the first-person, warm, direct tone. No corporate buzzwords. Do not shorten the stories.
6. **Facts to verify (anime only):** year, studio and episode counts below are best-known values; the agent should confirm them from reliable sources before finalizing. Personal fields (ratings, reviews, experience) must **never** be changed by the agent.
7. **Naming consistency:** the club is written as **"AWS Student Builder Group (JSPM RSCOE)"** everywhere. (The resume says "AWS Student Developer Group"; the owner should confirm which name he prefers.)

### Owner review checklist (what is a draft and what is real)
| Section | Status |
|---|---|
| Basics, education, experience, hackathon facts, project tech/links | **Real** (from resume, deck, GitHub) |
| About story, taglines, project problem/solution/role/learned, bug diary, anime reviews, Diwali stories, skill-up log | **Drafted by Claude in your voice → please read and edit** (`DRAFT_VERIFY`) |
| Certificate dates and Google badge titles, live URLs, photos, setup details | **Needed from you** (`TODO_USER`) |

---

## 1. `content/site.ts`

```yaml
name: "Harshal Yadav"
roleLine: "B.Tech IT Student · AWS & Cloud Builder"        # DRAFT_VERIFY
availability: "Open to cloud & DevOps internships"          # DRAFT_VERIFY
email: "harshal53076ydv@gmail.com"
location: "Pune, Maharashtra, India"
college: "JSPM's Rajarshi Shahu College of Engineering (RSCOE), Pune"
degree: "B.Tech in Information Technology"
year: "Third year"
expectedGraduation: "2028"
cgpa: "9.44"
avatar: "/shared/avatar.placeholder.svg"                    # TODO_USER: real photo later
cvFile: "/shared/Harshal_Yadav_resume.pdf"                  # owner copies his resume PDF here
socials:
  - { label: "LinkedIn", url: "https://www.linkedin.com/in/harshal-yadav-449bb9338/" }
  - { label: "GitHub",   url: "https://github.com/Harshal-ydv" }
  - { label: "Credly (AWS)",    url: "https://www.credly.com/users/harshal-yadav.70e0e87f" }
  - { label: "Credly (Google)", url: "https://www.credly.com/users/harshal-yadav.1954b905" }
seoTitle: "Harshal Yadav — AWS & Cloud Builder | B.Tech IT, Pune"
seoDescription: "Portfolio of Harshal Yadav, a B.Tech IT student and AWS Student Builder Group core member building serverless apps, learning cloud architecture and DevOps."
ogImage: "/shared/og.placeholder.png"                      # TODO_USER
footerCredit: "© 2026 Harshal Yadav"
specialBadge: "Core Member · AWS Student Builder Group, JSPM RSCOE"   # show prominently in header/About (relevant to AWS challenge)
```

---

## 2. `content/about.ts`

```yaml
taglines:                                                    # DRAFT_VERIFY
  - "I build on AWS, and I teach others how."
  - "Serverless by habit. Curious by default."
  - "Learning cloud in public, one deploy at a time."

facts:
  - { label: "Role",       value: "B.Tech IT Student · Cloud Learner" }
  - { label: "College",    value: "JSPM's RSCOE, Pune" }
  - { label: "Year",       value: "3rd year · Graduating 2028" }
  - { label: "CGPA",       value: "9.44" }
  - { label: "Location",   value: "Pune, Maharashtra" }
  - { label: "Community",  value: "AWS Student Builder Group (Core Member)" }
  - { label: "Focus",      value: "AWS · Serverless · Cloud Architecture · DevOps" }

lead: >                                                      # DRAFT_VERIFY (about 125 words)
  I'm Harshal, a third-year IT student at RSCOE Pune, and the cloud is where I
  finally felt like my code was doing something real. It started with small
  AWS labs and grew into serverless apps on Lambda, DynamoDB and Bedrock, one of
  which cost me exactly three cents to run. I'm a core member of our AWS Student
  Builder Group, where I plan workshops, run live demos and help beginners find
  their feet in the cloud. I also coordinate cloud sessions at GDGC, and I
  collect hackathons the way some people collect stamps. Right now I'm moving
  from "I can deploy this" to "I can design this properly", which is why
  architecture, DevOps and a lot of IAM debugging are on my plate.

stats:
  - { value: "300+", label: "students reached through cloud events" }
  - { value: "50+",  label: "beginners mentored in AWS basics" }
  - { value: "8+",   label: "hackathons and builder events" }
  - { value: "9.44", label: "CGPA" }

focus:                                                       # DRAFT_VERIFY
  - "Designing systems on AWS, not just deploying them"
  - "Containers and ECS for real workloads"
  - "Infrastructure as Code and CI/CD pipelines"
  - "Generative AI on Amazon Bedrock"

story:                                                       # DRAFT_VERIFY (facts from resume/deck; wording is drafted)
  - period: "2024"
    title: "Day one at RSCOE"
    text: "I joined B.Tech IT at JSPM's RSCOE with a laptop, a lot of curiosity and zero idea what 'the cloud' meant. First came C, C++ and DSA, and my first real lesson: the compiler is rarely wrong."
  - period: "2024 – 2025"
    title: "Making data talk"
    text: "Python opened a new door. NumPy, Pandas and scikit-learn showed me that a few lines of code could find patterns I couldn't see myself. That's when I started building instead of only studying."
  - period: "2025"
    title: "Cloud Coordinator at GDGC"
    text: "I became Cloud Coordinator at Google Developer Groups on Campus, running workshops like Google Skill Boost 2025. Explaining the cloud to others turned out to be the fastest way to understand it myself."
  - period: "2025 – 2026"
    title: "Falling for AWS"
    text: "I earned my AWS Certified Cloud Practitioner and started building: a Lambda-and-Bedrock fun-facts app, an auto-deploying S3 game, a Cognito-secured ride app. Seeing a live HTTPS URL I built with no server to manage was addictive."   # TODO_USER: confirm cert date
  - period: "2026"
    title: "Core member, AWS Student Builder Group"
    text: "I joined the core team of our AWS Student Builder Group. We've run a technical session, the SURGE hands-on workshop, a recruitment drive and more, reaching 300+ students and mentoring 50+ beginners."
  - period: "2026"
    title: "Hackathon season"
    text: "ISRO's Bharatiya Antariksh Hackathon, Zero to One AI, Kurukshetra 2.0, SIH institute-level selection, and a Second Prize in the AI track at Logic Loop. Then AWS Future Builders Connect Pune, where I won goodies and learned about ECS, Kiro and Bedrock."
  - period: "Now"
    title: "Building this portfolio, aiming higher"
    text: "I'm building this site for the AWS Student Builder Challenge. Next up: cloud architecture, Infrastructure as Code and DevOps, until designing on AWS feels as natural as deploying on it."

interests:                                                   # DRAFT_VERIFY
  - { title: "Serverless & Cloud Architecture", tag: "AWS", icon: "cloud", description: "Lambda, API Gateway, DynamoDB and friends: building apps with zero servers to babysit." }
  - { title: "Generative AI on AWS", tag: "AI", icon: "sparkles", description: "Using Amazon Bedrock to turn plain data into something people actually enjoy using." }
  - { title: "DevOps & Automation", tag: "DEVOPS", icon: "workflow", description: "CI/CD pipelines, containers and Infrastructure as Code so deployments become boring (in a good way)." }
  - { title: "Community & Teaching", tag: "COMMUNITY", icon: "users", description: "Organizing workshops, mentoring beginners, and making the cloud feel less scary." }

communities:
  - { name: "AWS Student Builder Group · JSPM RSCOE", role: "Core Member" }
  - { name: "Google Developer Groups on Campus (GDGC)", role: "Cloud Coordinator" }
  - { name: "AWS Builder Center", role: "Future Builders Connect, Pune attendee" }
```

---

## 3. `content/skills.ts`

Logos: local SVG files by slug. If an exact logo is unavailable, use a simple monogram tile; never hot-link.

```yaml
categories:
  - name: "AWS Compute & Serverless"
    items:
      - { name: "AWS Lambda",      logo: "aws-lambda",      note: "Backend of my Cloud Fun Facts and Swift Rydes apps" }
      - { name: "Amazon EC2",      logo: "aws-ec2",         note: "Hosted my ProofTalk hackathon app on a t2.micro" }
      - { name: "API Gateway",     logo: "aws-apigateway",  note: "HTTP and REST APIs, including a Cognito authorizer" }
      - { name: "AWS Amplify",     logo: "aws-amplify",     note: "Frontend hosting with HTTPS and a global CDN" }
      - { name: "Elastic Load Balancing", logo: "aws-elb",  note: "Traffic distribution in hands-on labs" }
  - name: "AWS Storage, Data & Networking"
    items:
      - { name: "Amazon S3",       logo: "aws-s3",          note: "Static hosting for my AWS Memory Management Game" }
      - { name: "Amazon DynamoDB", logo: "aws-dynamodb",    note: "Data layer for Cloud Fun Facts and Swift Rydes" }
      - { name: "Amazon RDS",      logo: "aws-rds",         note: "MySQL on RDS in my hybrid-database DBMS project" }
      - { name: "Amazon CloudFront", logo: "aws-cloudfront", note: "CDN and HTTPS delivery for static sites" }
      - { name: "Amazon VPC",      logo: "aws-vpc",         note: "Subnets, routing and security groups" }
      - { name: "Amazon Route 53", logo: "aws-route53",     note: "DNS and domain routing in labs" }
  - name: "AWS Security, Monitoring & AI"
    items:
      - { name: "AWS IAM",         logo: "aws-iam",         note: "Least-privilege roles for every Lambda I ship" }
      - { name: "Amazon Cognito",  logo: "aws-cognito",     note: "User sign-up and JWT auth in Swift Rydes" }
      - { name: "Amazon CloudWatch", logo: "aws-cloudwatch", note: "My first stop when anything breaks" }
      - { name: "Amazon SNS",      logo: "aws-sns",         note: "Notifications and event fan-out in labs" }
      - { name: "Amazon Bedrock",  logo: "aws-bedrock",     note: "Claude-powered rewrites in Cloud Fun Facts" }
  - name: "DevOps & Delivery"
    items:
      - { name: "AWS CodePipeline", logo: "aws-codepipeline", note: "Push to GitHub, live on S3 in under a minute" }
      - { name: "CI/CD Engineering", logo: "cicd",          note: "Automated source-to-deploy pipelines" }
      - { name: "Docker",          logo: "docker",          note: "Containers for PostGIS in RespondNow" }
      - { name: "Infrastructure as Code", logo: "iac",      note: "Concepts and practice, deepening now" }
      - { name: "Linux Administration", logo: "linux",      note: "Nginx and systemd on Ubuntu (EC2)" }
      - { name: "n8n",             logo: "n8n",             note: "Workflow automation" }
  - name: "Google Cloud"
    items:
      - { name: "Compute Engine",  logo: "gcp-compute",     note: "VMs in GDGC cloud workshops" }
      - { name: "Cloud Run",       logo: "gcp-cloudrun",    note: "Serverless containers" }
      - { name: "Cloud Functions", logo: "gcp-functions",   note: "Event-driven functions" }
      - { name: "Cloud SQL / Storage / Load Balancing / VPC", logo: "gcp", note: "Used while guiding students through GCP labs" }
  - name: "Languages"
    items:
      - { name: "Python",          logo: "python",          note: "Lambda functions, FastAPI, data work" }
      - { name: "JavaScript",      logo: "javascript",      note: "Frontends and Node.js backends" }
      - { name: "C / C++",         logo: "cpp",             note: "DSA and fundamentals" }
      - { name: "SQL",             logo: "sql",             note: "MySQL and PostgreSQL" }
      - { name: "HTML / CSS",      logo: "html",            note: "Every frontend I've built" }
  - name: "Frameworks, Data & Tools"
    items:
      - { name: "React",           logo: "react",           note: "Frontends for ProofTalk, RespondNow and the DBMS project" }
      - { name: "Node.js",         logo: "nodejs",          note: "Express backends" }
      - { name: "FastAPI",         logo: "fastapi",         note: "ProofTalk's AI interview backend" }
      - { name: "Django",          logo: "django",          note: "Backend framework practice" }
      - { name: "PostgreSQL + PostGIS", logo: "postgresql", note: "Geo-queries in RespondNow" }
      - { name: "MongoDB",         logo: "mongodb",         note: "Flexible data in the hybrid DBMS project" }
      - { name: "Pandas / NumPy / scikit-learn / TensorFlow", logo: "python", note: "Data and ML coursework" }
      - { name: "Git & GitHub / GitLab", logo: "github",    note: "Version control and PR workflow" }
      - { name: "Postman / REST APIs", logo: "postman",     note: "Testing every endpoint I write" }
  - name: "CS Fundamentals"
    items:
      - { name: "Data Structures & Algorithms", logo: "dsa", note: "Core of my coursework" }
      - { name: "Operating Systems", logo: "os",            note: "Processes, memory and scheduling" }
      - { name: "Computer Networking", logo: "network",     note: "Foundation for VPC and load balancing" }
      - { name: "OOP",             logo: "oop",             note: "Design in C++ and Python" }

learning:                                                    # DRAFT_VERIFY (shown as "Currently learning" chips)
  - "Cloud Architecture (Well-Architected thinking)"
  - "Amazon ECS & containers"
  - "Infrastructure as Code"
  - "GitHub Actions CI/CD"
  - "AWS Solutions Architect – Associate prep"
```

---

## 4. `content/projects.ts`

Category filters: **Cloud · AI · Hackathon · Learning · Academic**. Featured project: **Cloud Fun Facts Generator**. All thumbnails are placeholders until the owner supplies screenshots (`TODO_USER`).

```yaml
- slug: "cloud-fun-facts-generator"
  featured: true
  title: "Cloud Fun Facts Generator"
  category: "Cloud"
  status: "Live"
  thumbnail: "TODO_USER"
  summary: "A fully serverless app that pulls a cloud fact from DynamoDB and has Claude on Amazon Bedrock rephrase it with a witty twist."
  tags: ["Lambda", "API Gateway", "DynamoDB", "Amazon Bedrock", "Amplify", "IAM"]
  links: { live: "TODO_USER", github: "https://github.com/Harshal-ydv/Cloud-fun-facts-generator", article: "TODO_USER" }
  problem: "Cloud facts are usually dry. I wanted to see how far I could get building a complete AWS app, backend, database, GenAI and frontend, without managing a single server."   # DRAFT_VERIFY
  solution: "A Lambda function fetches a random fact from DynamoDB and sends it to Claude 3 Sonnet on Bedrock, which rewrites it in one or two fun sentences. API Gateway exposes it as an HTTP endpoint and a responsive page on AWS Amplify (HTTPS + CDN) shows it with loading and error states."
  techStack: ["AWS Lambda (Python)", "Amazon API Gateway", "Amazon DynamoDB", "Amazon Bedrock (Claude 3 Sonnet)", "AWS Amplify", "AWS IAM"]
  role: "Solo build: architecture, backend, IAM permissions and frontend."
  learned: "How serverless pieces talk to each other, how least-privilege IAM really works, and why GenAI calls need generous timeouts. The whole project cost about $0.03, almost all of it Bedrock."

- slug: "prooftalk-ai-interview-agent"
  featured: false
  title: "ProofTalk — AI Interview Agent"
  category: "Hackathon"
  status: "Live"                                             # TODO_USER: confirm the EC2 demo is still running before keeping the live link
  thumbnail: "TODO_USER"
  summary: "An AI interviewer that adapts its questions to a candidate's real 31-day learning journey instead of using a generic question bank."
  tags: ["FastAPI", "React", "Groq (Llama 3.3 70B)", "AWS EC2", "Nginx", "systemd"]
  links: { live: "http://3.109.91.205", github: "https://github.com/Harshal-ydv/ViCodathon-ABTalks", article: "TODO_USER" }
  problem: "Interview questions are usually random and ignore what a candidate actually practised. For ABtalks ViCodathon 2026, the challenge was to build the interviewer, not the interview."   # DRAFT_VERIFY
  solution: "A planner reads each candidate's missions and sorts topics into confident, struggled and skipped, then builds a focused 8-question plan. An evaluator checks each answer, asks a follow-up if it's weak, and finishes with a feedback report of strengths, gaps and next steps. Text mode and a TruGen AI video-avatar mode are both supported. Deployed on an EC2 t2.micro behind Nginx."
  techStack: ["Python 3.11 + FastAPI", "React 18 + Vite", "Groq API (Llama 3.3 70B)", "TruGen AI avatar", "AWS EC2 (Ubuntu 24.04)", "Nginx", "systemd"]
  role: "Built and deployed the project for the hackathon (backend orchestration, frontend, EC2 setup)."   # DRAFT_VERIFY: confirm solo vs team
  learned: "Prompting for evaluation is harder than prompting for answers, and a 502 from Nginx usually means the app behind it is down. Read the logs first."

- slug: "aws-memory-management-game"
  featured: false
  title: "AWS Memory Management Game"
  category: "Cloud"
  status: "Live"
  thumbnail: "TODO_USER"
  summary: "A card-matching game with 12 pairs of AWS service icons, a 90-second timer, scoring and a 2-player mode, deployed automatically on every GitHub push."
  tags: ["Amazon S3", "AWS CodePipeline", "CodeStar Connections", "IAM", "JavaScript"]
  links: { live: "TODO_USER", github: "https://github.com/Harshal-ydv/Memory-Management-Game", article: "TODO_USER" }
  problem: "I wanted to learn CI/CD on AWS and make memorising AWS service icons less boring."   # DRAFT_VERIFY
  solution: "A 3×8 card grid with a countdown ring that turns red in the last 15 seconds, +10 points per match and a time bonus in solo mode, plus a 2-player mode. The site is hosted on S3 and AWS CodePipeline (connected to GitHub through CodeStar Connections) redeploys it within about a minute of each push. No build stage was needed for plain HTML, CSS and JS."
  techStack: ["Amazon S3 static hosting", "AWS CodePipeline", "CodeStar Connections", "AWS IAM", "HTML / CSS / JavaScript"]
  role: "Solo build: game logic, S3 hosting and the CI/CD pipeline."
  learned: "How CodePipeline's source and deploy stages fit together, why static sites can skip the build stage, and that automated deploys remove a whole class of human errors. Hosting cost: $0.00."

- slug: "swift-rydes"
  featured: false
  title: "Swift Rydes — Serverless Unicorn Ride App"
  category: "Learning"
  status: "Learning"
  thumbnail: "TODO_USER"
  summary: "A secure end-to-end serverless app: sign up, log in, click a map and the nearest unicorn is dispatched, built on 7 AWS services."
  tags: ["Amplify", "Cognito", "API Gateway", "Lambda (Node.js)", "DynamoDB", "IAM", "GitHub"]
  links: { live: "TODO_USER", github: "https://github.com/Harshal-ydv/swiftrydes-site", article: "TODO_USER" }
  problem: "I wanted to understand how real serverless apps handle authentication and data, not just return JSON."   # DRAFT_VERIFY
  solution: "Built from a guided serverless workshop template (credited in the repo) and rebuilt service by service: Amplify hosts the frontend and deploys on every push, Cognito issues JWTs, API Gateway validates them with a Cognito authorizer, and a Lambda function writes each ride to DynamoDB."
  techStack: ["AWS Amplify", "Amazon Cognito", "Amazon API Gateway (REST)", "AWS Lambda (Node.js 22)", "Amazon DynamoDB", "AWS IAM"]
  role: "Followed a guided workshop and wired up and debugged every service myself."   # DRAFT_VERIFY
  learned: "How JWT authorizers protect an API, why a Lambda needs its own IAM permission to write to DynamoDB, and how CloudWatch logs make that obvious."

- slug: "respondnow-smart-resource-allocation"
  featured: false
  title: "RespondNow — Smart Resource Allocation System"
  category: "AI"
  status: "Learning"
  thumbnail: "TODO_USER"
  summary: "Citizens report incidents on WhatsApp with a photo, AI reads the image, and the incident appears live on a map dashboard for faster response."
  tags: ["React", "Node.js", "PostgreSQL + PostGIS", "Docker", "Twilio WhatsApp", "OpenAI Vision"]
  links: { live: "TODO_USER", github: "https://github.com/Harshal-ydv/Smart-Resource-Allocation-System", article: "TODO_USER" }
  problem: "In an emergency, information arrives scattered and late. I wanted to see if a simple WhatsApp message could turn straight into something responders can see and act on."   # DRAFT_VERIFY
  solution: "A visitor or volunteer sends a message or photo to a WhatsApp sandbox number. The backend analyses the image with GPT-4o Vision, stores the incident with its location in PostgreSQL + PostGIS, and the dashboard shows it on a live map. It includes a simulator page for demos and seeded data of 25 incidents and 30 volunteers."
  techStack: ["React + Vite", "Node.js + Express", "PostgreSQL + PostGIS (Docker)", "Twilio WhatsApp Sandbox", "OpenAI GPT-4o Vision", "ngrok"]
  role: "Full-stack build: backend, geo-database, WhatsApp webhook and dashboard."   # DRAFT_VERIFY
  learned: "How webhooks work end to end, how geo-queries differ from normal SQL, and how to design a demo that works even when the live integration doesn't."

- slug: "hybrid-database-food-delivery"
  featured: false
  title: "Food Delivery System — Hybrid Databases"
  category: "Academic"
  status: "Learning"
  thumbnail: "TODO_USER"
  summary: "A DBMS mini-project that uses MySQL on AWS RDS for orders and payments and MongoDB for menus and event logs, each where it fits best."
  tags: ["MySQL (AWS RDS)", "MongoDB Atlas", "Node.js", "Express", "React", "MUI"]
  links: { live: "TODO_USER", github: "https://github.com/Harshal-ydv/DBMS-Hybrid-Databases", article: "TODO_USER" }
  problem: "Using one database for everything is easy but rarely right. I wanted to show why transactional data and flexible data belong in different places."   # DRAFT_VERIFY
  solution: "Orders, payments and users live in MySQL on AWS RDS (3NF schema, transactions, a trigger, a view and a stored procedure). Menus, reviews and event logs live in MongoDB (embedded documents, aggregations, indexes). Four roles (customer, restaurant, delivery partner, admin) use a React front-end over a Node/Express API."
  techStack: ["MySQL 8 on AWS RDS", "MongoDB Atlas", "Node.js + Express", "React + Material-UI", "Recharts"]
  role: "Designed the schema, wrote the backend and documented the project for the DBMS course."   # DRAFT_VERIFY
  learned: "ACID transactions, normalisation, polyglot persistence, and why a trigger can save you from inconsistent data."
```

---

## 5. `content/certifications.ts`

I could not read the Credly pages (they load with JavaScript), so only the **confirmed** AWS certification is filled in. Dates, badge titles and images must come from the owner.

```yaml
- title: "AWS Certified Cloud Practitioner"
  issuer: "Amazon Web Services"
  date: "TODO_USER"                                          # month/year from Credly
  image: "TODO_USER"
  credentialUrl: "https://www.credly.com/users/harshal-yadav.70e0e87f"   # replace with the direct badge link if available
  description: "Foundational validation of AWS Cloud concepts, core services, security, architecture and pricing."
  type: "Certification"

- title: "TODO_USER — Google Skills badge #1"
  issuer: "Google Cloud Skills Boost"
  date: "TODO_USER"
  image: "TODO_USER"
  credentialUrl: "https://www.credly.com/users/harshal-yadav.1954b905"
  description: "TODO_USER"
  type: "Badge"

- title: "TODO_USER — Google Skills badge #2"
  issuer: "Google Cloud Skills Boost"
  date: "TODO_USER"
  image: "TODO_USER"
  credentialUrl: "https://www.credly.com/users/harshal-yadav.1954b905"
  description: "TODO_USER"
  type: "Badge"
```

> Owner: pick your 2 strongest Google badges (or 3 for a third card) and send title + month/year. Filters: **Certification · Badge**.

---

## 6. `content/experience.ts`

```yaml
experience:
  - period: "2026 – Present"
    title: "Core Team Member"
    organization: "AWS Student Builder Group · JSPM RSCOE"
    location: "Pune, India"
    bullets:
      - "Led and organized cloud events, summits and bootcamps reaching 300+ student participants."
      - "Mentored 50+ beginners in AWS fundamentals and cloud certification preparation."
      - "Planned and ran the AWS Technical Session (14 Jul 2026): built the presentation, designed the session flow and coordinated with the core team."
      - "Organized the AWS SURGE hands-on workshop (9 Oct 2026): planned the content, ran a live practical demo, and designed and distributed certificates."
      - "Led the club recruitment drive (6 Aug 2026), presenting in Second Year classes and preparing the interview process."
      - "Planned AWS Student Community Day and welcomed new members (17 Oct 2026)."
    tags: ["AWS", "Workshops", "Mentoring", "Event Planning", "Community"]
  - period: "2025 – Present"
    title: "Cloud Coordinator"
    organization: "Google Developer Groups on Campus (GDGC)"
    location: "Pune, India"
    bullets:
      - "Coordinated cloud workshops, hackathons and learning sessions, including Google Skill Boost 2025 and HackNova Hackathon 2026."
      - "Guided students through cloud fundamentals, GCP deployment practices and hands-on labs."
    tags: ["GCP", "Cloud Workshops", "Hackathons", "Mentoring"]

education:
  - period: "2024 – 2028"
    degree: "B.Tech in Information Technology"
    institution: "JSPM's Rajarshi Shahu College of Engineering (RSCOE), Pune"
    score: "CGPA 9.44 (third year)"
    notes: "Core subjects: DSA, OOP, Operating Systems, Networking, DBMS, Cloud Computing."   # DRAFT_VERIFY

achievements:                                                # shown in the "Achievements" tab; highlight = true are shown first
  - { date: "1 Aug 2026", highlight: true,  title: "Second Prize, AI Track — Logic Loop Hackathon (Data Axle × HackDriven)", detail: "Built an AI-powered recruitment platform for the theme 'AI Recruitment Ecosystem' at the DataAxle office, Pune.", image: "TODO_USER" }
  - { date: "10 Sep 2026", highlight: true, title: "Selected at Institute Level — Smart India Hackathon 2026", detail: "Problem statement 26054: AI-enabled real-time digital twin for health monitoring and fault prediction of aero piston engines in MALE UAVs.", image: "TODO_USER" }
  - { date: "19 Sep 2026", highlight: true, title: "AWS Future Builders Connect — Pune", detail: "Took part in Builder Challenges (Human Claw, Giant Jenga, Tetris, Build the Stack), won AWS goodies, and attended workshops on ECS & Containers, Kiro and Amazon Bedrock.", image: "TODO_USER" }
  - { date: "11–12 Sep 2026", highlight: true, title: "Certificate of Appreciation — KURUKSHETRA 2.0 HackFest", detail: "National-level 24-hour hackathon at MIT Arts, Commerce & Science College, Alandi, Pune.", image: "TODO_USER" }
  - { date: "10 Jul 2026", highlight: true, title: "Bharatiya Antariksh Hackathon 2026 (ISRO × Hack2skill)", detail: "Successfully submitted an idea for a real-world space challenge. Certificate of Participation.", image: "TODO_USER" }
  - { date: "16 Jul 2026", highlight: false, title: "Zero to One AI Hackathon — Pocket FM", detail: "Explored AI story generation and prompt engineering.", image: "TODO_USER" }
  - { date: "14 Aug 2026", highlight: false, title: "Hackers Occupied Pune 2026", detail: "Hackathon participation.", image: "TODO_USER" }
  - { date: "31 Aug 2026", highlight: false, title: "Snowflake session on Agents & Governed AI", detail: "Attended the technical session.", image: "TODO_USER" }          # deck spells it "Snowflex"; corrected to Snowflake
  - { date: "5 Oct 2026",  highlight: false, title: "IMPACT 2026 — Department of IT, RSCOE", detail: "Participated in events including a memory-management game. Certificate of Participation.", image: "TODO_USER" }
  - { date: "12 Oct 2026", highlight: false, title: "Hacktoberfest 2026", detail: "Completed the weekly challenges and tasks and attended the sessions.", image: "TODO_USER" }
  - { date: "15 Oct 2026", highlight: false, title: "Tech for Tomorrow Hackathon", detail: "Hackathon participation.", image: "TODO_USER" }
```

---

## 7. `content/contact.ts`

```yaml
intro: "Open to cloud and DevOps internships, hackathon teams and community collaborations. Send me a note and I'll get back to you within a day or two."   # DRAFT_VERIFY
email: "harshal53076ydv@gmail.com"
location: "Pune, Maharashtra, India"
formEndpoint: ""        # empty for now: the form must use the honest mailto fallback (see Doc 1 §10.8)
calendarLink: ""        # not provided
```

---

## 8. `content/moods/developer.ts` (Phase 2)

```yaml
setup:                                                       # DRAFT_VERIFY / TODO_USER: confirm your real setup
  os: "Windows 11 + WSL2 (Ubuntu)"
  editor: "VS Code"
  shell: "bash (WSL) / PowerShell"
  stackNow: "Python · Node.js · AWS"
currentFocus: "Building on AWS and learning cloud architecture & DevOps"
statusLine: "Open to cloud & DevOps internships · Pune, IN"  # for about.md header comment
secretFact: "Every AWS bug I've fixed so far was one of three things: IAM, CORS or a timeout."   # DRAFT_VERIFY
hireMeLine: "Permission granted. Email harshal53076ydv@gmail.com and let's build something on AWS."
catchphrase: "Check IAM first."

bugs:                                                        # DRAFT_VERIFY — grounded in the real stack of each project; edit times/details to match your memory
  - id: "bug-001"
    title: "200 in Postman, red in the browser"
    project: "Cloud Fun Facts Generator"
    severity: "error"
    symptom: "The API returned a fact every time in Postman. The moment my Amplify page called it, the browser console turned red: 'blocked by CORS policy'."
    rootCause: "Postman doesn't enforce CORS; browsers do. API Gateway wasn't sending the allowed-origin header for my Amplify domain, so the browser threw away a response that Lambda had produced perfectly."
    fix: "Enabled CORS on the API Gateway route for the Amplify origin and returned the matching headers from the Lambda response too."
    lesson: "If it works in Postman but not in the browser, stop blaming the backend and open the Network tab."
    timeToFix: "about 1.5 hours"
  - id: "bug-002"
    title: "Bedrock made my Lambda time out"
    project: "Cloud Fun Facts Generator"
    severity: "warning"
    symptom: "Now and then the button showed an error, and CloudWatch said 'Task timed out after 3.00 seconds'."
    rootCause: "A new Lambda function has a 3-second default timeout. A call to Claude on Bedrock can take longer, especially after the function has been idle."
    fix: "Raised the timeout to 30 seconds and added a loading state on the page so the wait doesn't look like a failure."
    lesson: "GenAI calls are slower than normal API calls. Set timeouts on purpose, not by default."
    timeToFix: "about 40 minutes"
  - id: "bug-003"
    title: "My Lambda was denied by its own role"
    project: "Swift Rydes"
    severity: "error"
    symptom: "Ride requests returned a 500, and CloudWatch showed an AccessDeniedException coming from DynamoDB."
    rootCause: "The Lambda's execution role could write logs but had no permission to write to the Rides table."
    fix: "Added an inline policy that allows dynamodb:PutItem, scoped to the Rides table instead of every table."
    lesson: "Check IAM first. Then grant the smallest permission that works."
    timeToFix: "about 1 hour"
  - id: "bug-004"
    title: "502 Bad Gateway after deploying to EC2"
    project: "ProofTalk (ViCodathon)"
    severity: "error"
    symptom: "Nginx served the React app fine, but every interview request came back as 502 Bad Gateway."
    rootCause: "Nginx was proxying /api to FastAPI on port 8000, but FastAPI had crashed on startup because the Groq API key wasn't set in its environment."
    fix: "Read the service logs with journalctl, spotted the missing key, set it through the systemd unit created by the setup script, and restarted the service."
    lesson: "A 502 means the proxy is fine and the app behind it is dead. Read the app logs first."
    timeToFix: "about 2 hours"

debugFlow:                                                   # DRAFT_VERIFY — example uses bug-001
  - { step: "Reproduce", text: "Same request, two clients: it worked in Postman and failed in the browser. That alone ruled out the Lambda logic." }
  - { step: "Isolate",   text: "Opened the browser's Network tab and found the request failing at the preflight (OPTIONS) check, before my code even ran." }
  - { step: "Hypothesize", text: "The API wasn't returning the CORS headers the browser expects for my Amplify origin." }
  - { step: "Fix",       text: "Enabled CORS for that origin on API Gateway and returned the headers from Lambda as well." }
  - { step: "Verify",    text: "Reloaded the page, saw a fact and a clean console, then tested again from a second device." }

findTheBug:                                                  # 3 snippets; the 3rd is COULD
  - id: "ftb-1"
    language: "python"
    title: "The silent CORS typo"
    code: |
      def lambda_handler(event, context):
          fact = pick_random_fact()
          return {
              "statusCode": 200,
              "headers": {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origins": "*"
              },
              "body": json.dumps({"fact": fact})
          }
    bugLine: 7
    hint: "The status is 200 but the browser still refuses the response. Read the header name very carefully."
    explanation: "The header is Access-Control-Allow-Origin (singular). The extra 's' makes the browser ignore it, so CORS fails even though Lambda succeeded."
  - id: "ftb-2"
    language: "json"
    title: "A permission that doesn't match the code"
    code: |
      {
        "Version": "2012-10-17",
        "Statement": [{
          "Effect": "Allow",
          "Action": "dynamodb:GetItem",
          "Resource": "arn:aws:dynamodb:*:*:table/CloudFacts"
        }]
      }
      // The Lambda code calls table.scan()
    bugLine: 5
    hint: "Compare the allowed action with the call the code actually makes."
    explanation: "The code calls Scan but the policy only allows GetItem, which gives an AccessDeniedException. Allow dynamodb:Scan, or read-only access scoped to that table."
  - id: "ftb-3"                                               # COULD
    language: "javascript"
    title: "The game timer that ends instantly"
    code: |
      function startTimer() {
        let timeLeft = 90;
        timer = setInterval(() => {
          timeLeft--;
          if (timeLeft = 0) endGame();
        }, 1000);
      }
    bugLine: 5
    hint: "One character separates asking a question from giving an order."
    explanation: "`timeLeft = 0` assigns instead of comparing, so the game ends on the first tick. It should be `timeLeft <= 0`."

gitLog:                                                      # DRAFT_VERIFY — dates are years only unless known
  - { hash: "a1b2c3d", date: "2024",    message: "init: joined RSCOE, wrote my first C program", detail: "The compiler was right. I was wrong. Repeatedly." }
  - { hash: "b2c3d4e", date: "2024",    message: "feat: DSA and OOP, learned to love the debugger", detail: "Print statements are fine, but breakpoints are better." }
  - { hash: "c3d4e5f", date: "2025",    message: "feat: Python and the data stack (NumPy, Pandas, scikit-learn)", detail: "First time code found a pattern I couldn't see." }
  - { hash: "d4e5f6a", date: "2025",    message: "feat: became Cloud Coordinator at GDGC", detail: "Teaching GCP labs taught me more than any video." }
  - { hash: "e5f6a7b", date: "TODO_USER", message: "feat: AWS Certified Cloud Practitioner", detail: "The start of a much longer AWS plan." }
  - { hash: "f6a7b8c", date: "2026",    message: "feat: first serverless app on Lambda + Bedrock ($0.03)", detail: "Zero servers, one very small bill." }
  - { hash: "a7b8c9d", date: "2026",    message: "merge: joined the AWS Student Builder Group core team", detail: "From learner to someone who explains." }
  - { hash: "b8c9d0e", date: "2026",    message: "fix: stopped being scared of IAM policies", detail: "Still read every error message twice." }
  - { hash: "HEAD",    date: "Nov 2026", message: "feat: building this portfolio for the AWS Student Builder Challenge", detail: "Currently on: cloud architecture and DevOps." }

buildLog: []     # TODO_USER: the owner fills this AFTER the site is deployed (one honest line per step). The agent must not invent entries.
```

---

## 9. `content/moods/anime.ts` (Phase 3)

Ranking is the owner's order of **liking**. Facts (year, studio, episodes) must be verified by the agent; personal fields are `DRAFT_VERIFY` for the owner to edit. Poster files are `TODO_USER` (the owner supplies edited posters/cut-outs). Quiz tag values: **mood** = hyped / emotional / chill / mind-bending · **time** = short / medium / long · **taste** = action / story / comedy / dark.

```yaml
totalWatched: "TODO_USER (e.g. 40+)"
topGenre: "Shonen / Action"
watcherLine: "Since first year, one episode at a time."       # DRAFT_VERIFY
credits:
  - "Character art in this mood is fan art and wallpapers collected via Pinterest, edited by the owner. Original artists are credited where known."
  - "All characters and series are © their respective creators, studios and publishers."
  # TODO_USER: add individual artist names/links if known

anime:
  - rank: 1
    title: "Demon Slayer: Kimetsu no Yaiba"
    year: "2019 –"; studio: "Ufotable"; episodes: "26 (Season 1) + films and later seasons"
    genres: ["Action", "Dark Fantasy", "Shonen"]
    accent: ["#1F8A4C", "#FF6B2C"]
    poster: "TODO_USER"
    rating: 9.5
    reviewSpoilerFree: "The most beautiful anime I've watched. Ufotable makes every fight look like a painting in motion, and underneath the polish is a simple, warm story about a brother who refuses to give up on his sister."
    reviewFull: "Tanjiro is my favourite kind of hero: not the strongest, just the kindest and the most stubborn. Even the demons get a moment of humanity, which makes the fights hurt more. A series that can make you emotional about a villain's last moment is doing something right."
    experience: "I meant to watch an episode or two and finished the first season in about two sittings. I've replayed the Hinokami Kagura scenes more times than I'll admit."
    recommendTo: "Anyone new to anime, and anyone who likes big emotions with jaw-dropping visuals."
    watchIfYouLike: ["Jujutsu Kaisen", "Bleach: Thousand-Year Blood War"]
    favouriteMoment: "The Hinokami Kagura fire-dance scenes: animation at its absolute best."
    tier: "S"
    tags: { mood: ["hyped", "emotional"], time: "medium", taste: ["action", "story"] }
    watchOrder: 3
    quizReason: "You want beauty, heart and huge fights in one package."
  - rank: 2
    title: "Attack on Titan"
    year: "2013 – 2023"; studio: "Wit Studio, MAPPA"; episodes: "87"
    genres: ["Action", "Dark Fantasy", "Drama"]
    accent: ["#C2410C", "#556B2F"]
    poster: "TODO_USER"
    rating: 9.4
    reviewSpoilerFree: "The story that kept me thinking long after each episode ended. It starts as survival against giants and slowly becomes something much bigger and more uncomfortable."
    reviewFull: "Nothing is what it first seems, and that's the genius. The world keeps getting wider and every character turns out to have a reason. It taught me that good writing plants things early and pays them off years later."
    experience: "I was glued to it. Every cliffhanger made me open the next episode right away, even on nights I should have been studying."
    recommendTo: "Viewers who love mystery, twists and stories that don't play it safe."
    watchIfYouLike: ["Death Note", "Hunter × Hunter"]
    favouriteMoment: "Any scene where Levi enters the fight. Pure speed and style."
    tier: "S"
    tags: { mood: ["mind-bending", "emotional"], time: "long", taste: ["story", "dark"] }
    watchOrder: 5
    quizReason: "You want a story that makes you think and keeps you hooked."
  - rank: 3
    title: "Naruto"
    year: "2002 – 2007 (+ Shippuden 2007 – 2017)"; studio: "Pierrot"; episodes: "220 + 500 (Shippuden)"
    genres: ["Action", "Adventure", "Shonen"]
    accent: ["#FF8A00", "#1B1B1B"]
    poster: "TODO_USER"
    rating: 9.3
    reviewSpoilerFree: "The anime that taught a whole generation that hard work can beat talent. It's long, a little dramatic and I love every minute."
    reviewFull: "Naruto fails a lot, gets laughed at and keeps going anyway. That stubbornness is why it hit me. The friendships and rivalries carry the story as much as the fights do."
    experience: "I watched it in long bursts between semesters. The theme songs are still stuck in my head."
    recommendTo: "Anyone who needs motivation, and anyone ready for a long, rewarding journey."
    watchIfYouLike: ["One Piece", "Bleach"]
    favouriteMoment: "Naruto's Rasengan training: failure after failure, then it finally works."
    tier: "S"
    tags: { mood: ["hyped", "emotional"], time: "long", taste: ["action", "comedy", "story"] }
    watchOrder: 7
    quizReason: "You want a long adventure about never giving up."
  - rank: 4
    title: "Jujutsu Kaisen"
    year: "2020 –"; studio: "MAPPA"; episodes: "24 (Season 1) + Season 2 and film"
    genres: ["Action", "Dark Fantasy", "Supernatural"]
    accent: ["#5BC0FF", "#7C5CFF"]
    poster: "TODO_USER"
    rating: 9.1
    reviewSpoilerFree: "Fast, stylish and unapologetically cool. The fights are creative and the characters have real personality."
    reviewFull: "It balances humour and darkness really well, and the way every curse technique has its own rules makes the battles feel like puzzles. Gojo alone is worth the watch."
    experience: "I finished it quicker than I planned. The animation made me rewind more than once."
    recommendTo: "Fans of modern action anime who like smart fights."
    watchIfYouLike: ["Demon Slayer", "Bleach: Thousand-Year Blood War"]
    favouriteMoment: "Gojo showing up when things look hopeless."
    tier: "A"
    tags: { mood: ["hyped"], time: "medium", taste: ["action", "dark"] }
    watchOrder: 4
    quizReason: "You want stylish, clever fights with a darker edge."
  - rank: 5
    title: "Death Note"
    year: "2006 – 2007"; studio: "Madhouse"; episodes: "37"
    genres: ["Mystery", "Psychological Thriller", "Supernatural"]
    accent: ["#C1121F", "#0B0B0B"]
    poster: "TODO_USER"
    rating: 9.0
    reviewSpoilerFree: "A mind game from start to finish. Every episode is two geniuses trying to outthink each other."
    reviewFull: "It's less about the notebook and more about planning, deception and consequences. Watching two people think three steps ahead of each other is oddly relaxing, and it made me think about plans with a single point of failure."
    experience: "I watched it with the lights low and my phone far away. I wanted to understand every move."
    recommendTo: "Anyone who loves thrillers, strategy and tense conversations."
    watchIfYouLike: ["Attack on Titan", "Hunter × Hunter"]
    favouriteMoment: "The first time the two main minds really face each other."
    tier: "A"
    tags: { mood: ["mind-bending"], time: "medium", taste: ["story", "dark"] }
    watchOrder: 2
    quizReason: "You want a smart, tense thriller you can finish in a weekend."
  - rank: 6
    title: "One Piece"
    year: "1999 –"; studio: "Toei Animation"; episodes: "1,100+ (ongoing)"
    genres: ["Adventure", "Action", "Comedy"]
    accent: ["#E63946", "#F4C430"]
    poster: "TODO_USER"
    rating: 8.9
    reviewSpoilerFree: "The biggest adventure in anime. It's huge and silly and sincere, and its world-building is unmatched."
    reviewFull: "The crew is a perfect team: everyone has a role, a dream and a weakness, and they cover for each other. That's the best lesson in teamwork I've seen in any show."
    experience: "I'm still catching up. It's a long road, but the ending of every arc makes it worth it."
    recommendTo: "People who love adventure, friendship and a story that never rushes."
    watchIfYouLike: ["Naruto", "Hunter × Hunter"]
    favouriteMoment: "Any time the crew stands together against something much bigger."
    tier: "A"
    tags: { mood: ["hyped", "emotional"], time: "long", taste: ["comedy", "story", "action"] }
    watchOrder: 10
    quizReason: "You want a world to live in for months, with friends who feel real."
  - rank: 7
    title: "Spirited Away"
    year: "2001"; studio: "Studio Ghibli"; episodes: "Film, about 2 hours"
    genres: ["Fantasy", "Adventure", "Family"]
    accent: ["#7FB7BE", "#F2C078"]
    poster: "TODO_USER"
    rating: 8.9
    reviewSpoilerFree: "A calm, beautiful film that feels like a dream you don't want to wake up from."
    reviewFull: "It shows a scared child slowly learning to be brave, and it never has to shout to say it. Ghibli's world is full of odd little details that you notice more on the second watch."
    experience: "My break from long series: two hours, no cliffhanger, and a good mood afterwards."
    recommendTo: "Anyone who wants a gentle, beautiful watch, or who thinks anime is only fights."
    watchIfYouLike: ["Any Studio Ghibli film"]
    favouriteMoment: "The train scene: quiet, simple and perfect."
    tier: "A"
    tags: { mood: ["chill", "emotional"], time: "short", taste: ["story"] }
    watchOrder: 1
    quizReason: "You want something calm and beautiful that fits in one evening."
  - rank: 8
    title: "Dragon Ball Z"
    year: "1989 – 1996"; studio: "Toei Animation"; episodes: "291"
    genres: ["Action", "Martial Arts", "Sci-Fi"]
    accent: ["#1E6BFF", "#FFC400"]
    poster: "TODO_USER"
    rating: 8.8
    reviewSpoilerFree: "Where it all started for a lot of us. Loud, over the top and full of power-ups."
    reviewFull: "The pacing is slow and the screaming goes on for episodes, but the hype is real. It set the template for almost every action anime that came after."
    experience: "Pure nostalgia. I enjoy it the way I enjoy old songs."
    recommendTo: "Fans of classic action and anyone curious about anime history."
    watchIfYouLike: ["Naruto", "Bleach"]
    favouriteMoment: "The first Super Saiyan transformation."
    tier: "B"
    tags: { mood: ["hyped"], time: "long", taste: ["action", "comedy"] }
    watchOrder: 9
    quizReason: "You want pure, nostalgic, high-energy action."
  - rank: 9
    title: "Hunter × Hunter (2011)"
    year: "2011 – 2014"; studio: "Madhouse"; episodes: "148"
    genres: ["Adventure", "Fantasy", "Action"]
    accent: ["#2E9E5B", "#F4C430"]
    poster: "TODO_USER"
    rating: 8.7
    reviewSpoilerFree: "A smart adventure with some of the best-designed rules and strategy in anime."
    reviewFull: "The power system, Nen, is built on restrictions: the more you limit yourself, the stronger you get. It reminded me of least-privilege thinking in IAM. Every arc feels different and the writing respects the viewer."
    experience: "It rewards patience. The slow bits set up some of the best payoffs I've seen."
    recommendTo: "Strategy lovers and viewers who enjoy clever systems."
    watchIfYouLike: ["Death Note", "Attack on Titan"]
    favouriteMoment: "Any arc where a plan is built from the rules of the world."
    tier: "B"
    tags: { mood: ["mind-bending", "hyped"], time: "long", taste: ["story", "action"] }
    watchOrder: 6
    quizReason: "You want smart strategy and a world with real rules."
  - rank: 10
    title: "Bleach: Thousand-Year Blood War"
    year: "2022 –"; studio: "Pierrot"; episodes: "multi-cour, ongoing"
    genres: ["Action", "Supernatural", "Shonen"]
    accent: ["#F58220", "#0B0B0B"]
    poster: "TODO_USER"
    rating: 8.5
    reviewSpoilerFree: "The comeback after a decade: sharp art, stylish black-and-white design and a big, dramatic return."
    reviewFull: "It looks incredible and it's full of fan-service in the best way. The style of every frame feels like a poster. It rewards people who know the old Bleach, but the action is easy to enjoy."
    experience: "I watched it weekly as it aired and loved the wait between episodes."
    recommendTo: "Action fans who like strong style and big showdowns."
    watchIfYouLike: ["Jujutsu Kaisen", "Demon Slayer"]
    favouriteMoment: "The big entrances: every one is framed like a poster."
    tier: "B"
    tags: { mood: ["hyped"], time: "medium", taste: ["action", "dark"] }
    watchOrder: 8
    quizReason: "You want slick, stylish showdowns."

lessons:                                                     # DRAFT_VERIFY
  - { anime: "Naruto", title: "Failing builds are part of the training arc", text: "Naruto fails a hundred times before the Rasengan works. My first Lambda deploys looked exactly the same. The only difference between 'it doesn't work' and 'it works' is another try." }
  - { anime: "Demon Slayer", title: "Fundamentals compound", text: "Tanjiro's power comes from repeating the basics until they're automatic. For me that's reading the CloudWatch logs and checking IAM first, every time." }
  - { anime: "Hunter × Hunter", title: "Restrictions make you stronger", text: "Nen gets powerful when you accept limits. It's the same idea as least-privilege IAM: give the smallest permission that works, and the whole system gets safer." }
  - { anime: "One Piece", title: "Build a crew, not a hero", text: "The Straw Hats win because every member covers a different gap. Good cloud projects work the same way: each service does one job well and trusts the others." }

watching: []     # TODO_USER (optional): [{ title, note }]
queue: []        # TODO_USER (optional): [{ title, note }]
```

---

## 10. `content/moods/festival.ts` (Phase 4)

```yaml
greeting: "Shubh Deepavali! Come in, light a few diyas, and I'll show you how a cloud student celebrates the festival of lights."   # DRAFT_VERIFY

stories:                                                     # DRAFT_VERIFY: personal memories drafted around a typical Maharashtrian Diwali; edit to match yours
  - id: 1
    title: "The Great Cleaning"
    text: "About two weeks before Diwali, our house turns into a renovation site. Every cupboard is emptied, every shelf dusted, and somehow I always end up reading old school notebooks instead of helping. Then comes my favourite part: hanging the akash kandil outside, a glowing paper lantern that tells the whole street the festival has begun. The house smells of fresh paint and soap, and for once nobody minds the chaos. It's like refactoring old code: painful while you're doing it, wonderful once it's done."
    takeaway: "A fresh start always begins with a clean-up."
  - id: 2
    title: "Rangoli at the Door"
    text: "Every year the doorstep becomes a canvas. We start with dots, join them with lines, and then comes the colour. Mine are never as neat as mom's, but I've learned to love the symmetry: every petal needs a matching twin, like a good architecture diagram. By evening the diyas go around the rangoli and the whole entrance glows. It takes an hour to make and one careless footstep to ruin, so everyone walks around it very carefully."
    takeaway: "Patience makes patterns."
  - id: 3
    title: "Faral and the Sweet Math"
    text: "Diwali food in Maharashtra has its own name: faral. Chakli, karanji, shankarpali, anarse and ladoos, all made at home over a few days. I'm the official taste tester, which I take very seriously. There's real logic to it: the first karanji out of the pan is always a test batch, and tests must be checked thoroughly. By the time guests arrive, there are boxes of faral to share, and nobody leaves without one."
    takeaway: "Good things are made slowly and shared quickly."
  - id: 4
    title: "Friends, Fire and Fireworks"
    text: "After Lakshmi Pujan in the evening, the street comes alive. Friends show up, everyone compares their stash, and we light things one by one: sparklers, flowerpots, rockets from the terrace and a few bhuchakras. I stick to the quieter crackers and keep a bucket of water close, because safe fun is better fun. We laugh, take too many photos and eat sweets between rounds. These are the nights I remember long after the smoke clears."
    takeaway: "The best memories come from people, not things."
  - id: 5
    title: "After the Lights"
    text: "Once the last diya burns down, the house goes quiet and the holidays begin. This is honestly my favourite part. No assignments, no deadlines, just peaceful days to learn what I couldn't fit into the semester: a new AWS service, a project I've been postponing. Diwali taught me that light isn't only about celebration, it's also about starting fresh. Every year I try to light one new skill along with the diyas."
    takeaway: "Light a new skill every Diwali."
  # TODO_USER: replace any story with your own memory if you prefer. Keep 60–120 words each.
  # photo: optional per story (TODO_USER)

finaleMessage: "May your diyas stay lit, your deployments stay green, and your Diwali be full of light, sweets and good people. Shubh Deepavali!"   # DRAFT_VERIFY

skillUp:                                                     # DRAFT_VERIFY — for "Planned" items, `learned` is the GOAL
  - { topic: "Finish and polish this portfolio", status: "In progress", learned: "How to ship a fast static site that carries three full themes without slowing down.", link: "TODO_USER" }
  - { topic: "Infrastructure as Code", status: "Planned", learned: "Goal: describe my S3 + CloudFront setup as code instead of clicking through the console.", link: "" }
  - { topic: "AWS Solutions Architect – Associate prep", status: "Planned", learned: "Goal: move from knowing services to designing systems that are secure, resilient and cost-aware.", link: "" }
  - { topic: "Containers on Amazon ECS", status: "Planned", learned: "Goal: containerize ProofTalk and run it on ECS, building on the ECS workshop I attended at Future Builders Connect.", link: "" }
  - { topic: "CI/CD with GitHub Actions", status: "Planned", learned: "Goal: build, test and deploy a project on every push.", link: "" }

halloweenTreat: "Trick or treat! The scariest thing on my AWS bill so far is $0.03, and I earned it by asking Claude on Bedrock to be funny."   # DRAFT_VERIFY
photos: []       # TODO_USER (optional)
```

---

## 11. `content/moods/*` — page heading intro lines

The agent may draft one short, personality-free sentence per page per mood (Doc 1 §9.3). No personal claims, no invented facts.

---

## 12. Open items for the owner (quick list)

1. Real photo and project screenshots (placeholders are used until then).
2. AWS Certified Cloud Practitioner: month/year and, if possible, the direct Credly badge link.
3. Titles and dates of your 2–3 Google Skills badges.
4. Live URLs: Cloud Fun Facts (Amplify), Memory Game (S3), Swift Rydes, and confirm the ProofTalk EC2 demo is still running.
5. Confirm club name: "AWS Student Builder Group" or "AWS Student Developer Group".
6. Read and edit every `DRAFT_VERIFY` item, especially the anime ratings and reviews, the Diwali stories, the bug diary and the "problem / role" lines of each project.
7. Your real setup (OS, editor, shell) and a total anime count (`totalWatched`).
8. Confirm whether ProofTalk and RespondNow were solo or team projects, so the role lines are accurate.

*End of Doc 2.*
