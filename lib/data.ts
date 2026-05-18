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
    ],
    approved_usecase: "PortfolioNarrator - AI-Powered Personalized Portfolio Commentary",
    usecase_desc:
      "An AI-powered portfolio commentary platform that automatically generates personalised quarterly review letters for each HNI client of a wealth management firm or PMS provider. It reads the client's portfolio data, computes returns, compares against benchmark, pulls relevant market context, and produces a fully written, client-ready letter in their preferred language — reducing a 2-week manual process to under 2 hours.",
    mentor: "ABC",
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
    ],
    approved_usecase: "Intelligent Pre-Sales Pitch Assistant",
    usecase_desc:
      "Intelligent Proposal & Pitch Recommendation Engine Based on Historical Delivery Projects",
    mentor: "XYZ",
    status: "Registration",
  },
];
