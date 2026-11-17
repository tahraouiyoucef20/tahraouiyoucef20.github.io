/* ============================================================================
   YOUR CONTENT
   ----------------------------------------------------------------------------
   This is the only file you need to edit to make the site yours.
   Everything below comes from Youcef Tahraoui's CV (assets/cv.pdf).

   Tips:
   • Keep the quotes and commas exactly as they are.
   • To add a link, copy an existing { ... } block in "links" and edit it.
   • "cv.html" (the printable CV) reads from this same file, so it stays
     in sync automatically.
   ========================================================================== */

window.PORTFOLIO = {
  /* ---------- Browser tab & search results ---------- */
  meta: {
    siteTitle: "Youcef Tahraoui — Senior Team Lead, Fin Crime Investigations",
    description:
      "Portfolio, CV and link directory for Youcef Tahraoui, a senior team lead in financial crime investigations based in Kraków, Poland.",
  },

  /* ---------- The person ---------- */
  profile: {
    name: "Youcef Tahraoui",
    initials: "YT", // shown in the avatar tile
    // photo: "assets/img/portrait.jpg", // optional: uncomment after adding your photo
    role: "Senior Team Lead (Fin Crime Investigations)",
    location: "Kraków, Poland",
    timezone: "Europe/Warsaw", // used for the live local-time display
    email: "tahraoui20@outlook.fr",
    phone: "", // left off the website on purpose — your PDF still contains it

    availability: {
      label: "Open to new opportunities", // edit or remove if you're not looking
      state: "available", // "available" (green dot) or "busy" (amber dot)
    },

    lede:
      "Results-driven leader with a proven history of enhancing team performance and mitigating risk in financial crime. Expertise in data analysis (Looker), quality assurance frameworks and root cause analysis, consistently exceeding KPIs (115%+).",

    languages: ["English", "French", "Arabic"],

    /* Longer form, shown on the CV page */
    languagesLong: [
      "English (proficient)",
      "French (advanced)",
      "Arabic (native)",
    ],

    /* Short summary shown at the top of the CV page */
    summary:
      "Results-driven leader with a proven history of enhancing team performance and mitigating risk in financial crime. Expertise in data analysis (e.g., Looker), quality assurance frameworks, and root cause analysis, consistently exceeding KPIs (115%+). Seeking to apply strategic leadership and analytical skills within a global organization.",
  },

  /* ---------- Navigation (anchors on this page) ---------- */
  nav: [
    { label: "Links", href: "#links" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],

  /* ---------- Headline numbers ---------- */
  stats: [
    { value: "135%", label: "KPI progression achieved" },
    { value: "20", label: "Analysts led across 5 countries" },
    { value: "40%", label: "Efficiency gained" },
  ],

  /* ---------- Link directory ----------
     "group" must match one of the keys in "linkTags" below.
     "mono" is the 1–2 character mark shown on the card.           */
  linkTags: {
    work: "Work & profiles",
    contact: "Contact",
  },

  links: [
    {
      label: "LinkedIn",
      mono: "in",
      handle: "in/youcef-tahraoui",
      note: "Full work history, recommendations and CV.",
      url: "https://www.linkedin.com/in/youcef-tahraoui/",
      group: "work",
    },
    {
      label: "Email",
      mono: "@",
      handle: "tahraoui20@outlook.fr",
      note: "The fastest way to reach me. Replies within a day.",
      url: "mailto:tahraoui20@outlook.fr",
      group: "contact",
    },
    {
      label: "Résumé / CV",
      mono: "CV",
      handle: "PDF · 2 pages",
      note: "Download the CV as a PDF, ready to attach.",
      url: "assets/cv.pdf",
      download: true,
      group: "contact",
    },
    /* Want more links? Copy a block above and edit it, e.g.:
    {
      label: "GitHub",
      mono: "GH",
      handle: "@yourname",
      note: "Code and side projects.",
      url: "https://github.com/yourname",
      group: "work",
    },
    */
  ],

  /* ---------- Experience (newest first) ---------- */
  experience: [
    {
      role: "Senior Team Lead (Fin Crime Investigations)",
      company: "Revolut",
      location: "Kraków, Poland",
      start: "09/2023",
      end: "Present",
      points: [
        "Led and managed a team of 20 FTEs across 5 countries in a diverse investigation portfolio.",
        "Increased efficiency by 40% among analysts through targeted training and consistency.",
        "Established performance and production monitoring files for stakeholders, increasing efficiency and decreasing backlog by 35%.",
        "Applied Root Cause Analysis (RCA) methodologies to quality findings to identify underlying issues and process gaps, spotting over 50 process improvements quarterly.",
        "Improved quality assurance standards, resulting in a 15% decrease in error rates.",
        "Implemented the System Failure Process, encouraging analysts to spot and flag process issues, decreasing initial gaps by 50%.",
        "Enhanced data-driven decision-making by developing and adjusting Looker dashboards for improved reporting on key quality metrics, improving stakeholder engagement by 20%.",
        "Achieved 120%+ overall KPI progression every quarter as a Junior Team supervisor, demonstrating strong performance management skills.",
      ],
      tags: ["Team leadership", "RCA", "Looker", "Quality assurance"],
    },
    {
      role: "Quality Control Analyst (KYC / ATO / Fin Crime Support)",
      company: "Revolut",
      location: "Kraków, Poland",
      start: "02/2023",
      end: "09/2023",
      points: [
        "Achieved strong performance grades during all quarters, exceeding 120% in KPI progression.",
        "Delivered quality assessments for 5 Revolut business lines.",
        "Led 25 weekly stakeholder reporting meetings on process gaps and improvement recommendations.",
        "Provided 30 individual coaching sessions to improve agent and analyst performance, leading to a 30% progression in team KPIs.",
        "Contributed to onboarding quality frameworks (checklist and framework design, training of new quality analysts) for 3 business lines and 20 analysts.",
      ],
      tags: ["KYC / ATO", "Coaching", "Stakeholder reporting"],
    },
    {
      role: "KYC Analyst & Customer Experience Research Specialist (KYC / ATO)",
      company: "Revolut",
      location: "Kraków, Poland",
      start: "01/2022",
      end: "02/2023",
      points: [
        "Improved customer satisfaction by 25% by enhancing KYC and ATO processes.",
        "Reduced customer complaints by 5% through effective root cause analysis, enhancing customer satisfaction.",
        "Analysed poor customer experience in 200 tickets weekly to determine areas of improvement.",
        "Provided weekly updates on operational and strategic root causes, enabling complaint mitigation for 20% of cases weekly.",
        "Addressed 50 escalated consultation cases from agents daily.",
        "Monitored 10 agents during shift time to ensure schedule adherence and task prioritization.",
        "Delivered 50 coaching sessions to support agent development in KYC processes.",
        "Overachieved set KPIs with 120% overall progression and strong grades during all quarters.",
        "Supported key compliance functions, including client identity verification, verifying 40 users via chat and 90 users via backoffice daily.",
        "Reviewed red flags and conducted enhanced due diligence, collaborating with compliance departments.",
        "Maintained 100% quality throughout all quarters, ensuring strong adherence to compliance rules.",
      ],
      tags: ["KYC", "Customer experience", "Compliance"],
    },
    {
      role: "VIP Player Support Agent (Bilingual: Arabic & English)",
      company: "Keywords Studios",
      location: "Katowice, Poland",
      start: "10/2020",
      end: "12/2021",
      points: [
        "Recognized for consistently providing excellent customer service, achieving an average CSAT score of 4.5/5.",
        "Held a consistent track record of top-tier quality performance within the team, maintaining 99% quality.",
        "Drove efficiency in customer support by achieving excellent First-Time Resolution (FTR) with rapid ticket handling times (1–5 minutes).",
        "Maintained detailed records for 200 weekly tickets using the internal ticketing system, ensuring compliance and efficiency.",
        "Played an integral role in onboarding over 15 new team members through effective shadowing and training initiatives.",
      ],
      tags: ["Customer support", "CSAT", "Bilingual"],
    },
  ],

  /* ---------- Selected projects ---------- */
  projects: [
    {
      title: "Quality Framework",
      meta: "2023 · Kraków, Poland",
      summary: "Development of a quality framework for three business lines.",
      points: [
        "Improved agent performance by 25% by enhancing the rating system and error detection processes.",
        "Improved data reporting and NPS by 15%.",
      ],
      tags: ["Quality assurance", "NPS", "Reporting"],
    },
    {
      title: "Zapier automations",
      meta: "2025 · Kraków, Poland",
      summary: "Automated Slack reminders via Zapier.",
      points: ["Reduced manual effort by 40% through developing task automation."],
      tags: ["Automation", "Zapier", "Slack"],
    },
  ],

  /* ---------- Skills ---------- */
  skills: [
    {
      title: "Investigation & quality",
      items: [
        "Fin crime investigations",
        "KYC / ATO",
        "Fraud analysis",
        "Root cause analysis",
        "Quality assurance",
        "Enhanced due diligence",
      ],
    },
    {
      title: "Leadership",
      items: [
        "Team leadership",
        "Coaching & mentoring",
        "Performance management",
        "Stakeholder management",
        "Negotiation",
        "Emotional intelligence",
      ],
    },
    {
      title: "Data & delivery",
      items: [
        "Looker",
        "CRM",
        "Zapier",
        "Analytical skills",
        "Problem solving",
        "Project management",
      ],
    },
  ],

  /* ---------- Education & awards ---------- */
  education: [
    {
      title: "Master's degree, Business Administration and Management",
      org: "The Silesian University of Technology",
      period: "09/2020 — 06/2022",
      note: "",
    },
    {
      title: "Master's in English, English Civilization and Literature",
      org: "Abou Bekr Belkaid University of Tlemcen",
      period: "01/2015 — 12/2020",
      note: "",
    },
    {
      title: "KYC Agent of the Month",
      org: "Revolut",
      period: "Award",
      note: "",
    },
  ],

  /* ---------- Contact section ---------- */
  contact: {
    heading: "Let's get in touch.",
    text: "Reach out on LinkedIn or by email about quality control, financial crime investigations or operations roles — I usually reply within a day.",
    emailLabel: "tahraoui20@outlook.fr",
  },

  /* ---------- Footer ---------- */
  footer: {
    note: "Based in Kraków, Poland.",
    builtWith: "Static site, hosted free on GitHub Pages.",
  },
};
