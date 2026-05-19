export type Member = {
  name: string;
  captain: boolean;
};

export type Team = {
  gen_id: string;
  team_name: string;
  members: Member[];
  approved_usecase: string;
  usecase_desc: string;
  mentor: string;
  status: string;
};

export const MILESTONE_DATES = [
  { label: "Registration", date: "19 May" },
  { label: "Use Case Submission", date: "22 May" },
  { label: "50% Build Completion", date: "29 May" },
  { label: "Build Submission", date: "05 Jun" },
  { label: "Shortlisting", date: "07 Jun" },
  { label: "Finals", date: "12 Jun" },
];

export const STATUS_ORDER = MILESTONE_DATES.map((m) => m.label);

export const TEAMS: Team[] = [
  {
    gen_id: "GEN-001",
    team_name: "The Vibe Koders",
    members: [
      { name: "Guru T S", captain: true },
      { name: "Hari Hara Priyan S", captain: false },
      { name: "Naveenkumar Villvanathan", captain: false },
      { name: "Vasanthakumar S", captain: false },
      { name: "Satyam", captain: false },
      { name: "Rishi Kota Vardhan SSS", captain: false },
    ],
    approved_usecase: "PortfolioNarrator - AI-Powered Personalized Portfolio Commentary",
    usecase_desc:
      "An AI-powered portfolio commentary platform that automatically generates personalised quarterly review letters for each HNI client of a wealth management firm or PMS provider. It reads the client's portfolio data, computes returns, compares against benchmark, pulls relevant market context, and produces a fully written, client-ready letter in their preferred language — reducing a 2-week manual process to under 2 hours.",
    mentor: "Kannan Gnanasekaran",
    status: "Registration",
  },
  {
    gen_id: "GEN-002",
    team_name: "Temple Tree",
    members: [
      { name: "Deepanshu Gond", captain: true },
      { name: "Shivani Singh", captain: false },
      { name: "Tanish Kohli", captain: false },
      { name: "Simran Swain", captain: false },
      { name: "Sumit Mittal", captain: false },
      { name: "Arindrajit Maity", captain: false },
    ],
    approved_usecase: "Intelligent Pre-Sales Pitch Assistant",
    usecase_desc:
      "Intelligent Proposal & Pitch Recommendation Engine Based on Historical Delivery Projects",
    mentor: "Nilesh Pandey",
    status: "Registration",
  },
  {
    gen_id: "GEN-003",
    team_name: "Phoenix",
    members: [
      { name: "Prince Kumar", captain: true },
      { name: "Navin K", captain: false },
      { name: "Baljeet Singh", captain: false },
      { name: "Shaik Mahammed Lateef", captain: false },
      { name: "Thanneru Dinesh Kumar", captain: false },
      { name: "Mukul Kumar", captain: false },
    ],
    approved_usecase: "AI-native Talent Representations for Search, Matching, and Career Prediction",
    usecase_desc:
      "The Talent Intelligence Engine transforms resumes and career data into dynamic candidate profiles using AI-powered skill graphs, semantic embeddings, and career trajectory analysis. Instead of simple keyword matching, it uncovers hidden talent, predicts role fit, and enables intelligent candidate discovery through deep contextual understanding.",
    mentor: "Mayuri Mohan Awari",
    status: "Registration",
  },
  {
    gen_id: "GEN-004",
    team_name: "Promptlings",
    members: [
      { name: "Sayantini Sarkar", captain: true },
      { name: "Hirithi Nandha", captain: false },
      { name: "Fathima Devasahayam", captain: false },
      { name: "Kishor Tummod", captain: false },
      { name: "Digvijay Yadav", captain: false },
      { name: "Sireesha S", captain: false },
    ],
    approved_usecase: "Omnichannel Customer Service AI",
    usecase_desc:
      "A multi-agent customer support platform that routes, responds to, and escalates customer messages across WhatsApp, Email, SMS, and Web.",
    mentor: "Nikhil Shankar",
    status: "Registration",
  },
  {
    gen_id: "GEN-005",
    team_name: "The Data Benders",
    members: [
      { name: "Abhijeet Kharche", captain: true },
      { name: "Chinmoy Sahoo", captain: false },
      { name: "Vinay Konkathi", captain: false },
      { name: "Poojitha Madhamsetty", captain: false },
      { name: "Bharath R C", captain: false },
      { name: "Anant Verma", captain: false },
    ],
    approved_usecase: "AI Self-Healing Data Pipeline & Observability Platform",
    usecase_desc:
      "An AI-powered data observability platform designed to monitor enterprise data pipelines in real time, detect anomalies, predict failures, analyze root causes, and automatically suggest or trigger corrective actions. The system improves data reliability, reduces operational downtime, and enables proactive pipeline management.",
    mentor: "Kannan Gnanasekaran",
    status: "Registration",
  },
  {
    gen_id: "GEN-006",
    team_name: "Error 606",
    members: [
      { name: "Renganathan S K", captain: true },
      { name: "Shriram Vayalur S Sunderam", captain: false },
      { name: "Vishnu Gowtham K", captain: false },
      { name: "Prithviram S N", captain: false },
      { name: "Anujkumar B", captain: false },
      { name: "Varsha A", captain: false },
    ],
    approved_usecase: "AI-Powered Data Pipeline Architecture and Cloud Cost Optimization Platform",
    usecase_desc:
      "An intelligent web application that automatically generates data pipeline architectures, cloud cost estimations, and optimization recommendations based on user requirements. The platform collects information such as data source type, processing requirements, preferred cloud platform, storage needs, and expected data volume — then generates a complete end-to-end architecture recommendation, creates architecture diagrams, and integrates cloud pricing APIs to provide estimated infrastructure costs, significantly reducing architecture planning time.",
    mentor: "Nilesh Pandey",
    status: "Registration",
  },
  {
    gen_id: "GEN-007",
    team_name: "Code Sentinel",
    members: [
      { name: "Veera Goutham", captain: true },
      { name: "Sibbala Chandana", captain: false },
      { name: "Shivendra Pandey", captain: false },
      { name: "Kollipara Madhuri Nikhila", captain: false },
      { name: "Sahana Nilangi", captain: false },
      { name: "Kamlesh Reddy", captain: false },
    ],
    approved_usecase: "GenAI Code Review & Documentation Bot for Data Pipelines",
    usecase_desc:
      "A GenAI-powered code review assistant built for data engineering teams that automatically reviews SQL, Python, and Spark pipelines the moment code is submitted. It deploys five specialized AI agents in parallel that auto-generate documentation, flag cost and performance anti-patterns with dollar estimates, catch security vulnerabilities like hardcoded credentials and exposed PII, write unit tests automatically, and map data lineage.",
    mentor: "Mohd Subhani",
    status: "Registration",
  },
  {
    gen_id: "GEN-008",
    team_name: "The Hallucinators",
    members: [
      { name: "Nivethitha J M", captain: true },
      { name: "Harsh Gauttam", captain: false },
      { name: "Aryan Thapa", captain: false },
      { name: "Sumiya Roshan", captain: false },
      { name: "Deepti Srivastava", captain: false },
      { name: "Neha Sarah", captain: false },
    ],
    approved_usecase: "PipelineGuard - AI-Powered Self-Healing Data Pipeline Agent",
    usecase_desc:
      "An AI-powered pipeline monitoring agent that automatically detects failures, diagnoses the root cause by reading logs, recent code commits, and upstream Slack messages, applies the fix or raises a ready-to-merge PR, and writes the post-mortem — all without waking anyone up. Reducing a 2-hour manual firefighting process to under 15 minutes.",
    mentor: "TBD",
    status: "Registration",
  },
  {
    gen_id: "GEN-009",
    team_name: "The Broken Pipelines",
    members: [
      { name: "Anisha Majhi", captain: true },
      { name: "Shoraj Tomer", captain: false },
      { name: "Sheik Harris", captain: false },
      { name: "Nikhil Kumar", captain: false },
      { name: "Nadursha Shaik", captain: false },
    ],
    approved_usecase: "ETL Cost Optimizer AI",
    usecase_desc:
      "An AI-powered agent that builds and optimizes AWS Glue jobs to improve performance and reduce cloud costs. The system automatically recommends Glue configuration, Spark configuration, infrastructure right-sizing, and code-level improvements for PySpark scripts — helping organizations reduce AWS costs, improve ETL performance, minimize failures, and accelerate data engineering productivity through intelligent automation.",
    mentor: "Mohd Subhani",
    status: "Registration",
  },
  {
    gen_id: "GEN-010",
    team_name: "LLManiacs",
    members: [
      { name: "Akash Rathod", captain: true },
      { name: "Udiyaman Shukla", captain: false },
      { name: "Abhishek Patel", captain: false },
      { name: "Lokesh V", captain: false },
      { name: "Shridhar M", captain: false },
    ],
    approved_usecase: "Text-to-Speech and Speech-to-Text AI Automated Voice for Grocery Delivery Drivers",
    usecase_desc:
      "When using instant grocery delivery apps, customers often call delivery executives while those executives are driving. By using a contextualized Speech-to-Text LLM, the solution responds to customer calls using an AI automated voice — with a robust NLP layer combined with a contextualized layer of documents and logistic-related information that can answer customer queries about delivery time, geolocation, and more.",
    mentor: "Abhishek K",
    status: "Registration",
  },
  {
    gen_id: "GEN-011",
    team_name: "The GANG",
    members: [
      { name: "Aditya Guha", captain: true },
      { name: "Pratyush Ghosh", captain: false },
      { name: "Pritam Chaurasiya", captain: false },
      { name: "Thilakkumar V", captain: false },
      { name: "Namith Jain", captain: false },
    ],
    approved_usecase: "DeckSmith - Agentically Turns Proposals into End-to-End Pitch Decks",
    usecase_desc:
      "The end user enters proposals into a modern minimalistic web-app, and the app turns out an end-to-end PowerPoint deck complete with story points (current state › gap › desired state), solution approach and architecture, sales/costing, and governance slides. Allows for iterative refinement to create a polished output which can then be touched up by the end user and sent out.",
    mentor: "Amogh Shetty",
    status: "Registration",
  },
];
