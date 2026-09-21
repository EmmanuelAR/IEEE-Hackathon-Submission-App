export const PROTOTYPE_TYPES = [
  "slides",
  "figma",
  "llm_demo",
  "video",
  "other",
] as const;

export type PrototypeType = (typeof PROTOTYPE_TYPES)[number];

export const SUBMISSION_STATUSES = ["received", "reviewed"] as const;

export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export type TeamMember = {
  name: string;
  email: string;
};

export type Submission = {
  id: string;
  created_at: string;
  status: SubmissionStatus;
  team_name: string;
  members: TeamMember[];
  contact_email: string;
  one_liner: string;
  problem: string;
  solution: string;
  prototype_type: PrototypeType;
  prototype_url: string | null;
  pitch_slides_url: string | null;
  github_url: string | null;
  video_url: string | null;
  file_path: string | null;
  notes: string | null;
  clasypcs_confirmed: boolean;
};

export const PROTOTYPE_LABELS: Record<PrototypeType, string> = {
  slides: "Slides",
  figma: "Figma / mockup",
  llm_demo: "LLM / demo",
  video: "Video",
  other: "Otro",
};

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  received: "Recibido",
  reviewed: "Revisado",
};

export const LUMA_URL = "https://luma.com/3ydsbpap";
export const TELEGRAM_URL = "https://t.me/hackathon_sj_ayuda";
export const CURSOR_DOWNLOAD_URL = "https://cursor.com/es/download";
export const GROK_BOT_URL = "https://x.ai/bot";
export const INSTALL_TUTORIAL_URL = "https://www.instagram.com/p/DdiUjrKhpTu/";
export const SITE_TITLE = "Grok Bot Hackathon San José";
export const MAX_MEMBERS = 4;
export const MAX_FILE_BYTES = 20 * 1024 * 1024;
export const STORAGE_BUCKET = "submissions";
