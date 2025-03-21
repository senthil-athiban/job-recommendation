import { IJob } from "../types/job";

const jobs: Array<IJob> = [
  {
    company: "TechCorp",
    company_description:
      "A leading tech company specializing in web applications.",
    company_logo: "https://example.com/techcorp-logo.png",
    company_num_employees: "100-500",
    company_url: "https://techcorp.com",
    date_posted: new Date("2025-03-15"),
    description:
      "We are looking for a Frontend Developer with experience in modern JavaScript frameworks. The ideal candidate will have strong skills in React and responsive design principles.",
    is_remote: true,
    job_function: "Engineering",
    job_url: "https://techcorp.com/careers/frontend-developer",
    location: "San Francisco, CA",
    title: "Frontend Developer",
    salary: "$50k - $100k",
    skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript"],
  },
  {
    company: "DataInsights",
    company_description:
      "A data analytics company helping businesses make data-driven decisions.",
    company_logo: "https://example.com/datainsights-logo.png",
    company_num_employees: "50-100",
    company_url: "https://datainsights.ai",
    date_posted: new Date("2025-03-10"),
    description:
      "Seeking a skilled Data Scientist to develop machine learning models and perform statistical analyses on large datasets.",
    is_remote: true,
    job_function: "Data Science",
    job_url: "https://datainsights.ai/careers/data-scientist",
    location: "Remote",
    title: "Data Scientist",
    salary: "$100k - $200k",
    skills: [
      "Python",
      "Machine Learning",
      "Statistics",
      "NLP",
      "SQL",
      "TensorFlow",
    ],
  },
  {
    company: "ServerTech",
    company_description:
      "Building scalable backend solutions for enterprise clients.",
    company_logo: "https://example.com/servertech-logo.png",
    company_num_employees: "10-50",
    company_url: "https://servertech.io",
    date_posted: new Date("2025-03-12"),
    description:
      "Looking for a Backend Developer experienced in building RESTful APIs and working with databases.",
    is_remote: false,
    job_function: "Engineering",
    job_url: "https://servertech.io/careers/backend-developer",
    location: "Austin, TX",
    title: "Backend Developer",
    salary: "$80k - $120k",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "API Development"],
  },
  {
    company: "CloudOps",
    company_description: "Cloud infrastructure management and DevOps services.",
    company_logo: "https://example.com/cloudops-logo.png",
    company_num_employees: "100-500",
    company_url: "https://cloudops.tech",
    date_posted: new Date("2025-03-05"),
    description:
      "Seeking a DevOps Engineer to improve our CI/CD pipelines and manage our cloud infrastructure.",
    is_remote: true,
    job_function: "DevOps",
    job_url: "https://cloudops.tech/careers/devops-engineer",
    location: "New York, NY",
    title: "DevOps Engineer",
    salary: "$200k",
    skills: ["CI/CD", "Docker", "Kubernetes", "AWS", "Terraform", "Jenkins"],
  },
  {
    company: "ReliableSys",
    company_description:
      "Ensuring highest levels of system reliability for financial services.",
    company_logo: "https://example.com/reliablesys-logo.png",
    company_num_employees: "500-1000",
    company_url: "https://reliablesys.com",
    date_posted: new Date("2025-03-08"),
    description:
      "Join our team as an SRE to ensure our systems remain reliable, performant, and secure.",
    is_remote: false,
    job_function: "Operations",
    job_url: "https://reliablesys.com/careers/sre",
    location: "Chicago, IL",
    title: "Site Reliability Engineer",
    salary: "$100k",
    skills: [
      "Linux",
      "Monitoring",
      "AWS",
      "GCP",
      "Kubernetes",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    company: "MobileFirst",
    company_description:
      "Creating innovative mobile applications for iOS and Android.",
    company_logo: "https://example.com/mobilefirst-logo.png",
    company_num_employees: "10-50",
    company_url: "https://mobilefirst.dev",
    date_posted: new Date("2025-03-14"),
    description:
      "We are looking for a Mobile Developer to join our team and build high-quality mobile applications.",
    is_remote: true,
    job_function: "Engineering",
    job_url: "https://mobilefirst.dev/careers/mobile-developer",
    location: "Remote",
    title: "Mobile Developer",
    salary: "$100k",
    skills: ["React Native", "iOS", "Android", "Swift", "Kotlin"],
  },
  {
    company: "SecureSolutions",
    company_description: "Cybersecurity services for enterprise clients.",
    company_logo: "https://example.com/securesolutions-logo.png",
    company_num_employees: "100-500",
    company_url: "https://securesolutions.com",
    date_posted: new Date("2025-03-02"),
    description:
      "Seeking a Security Engineer to help protect our infrastructure and customer data.",
    is_remote: false,
    job_function: "Security",
    job_url: "https://securesolutions.com/careers/security-engineer",
    location: "Seattle, WA",
    title: "Security Engineer",
    salary: "$120k",
    skills: [
      "Network Security",
      "Penetration Testing",
      "SIEM",
      "Compliance",
      "Cloud Security",
    ],
  },
  {
    company: "AILabs",
    company_description: "Research and development in artificial intelligence.",
    company_logo: "https://example.com/ailabs-logo.png",
    company_num_employees: "50-100",
    company_url: "https://ailabs.research",
    date_posted: new Date("2025-03-09"),
    description:
      "Looking for an AI Researcher to push the boundaries of machine learning and develop novel algorithms.",
    is_remote: false,
    job_function: "Research",
    job_url: "https://ailabs.research/careers/ai-researcher",
    location: "Boston, MA",
    title: "AI Researcher",
    salary: "$120k - $200k",
    skills: [
      "Deep Learning",
      "PyTorch",
      "TensorFlow",
      "Computer Vision",
      "Reinforcement Learning",
    ],
  },
  {
    company: "UXStudio",
    company_description:
      "Design-focused agency creating beautiful user experiences.",
    company_logo: "https://example.com/uxstudio-logo.png",
    company_num_employees: "10-50",
    company_url: "https://uxstudio.design",
    date_posted: new Date("2025-03-11"),
    description:
      "Join our team as a UX/UI Designer to create intuitive and engaging user experiences.",
    is_remote: true,
    job_function: "Design",
    job_url: "https://uxstudio.design/careers/ux-ui-designer",
    location: "Remote",
    title: "UX/UI Designer",
    salary: "$50k - $80k",
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Wireframing",
      "Prototyping",
    ],
  },
  {
    company: "BlockchainVentures",
    company_description: "Building the future of decentralized finance.",
    company_logo: "https://example.com/blockchainventures-logo.png",
    company_num_employees: "10-50",
    company_url: "https://blockchainventures.io",
    date_posted: new Date("2025-03-07"),
    description:
      "We are looking for a Blockchain Developer to build secure and efficient smart contracts.",
    is_remote: true,
    job_function: "Engineering",
    job_url: "https://blockchainventures.io/careers/blockchain-developer",
    location: "Miami, FL",
    title: "Blockchain Developer",
    salary: "$200k - $300k",
    skills: ["Solidity", "Smart Contracts", "Ethereum", "Web3.js", "DeFi"],
  },
];

export default jobs;