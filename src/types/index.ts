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
  tech: string[];
  repo: string;
  live: string;
  play: string;
  package?: string;
}

export interface ProcessedProject {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  repo: string;
  live: string;
  play: string;
  package: string;
}

export interface ParticipationEntry {
  year: number;
  rank: number;
  url?: string;
}

export interface ParticipationData {
  id: string;
  name: LocalizedText;
  url: string;
  entries: ParticipationEntry[];
}

export interface ProcessedParticipation {
  name: string;
  url: string;
  entries: ParticipationEntry[];
}

export interface Labels {
  buttons: {
    site: string;
    play: string;
    repo: string;
    email: string;
  };
  project_card: {
    package_label: string;
    live_title: string;
    play_title: string;
    repo_title: string;
    techs_label: string;
  };
  nav: {
    home: string;
    projects: string;
    contact: string;
    language: string;
  };
  headings: {
    hero_title: string;
    hero_subtitle: string;
    selected_projects: string;
    olympiad_participations: string;
    olympiad_description: string;
    location: string;
    location_value: string;
  };
}

export interface AlternateUrl {
  hreflang: string;
  href: string;
}
