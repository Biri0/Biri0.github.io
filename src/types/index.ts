export type Locale = "en" | "it";

export interface LocalizedText {
  en: string;
  it: string;
}

export interface SiteData {
  title: string;
  description: LocalizedText;
  email: string;
  contactEmail: string;
  github: string;
  url: string;
  favicon: string;
  themeColor: string;
  defaultLanguage: string;
  languages: string[];
  seo: {
    image: string;
  };
  bio: LocalizedText;
  techStack: {
    summary: string[];
    byProject: Record<string, string[]>;
  };
}

export interface ProjectData {
  id: string;
  titles: LocalizedText;
  descriptions: LocalizedText;
  types: LocalizedText;
  category: "android" | "web";
  tech: string[];
  repo: string;
  live: string;
  play: string;
}

export interface ProcessedProject {
  id: string;
  title: string;
  desc: string;
  type: string;
  category: "android" | "web";
  tech: string[];
  repo: string;
  live: string;
  play: string;
}

export interface ParticipationEntry {
  year: number;
  rank: number;
  url?: string;
}

export interface ParticipationData {
  id: string;
  name: LocalizedText;
  discipline: LocalizedText;
  url: string;
  entries: ParticipationEntry[];
}

export interface ProcessedParticipation {
  name: string;
  discipline: string;
  url: string;
  entries: ParticipationEntry[];
}

export interface Labels {
  meta: { title: string; description: string };
  accessibility: {
    skip_content: string;
    primary_navigation: string;
    choose_language: string;
    introduction: string;
    filter_projects: string;
  };
  nav: {
    projects: string;
    record: string;
    contact: string;
    home_label: string;
  };
  hero: {
    eyebrow: string;
    introduction: string;
    projects_cta: string;
    github_cta: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    introduction: string;
    all: string;
    android: string;
    web: string;
    shown: string;
    play_store: string;
    source: string;
    visit_website: string;
  };
  record: {
    eyebrow: string;
    title: string;
    summary: string;
    introduction: string;
    year: string;
    competition: string;
    discipline: string;
    result: string;
  };
  contact: { message: string };
  footer: { built_with: string; back_to_top: string };
  ordinal: { suffix: string };
}

export interface AlternateUrl {
  hreflang: string;
  href: string;
}
