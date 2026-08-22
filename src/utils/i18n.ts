import i18nData from "../data/i18n.json";
import { getRelativeLocaleUrl, getAbsoluteLocaleUrl } from "astro:i18n";

export type Locale = "en" | "it";

// Type for the i18n data structure
type I18nValue = string | Record<Locale, string>;
type I18nSection = Record<string, I18nValue | Record<string, I18nValue>>;
type I18nData = Record<string, I18nSection>;

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "it"];

/**
 * Get the current locale from the URL path
 */
export function getCurrentLocale(pathname: string): Locale {
  // Remove leading slash and get first segment
  const segments = pathname.replace(/^\//, "").split("/");
  const firstSegment = segments[0];

  // Check if first segment is a valid locale
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return defaultLocale;
}

/**
 * Get translation by key path for a specific locale
 */
export function t(keyPath: string, locale: Locale = defaultLocale): string {
  const keys = keyPath.split(".");
  let value: any = i18nData as I18nData;

  for (const key of keys) {
    if (value && typeof value === "object") {
      value = value[key];
    } else {
      break;
    }
  }

  if (value && typeof value === "object" && locale in value) {
    return value[locale] as string;
  }

  // Fallback to default locale if translation not found
  if (value && typeof value === "object" && defaultLocale in value) {
    return value[defaultLocale] as string;
  }

  // Return key path if no translation found
  return keyPath;
}

/**
 * Get all translations for a specific key path
 */
export function getTranslations(keyPath: string): Record<Locale, string> {
  const keys = keyPath.split(".");
  let value: any = i18nData as I18nData;

  for (const key of keys) {
    if (value && typeof value === "object") {
      value = value[key];
    } else {
      break;
    }
  }

  if (value && typeof value === "object") {
    return value as Record<Locale, string>;
  }

  // Return empty object if no translations found
  return {} as Record<Locale, string>;
}

/**
 * Get localized URL for a page
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  return getRelativeLocaleUrl(locale, path);
}

/**
 * Get absolute localized URL for a page
 */
export function getAbsoluteLocalizedUrl(path: string, locale: Locale): string {
  return getAbsoluteLocaleUrl(locale, path);
}

/**
 * Get alternate language links for SEO
 */
export function getAlternateLanguages(path: string, currentLocale: Locale) {
  return locales
    .filter((locale) => locale !== currentLocale)
    .map((locale) => ({
      locale,
      url: getLocalizedUrl(path, locale),
      label: t("nav.language", locale),
    }));
}

/**
 * Get labels object for a specific locale (for backward compatibility)
 */
export function getLabels(locale: Locale) {
  return {
    meta: {
      title: t("meta.title", locale),
      description: t("meta.description", locale),
    },
    accessibility: {
      skip_content: t("accessibility.skip_content", locale),
      primary_navigation: t("accessibility.primary_navigation", locale),
      choose_language: t("accessibility.choose_language", locale),
      introduction: t("accessibility.introduction", locale),
      filter_projects: t("accessibility.filter_projects", locale),
    },
    nav: {
      projects: t("nav.projects", locale),
      record: t("nav.record", locale),
      contact: t("nav.contact", locale),
      home_label: t("nav.home_label", locale),
    },
    hero: {
      eyebrow: t("hero.eyebrow", locale),
      introduction: t("hero.introduction", locale),
      projects_cta: t("hero.projects_cta", locale),
      github_cta: t("hero.github_cta", locale),
    },
    projects: {
      eyebrow: t("projects.eyebrow", locale),
      title: t("projects.title", locale),
      introduction: t("projects.introduction", locale),
      all: t("projects.all", locale),
      android: t("projects.android", locale),
      web: t("projects.web", locale),
      shown: t("projects.shown", locale),
      play_store: t("projects.play_store", locale),
      fdroid: t("projects.fdroid", locale),
      source: t("projects.source", locale),
      visit_website: t("projects.visit_website", locale),
    },
    record: {
      eyebrow: t("record.eyebrow", locale),
      title: t("record.title", locale),
      summary: t("record.summary", locale),
      introduction: t("record.introduction", locale),
      year: t("record.year", locale),
      competition: t("record.competition", locale),
      discipline: t("record.discipline", locale),
      result: t("record.result", locale),
    },
    contact: { message: t("contact.message", locale) },
    footer: {
      built_with: t("footer.built_with", locale),
      back_to_top: t("footer.back_to_top", locale),
    },
    ordinal: { suffix: t("ordinal.suffix", locale) },
  };
}

/**
 * Check if a locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get the opposite locale (for language switcher)
 */
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === "en" ? "it" : "en";
}
