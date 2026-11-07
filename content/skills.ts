type SkillItem = [name: string, note: string, logos?: string[], fallback?: string];

export const skills = {
  categories: [
    {
      name: "AWS Compute & Serverless",
      items: [
        ["AWS Lambda", "Backend for Cloud Fun Facts and Swift Rydes", ["aws-lambda"]],
        ["Amazon EC2", "Hosted my ProofTalk hackathon app on a t2.micro", ["aws-ec2"]],
        ["API Gateway", "HTTP and REST APIs, including a Cognito authorizer", ["aws-api-gateway"]],
        ["AWS Amplify", "Frontend hosting with HTTPS and a global CDN", ["aws-amplify"]],
        ["Elastic Load Balancing", "Traffic distribution in hands-on labs", ["aws-elb"]],
      ],
    },
    {
      name: "AWS Storage, Data & Networking",
      items: [
        ["Amazon S3", "Static hosting for my AWS Memory Management Game", ["aws-s3"]],
        ["Amazon DynamoDB", "Data layer for Cloud Fun Facts and Swift Rydes", ["aws-dynamodb"]],
        ["Amazon RDS", "MySQL on RDS in my hybrid-database DBMS project", ["aws-rds"]],
        ["Amazon CloudFront", "CDN and HTTPS delivery for static sites", ["aws-cloudfront"]],
        ["Amazon VPC", "Subnets, routing and security groups", ["aws-vpc"]],
        ["Amazon Route 53", "DNS and domain routing in labs", ["aws-route53"]],
      ],
    },
    {
      name: "AWS Security, Monitoring & AI",
      items: [
        ["AWS IAM", "Least-privilege roles for every Lambda I ship", ["aws-iam"]],
        ["Amazon Cognito", "User sign-up and JWT auth in Swift Rydes", ["aws-cognito"]],
        ["Amazon CloudWatch", "My first stop when anything breaks", ["aws-cloudwatch"]],
        ["Amazon SNS", "Notifications and event fan-out in labs", ["aws-sns"]],
        ["Amazon Bedrock", "Claude-powered rewrites in Cloud Fun Facts", ["aws-bedrock"]],
      ],
    },
    {
      name: "DevOps & Delivery",
      items: [
        ["AWS CodePipeline", "Push to GitHub, live on S3 in under a minute", ["aws-codepipeline"]],
        ["CI/CD Engineering", "Automated source-to-deploy pipelines", [], "CI"],
        ["Docker", "Containers for PostGIS in RespondNow", ["docker"]],
        ["Infrastructure as Code", "Concepts and practice, deepening now", [], "IaC"],
        ["Linux Administration", "Nginx and systemd on Ubuntu (EC2)", ["linux"]],
        ["n8n", "Workflow automation", ["n8n"]],
      ],
    },
    {
      name: "Google Cloud",
      items: [
        ["Compute Engine", "VMs in GDGC cloud workshops", ["gcp-compute"]],
        ["Cloud Run", "Serverless containers", ["gcp-cloudrun"]],
        ["Cloud Functions", "Event-driven functions", [], "CF"],
        ["Cloud SQL · Storage · Load Balancing · VPC", "Used while guiding students through GCP labs", ["gcp-cloudsql", "gcp-cloudstorage", "googlecloud"]],
      ],
    },
    {
      name: "Languages",
      items: [
        ["Python", "Lambda functions, FastAPI and data work", ["python"]],
        ["JavaScript", "Frontends and Node.js backends", ["javascript"]],
        ["C / C++", "DSA and fundamentals", ["c", "cplusplus"]],
        ["SQL", "MySQL and PostgreSQL", [], "SQL"],
        ["HTML / CSS", "Every frontend I've built", ["html5", "css3"]],
      ],
    },
    {
      name: "Frameworks, Data & Tools",
      items: [
        ["React", "Frontends for ProofTalk, RespondNow and the DBMS project", ["react"]],
        ["Node.js", "Express backends", ["nodedotjs"]],
        ["FastAPI", "ProofTalk's AI interview backend", ["fastapi"]],
        ["Django", "Backend framework practice", ["django"]],
        ["PostgreSQL + PostGIS", "Geo-queries in RespondNow", ["postgresql"]],
        ["MongoDB", "Flexible data in the hybrid DBMS project", ["mongodb"]],
        ["Pandas · NumPy · scikit-learn · TensorFlow", "Data and ML coursework", ["pandas", "numpy", "scikitlearn", "tensorflow"]],
        ["Git · GitHub · GitLab", "Version control and PR workflow", ["git", "github", "gitlab"]],
        ["Postman · REST APIs", "Testing every endpoint I write", ["postman"]],
      ],
    },
    {
      name: "CS Fundamentals",
      items: [
        ["Data Structures & Algorithms", "Core of my coursework", [], "DSA"],
        ["Operating Systems", "Processes, memory and scheduling", [], "OS"],
        ["Computer Networking", "Foundation for VPC and load balancing", [], "NET"],
        ["OOP", "Design in C++ and Python", [], "OOP"],
      ],
    },
  ] as { name: string; items: SkillItem[] }[],
  learning: ["Cloud Architecture (Well-Architected thinking)", "Amazon ECS & containers", "Infrastructure as Code", "GitHub Actions CI/CD", "AWS Solutions Architect – Associate prep"],
};
