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
    ],
    approved_usecase: "Omnichannel Customer Service AI",
    usecase_desc:
      "A multi-agent customer support platform that routes, responds to, and escalates customer messages across WhatsApp, Email, SMS, and Web.",
    mentor: "Nikhil Shankar",
    status: "Registration",
  },
];
