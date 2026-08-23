/* ============================================================
   AI ALMANAC — DATA FILE
   Edit this file to add tools, change ratings, or update copy.
   Nothing here touches a server — it's just plain data.
   ============================================================ */

// ---- Capability categories (the 13 skills tools are rated on) ----
const CATEGORIES = [
  { id: "thinking",  label: "Thinking / Reasoning", desc: "Working through logic, abstract problems and multi-step arguments." },
  { id: "problem",   label: "Problem Solving",       desc: "Turning a messy real-world problem into a concrete solution." },
  { id: "coding",    label: "Coding",                desc: "Writing, debugging and explaining software." },
  { id: "image",     label: "Image Generation",      desc: "Creating original images from a text description." },
  { id: "video",     label: "Video Generation",      desc: "Creating original video clips from text or images." },
  { id: "analyze",   label: "Analyze",               desc: "Making sense of data, documents or situations." },
  { id: "predict",   label: "Predict",               desc: "Forecasting outcomes from patterns and current data." },
  { id: "generate",  label: "Generate",              desc: "Producing text, ideas, drafts and creative content." },
  { id: "homework",  label: "Homework / Assignments",desc: "Explaining concepts and working through school or college coursework." },
  { id: "ppt",       label: "Making PPT / Presentation", desc: "Turning ideas into a structured slide deck." },
  { id: "summarize", label: "Summarize",             desc: "Condensing a long document, article or conversation into the key points." },
  { id: "automate",  label: "Automate",              desc: "Carrying out multi-step tasks with little supervision." },
  { id: "optimize",  label: "Optimize",              desc: "Improving an existing process, plan or piece of work." },
  { id: "identify",  label: "Identify",              desc: "Recognizing objects, patterns, text or entities." },
  { id: "simulate",  label: "Simulate",              desc: "Modeling how a system, scenario or person would behave." },
  { id: "adapt",     label: "Adapt",                 desc: "Adjusting tone, level or method to a specific user." },
];

// ---- Audiences / jobs used by the filter tool ----
const AUDIENCES = [
  { id: "school",    label: "School student" },
  { id: "college",   label: "College student" },
  { id: "dev",        label: "Software developer" },
  { id: "designer",   label: "Designer / visual artist" },
  { id: "video",      label: "Video editor / filmmaker" },
  { id: "marketer",   label: "Marketer / content creator" },
  { id: "writer",      label: "Writer / editor" },
  { id: "researcher",  label: "Researcher / scientist" },
  { id: "business",    label: "Business, finance & ops" },
  { id: "support",     label: "Customer support / admin" },
  { id: "teacher",     label: "Teacher / educator" },
];

// ---- The tools themselves. Ratings are 1-5, informed estimates as of Aug 2026. ----
const TOOLS = [
  {
    id: "claude", name: "Claude", maker: "Anthropic",
    tier: "Freemium", link: "https://claude.ai",
    blurb: "The steadiest choice for writing, research and software work — long, careful answers rather than flashy ones.",
    ratings: { thinking:5, problem:5, coding:5, image:1, video:1, analyze:5, predict:3, generate:5, homework:5, ppt:3, summarize:5, automate:4, optimize:4, identify:3, simulate:3, adapt:4 },
    audiences: ["college","dev","writer","researcher","business"],
  },
  {
    id: "chatgpt", name: "ChatGPT", maker: "OpenAI",
    tier: "Freemium", link: "https://chatgpt.com",
    blurb: "The broadest all-rounder — biggest user base, deepest plugin and tool ecosystem, solid at nearly everything.",
    ratings: { thinking:5, problem:4, coding:4, image:4, video:3, analyze:4, predict:4, generate:5, homework:5, ppt:4, summarize:5, automate:5, optimize:4, identify:4, simulate:4, adapt:4 },
    audiences: ["school","college","marketer","writer","business","support","teacher"],
  },
  {
    id: "gemini", name: "Gemini", maker: "Google",
    tier: "Freemium", link: "https://gemini.google.com",
    blurb: "Strongest at scientific reasoning and huge documents, and it's already built into Gmail, Docs and Search.",
    ratings: { thinking:5, problem:5, coding:4, image:3, video:4, analyze:5, predict:4, generate:4, homework:5, ppt:4, summarize:5, automate:4, optimize:5, identify:4, simulate:4, adapt:4 },
    audiences: ["school","college","researcher","business","teacher"],
  },
  {
    id: "grok", name: "Grok", maker: "xAI",
    tier: "Freemium", link: "https://grok.com",
    blurb: "Fastest to answer and plugged into live X/social data — good for trends and quick, less-filtered takes.",
    ratings: { thinking:4, problem:4, coding:4, image:2, video:2, analyze:3, predict:4, generate:4, homework:3, ppt:2, summarize:3, automate:3, optimize:3, identify:3, simulate:3, adapt:3 },
    audiences: ["marketer","business"],
  },
  {
    id: "deepseek", name: "DeepSeek", maker: "DeepSeek",
    tier: "Free / low-cost API", link: "https://www.deepseek.com",
    blurb: "Near-frontier reasoning and coding at a fraction of the price — the budget pick for heavy API use.",
    ratings: { thinking:4, problem:4, coding:4, image:1, video:1, analyze:3, predict:3, generate:3, homework:3, ppt:1, summarize:3, automate:3, optimize:5, identify:2, simulate:2, adapt:3 },
    audiences: ["dev","college"],
  },
  {
    id: "llama", name: "Llama", maker: "Meta",
    tier: "Free (open-weight)", link: "https://www.llama.com",
    blurb: "Open-weight, so it can be downloaded and run privately or fine-tuned — the pick when control matters more than raw power.",
    ratings: { thinking:3, problem:3, coding:3, image:2, video:1, analyze:3, predict:2, generate:3, homework:2, ppt:1, summarize:3, automate:3, optimize:4, identify:3, simulate:2, adapt:4 },
    audiences: ["dev","business"],
  },
  {
    id: "perplexity", name: "Perplexity", maker: "Perplexity",
    tier: "Freemium", link: "https://www.perplexity.ai",
    blurb: "Search-first: every answer is grounded in live web results with sources, instead of relying on memory alone.",
    ratings: { thinking:3, problem:3, coding:2, image:1, video:1, analyze:4, predict:3, generate:3, homework:4, ppt:1, summarize:5, automate:2, optimize:3, identify:2, simulate:1, adapt:2 },
    audiences: ["school","college","researcher"],
  },
  {
    id: "midjourney", name: "Midjourney", maker: "Midjourney",
    tier: "Paid", link: "https://www.midjourney.com",
    blurb: "The gold standard for artistic, editorial-quality still images — concept art, fashion, architecture, illustration.",
    ratings: { thinking:1, problem:1, coding:1, image:5, video:2, analyze:1, predict:1, generate:4, homework:1, ppt:2, summarize:1, automate:1, optimize:2, identify:1, simulate:1, adapt:2 },
    audiences: ["designer","marketer"],
  },
  {
    id: "veo", name: "Veo", maker: "Google DeepMind",
    tier: "Paid (via Gemini)", link: "https://deepmind.google/technologies/veo/",
    blurb: "The most reliable cinematic video generator — strong prompt-following, native audio, realistic physics.",
    ratings: { thinking:1, problem:1, coding:1, image:3, video:5, analyze:1, predict:1, generate:4, homework:1, ppt:1, summarize:1, automate:1, optimize:2, identify:1, simulate:2, adapt:2 },
    audiences: ["video","marketer"],
  },
  {
    id: "runway", name: "Runway", maker: "Runway",
    tier: "Freemium", link: "https://runwayml.com",
    blurb: "Built for working filmmakers — camera control, editing tools and generative video in one production toolkit.",
    ratings: { thinking:1, problem:2, coding:1, image:3, video:4, analyze:1, predict:1, generate:4, homework:1, ppt:1, summarize:1, automate:2, optimize:2, identify:1, simulate:2, adapt:2 },
    audiences: ["video","designer"],
  },
  {
    id: "copilot", name: "GitHub Copilot", maker: "GitHub / Microsoft",
    tier: "Freemium", link: "https://github.com/features/copilot",
    blurb: "AI pair-programmer wired directly into the code editor — completions, chat and reviews without leaving the IDE.",
    ratings: { thinking:3, problem:4, coding:5, image:1, video:1, analyze:3, predict:2, generate:3, homework:2, ppt:1, summarize:2, automate:4, optimize:4, identify:2, simulate:1, adapt:3 },
    audiences: ["dev","college"],
  },
];

// ---- "Best for you" quick picks (audience -> short reasoning) ----
const AUDIENCE_NOTES = {
  school:     "Free, safe defaults with guardrails matter more than raw power at this stage.",
  college:    "A mix of a general reasoning model and a research tool covers most coursework.",
  dev:        "Pick the tool that lives inside the editor, plus one strong general model for design decisions.",
  designer:   "A dedicated image model beats a general chatbot for anything visual.",
  video:      "Video-specific models are still a different category from text or image tools — budget for one.",
  marketer:   "Speed and volume matter as much as polish — a fast generalist plus an image tool covers most days.",
  writer:     "Prose quality and long-context memory matter more than raw benchmark scores here.",
  researcher: "Grounded, sourced answers and huge context windows matter more than speed.",
  business:   "Reliability and integration with existing tools (email, sheets, docs) beats novelty.",
  support:    "Automation and consistency matter more than creativity for repetitive tickets.",
  teacher:    "Explanations that adapt to a student's level matter more than raw capability.",
};

// ---- "AI's effect on life" pointers ----
const IMPACT_NOW = [
  "Search is shifting from lists of links to direct, synthesized answers.",
  "Drafting — emails, code, images, slides — is faster, so more of the day goes to editing and judgment.",
  "Customer support, translation and basic research are already partly automated in many companies.",
  "Personalized tutoring and study help are available for free to anyone with a phone.",
  "AI-generated text, images and video are mixed into feeds people can't always tell apart from human-made content.",
];
const IMPACT_FUTURE = [
  "AI agents will complete multi-step tasks (booking, filing, researching) with less step-by-step instruction.",
  "Personal AI assistants will hold long-term memory of a person's work and preferences across apps.",
  "Scientific and medical research will lean on AI to generate and test hypotheses, not just summarize them.",
  "More jobs will involve directing and checking AI output rather than producing everything from scratch.",
  "Regulation, watermarking and verification tools will grow alongside generation tools, to manage trust.",
];

// ---- Jobs & AI ----
const JOBS_REPLACING_NOW = [
  "Basic data entry and simple transcription.",
  "First-draft copywriting for ads, listings and short-form content.",
  "Entry-level translation of straightforward text.",
  "Simple customer-support ticket triage and FAQ answering.",
  "Basic image editing tasks (background removal, resizing, simple retouching).",
];
const JOBS_REPLACING_FUTURE = [
  "Routine paralegal research and first-pass contract review.",
  "Junior-level coding tasks (boilerplate, simple bug fixes, test writing).",
  "Standard financial reporting and reconciliation.",
  "Storyboard and animatic creation in film/TV pre-production.",
  "Routine radiology and pathology image screening (as a first-pass filter, not final diagnosis).",
];
const JOBS_SAFE = [
  "Jobs needing hands-on physical skill in unpredictable settings: plumbers, electricians, surgeons.",
  "Roles built on trust, accountability and legal responsibility: judges, licensed doctors, pilots.",
  "Work requiring deep human relationships: therapy, caregiving, teaching young children.",
  "Jobs needing on-the-ground judgment in novel situations: emergency response, skilled trades.",
  "Leadership roles that require persuading, negotiating with and motivating other people.",
];

// ---- Learning AI ----
const LEARNING_NOW = [
  "Free tutoring on any subject, available any time, at the learner's own pace.",
  "Instant feedback on writing, code and problem sets instead of waiting for a teacher.",
  "Practice generating unlimited example problems, quizzes and explanations.",
  "Language learning through live conversation practice instead of only textbooks.",
];
const LEARNING_FUTURE = [
  "Fully adaptive courses that restructure themselves around what a student has and hasn't mastered.",
  "AI co-teachers that handle repetitive explanation so teachers focus on mentoring.",
  "Skill verification (not just AI use) becoming a bigger part of grading and hiring.",
  "AI literacy — knowing how to direct, check and question AI — becoming a core school subject.",
];
const USE_EFFECTIVELY = [
  "Give the AI context: your goal, audience and constraints, not just a bare question.",
  "Ask it to show its reasoning or sources before you trust a conclusion.",
  "Use it to get a first draft or a second opinion, not to skip thinking entirely.",
  "Fact-check anything specific — dates, numbers, citations — before you rely on it.",
  "Learn one tool deeply before collecting five shallowly.",
  "Treat it as a collaborator you supervise, not an authority you defer to.",
];
