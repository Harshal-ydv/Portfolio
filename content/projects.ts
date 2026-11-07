export type Project = {
  slug: string; title: string; category: string; status: string; summary: string; tags: string[]; image?: string;
  github?: string; live?: string; featured?: boolean; problem: string; solution: string; techStack: string[]; role: string; learned: string;
};

export const projects: Project[] = [
  {
    slug: "cloud-fun-facts-generator", image: "/projects/cloud-fun-facts-generator.png", featured: true, title: "Cloud Fun Facts Generator", category: "Cloud", status: "Live",
    summary: "A fully serverless app that pulls a cloud fact from DynamoDB and has Claude on Amazon Bedrock rephrase it with a witty twist.",
    tags: ["Lambda", "API Gateway", "DynamoDB", "Bedrock", "Amplify", "IAM"], github: "https://github.com/Harshal-ydv/Cloud-fun-facts-generator",
    problem: "Cloud facts are usually dry. I wanted to see how far I could get building a complete AWS app, backend, database, GenAI and frontend, without managing a single server.",
    solution: "A Lambda function fetches a random fact from DynamoDB and sends it to Claude 3 Sonnet on Bedrock, which rewrites it in one or two fun sentences. API Gateway exposes it as an HTTP endpoint and a responsive page on AWS Amplify (HTTPS + CDN) shows it with loading and error states.",
    techStack: ["AWS Lambda (Python)", "Amazon API Gateway", "Amazon DynamoDB", "Amazon Bedrock (Claude 3 Sonnet)", "AWS Amplify", "AWS IAM"],
    role: "Solo build: architecture, backend, IAM permissions and frontend.", learned: "How serverless pieces talk to each other, how least-privilege IAM works, and why GenAI calls need generous timeouts. The whole project cost about $0.03, almost all of it Bedrock.",
  },
  {
    slug: "prooftalk-ai-interview-agent", image: "/projects/prooftalk-ai-interview-agent.png", title: "ProofTalk — AI Interview Agent", category: "Hackathon", status: "Demo to verify",
    summary: "An AI interviewer that adapts questions to a candidate's real 31-day learning journey instead of using a generic question bank.",
    tags: ["FastAPI", "React", "Groq", "AWS EC2", "Nginx", "systemd"], github: "https://github.com/Harshal-ydv/ViCodathon-ABTalks",
    problem: "Interview questions are usually random and ignore what a candidate actually practised. For ABtalks ViCodathon 2026, the challenge was to build the interviewer, not the interview.",
    solution: "A planner reads each candidate's missions and sorts topics into confident, struggled and skipped, then builds a focused 8-question plan. An evaluator checks each answer, asks a follow-up if it's weak, and finishes with a feedback report of strengths, gaps and next steps. Text mode and a TruGen AI video-avatar mode are both supported. Deployed on an EC2 t2.micro behind Nginx.",
    techStack: ["Python 3.11 + FastAPI", "React 18 + Vite", "Groq API (Llama 3.3 70B)", "TruGen AI avatar", "AWS EC2 (Ubuntu 24.04)", "Nginx", "systemd"],
    role: "Built and deployed the project for the hackathon (backend orchestration, frontend, EC2 setup).", learned: "Prompting for evaluation is harder than prompting for answers, and a 502 from Nginx usually means the app behind it is down. Read the logs first.",
  },
  {
    slug: "aws-memory-management-game", image: "/projects/aws-memory-management-game.png", title: "AWS Memory Management Game", category: "Cloud", status: "Live",
    summary: "A card-matching game with 12 pairs of AWS service icons, a 90-second timer, scoring and a 2-player mode, deployed automatically on every GitHub push.",
    tags: ["Amazon S3", "CodePipeline", "CodeStar Connections", "IAM", "JavaScript"], github: "https://github.com/Harshal-ydv/Memory-Management-Game",
    problem: "I wanted to learn CI/CD on AWS and make memorising AWS service icons less boring.",
    solution: "A 3×8 card grid with a countdown ring that turns red in the last 15 seconds, +10 points per match and a time bonus in solo mode, plus a 2-player mode. The site is hosted on S3 and AWS CodePipeline (connected to GitHub through CodeStar Connections) redeploys it within about a minute of each push. No build stage was needed for plain HTML, CSS and JS.",
    techStack: ["Amazon S3 static hosting", "AWS CodePipeline", "CodeStar Connections", "AWS IAM", "HTML / CSS / JavaScript"],
    role: "Solo build: game logic, S3 hosting and the CI/CD pipeline.", learned: "How CodePipeline source and deploy stages fit together, why static sites can skip a build stage, and how automated deploys remove human errors. Hosting cost: $0.00.",
  },
  {
    slug: "swift-rydes", image: "/projects/swift-rydes.png", title: "Swift Rydes — Serverless Unicorn Ride App", category: "Learning", status: "Learning",
    summary: "A secure serverless app: sign up, log in, pick a map location and dispatch the nearest unicorn, built on seven AWS services.",
    tags: ["Amplify", "Cognito", "API Gateway", "Lambda", "DynamoDB", "IAM"], github: "https://github.com/Harshal-ydv/swiftrydes-site",
    problem: "I wanted to understand how real serverless apps handle authentication and data, not just return JSON.",
    solution: "Built from a guided serverless workshop template (credited in the repo) and rebuilt service by service: Amplify hosts the frontend and deploys on every push, Cognito issues JWTs, API Gateway validates them with a Cognito authorizer, and a Lambda function writes each ride to DynamoDB.",
    techStack: ["AWS Amplify", "Amazon Cognito", "Amazon API Gateway", "AWS Lambda (Node.js 22)", "Amazon DynamoDB", "AWS IAM"],
    role: "Followed a guided workshop and wired up and debugged every service myself.", learned: "How JWT authorizers protect an API, why a Lambda needs its own IAM permission to write to DynamoDB, and how CloudWatch logs make that obvious.",
  },
  {
    slug: "respondnow-smart-resource-allocation", image: "/projects/respondnow-smart-resource-allocation.png", title: "RespondNow — Smart Resource Allocation System", category: "AI", status: "Learning",
    summary: "Citizens report incidents on WhatsApp with a photo; AI reads it and the incident appears on a map dashboard for faster response.",
    tags: ["React", "Node.js", "PostGIS", "Docker", "Twilio", "OpenAI Vision"], github: "https://github.com/Harshal-ydv/Smart-Resource-Allocation-System",
    problem: "In an emergency, information arrives scattered and late. I wanted to see if a simple WhatsApp message could turn straight into something responders can see and act on.",
    solution: "A visitor or volunteer sends a message or photo to a WhatsApp sandbox number. The backend analyses the image with GPT-4o Vision, stores the incident with its location in PostgreSQL + PostGIS, and the dashboard shows it on a live map. It includes a simulator page for demos and seeded data of 25 incidents and 30 volunteers.",
    techStack: ["React + Vite", "Node.js + Express", "PostgreSQL + PostGIS (Docker)", "Twilio WhatsApp Sandbox", "OpenAI GPT-4o Vision", "ngrok"],
    role: "Full-stack build: backend, geo-database, WhatsApp webhook and dashboard.", learned: "How webhooks work end to end, how geo-queries differ from normal SQL, and how to design a demo that works even when the live integration doesn't.",
  },
  {
    slug: "hybrid-database-food-delivery", image: "/projects/hybrid-database-food-delivery.png", title: "Food Delivery System — Hybrid Databases", category: "Academic", status: "Learning",
    summary: "A DBMS project using MySQL on AWS RDS for orders and payments and MongoDB for menus and event logs.",
    tags: ["MySQL", "AWS RDS", "MongoDB", "Node.js", "React"], github: "https://github.com/Harshal-ydv/DBMS-Hybrid-Databases",
    problem: "Using one database for everything is easy but rarely right. I wanted to show why transactional data and flexible data belong in different places.",
    solution: "Orders, payments and users live in MySQL on AWS RDS (3NF schema, transactions, a trigger, a view and a stored procedure). Menus, reviews and event logs live in MongoDB (embedded documents, aggregations, indexes). Four roles (customer, restaurant, delivery partner, admin) use a React front-end over a Node/Express API.",
    techStack: ["MySQL 8 on AWS RDS", "MongoDB Atlas", "Node.js + Express", "React + Material-UI", "Recharts"],
    role: "Designed the schema, wrote the backend and documented the project for the DBMS course.", learned: "ACID transactions, normalisation, polyglot persistence, and why a trigger can save you from inconsistent data.",
  },
];
