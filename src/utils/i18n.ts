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
    buttons: {
      site: t("buttons.site", locale),
      play: t("buttons.play", locale),
      repo: t("buttons.repo", locale),
      email: t("buttons.email", locale),
    },
    project_card: {
      package_label: t("project_card.package_label", locale),
      live_title: t("project_card.live_title", locale),
      play_title: t("project_card.play_title", locale),
      repo_title: t("project_card.repo_title", locale),
      techs_label: t("project_card.techs_label", locale),
    },
    nav: {
      home: t("nav.home", locale),
      projects: t("nav.projects", locale),
      contact: t("nav.contact", locale),
      language: t("nav.language", locale),
    },
    headings: {
      hero_title: t("headings.hero_title", locale),
      hero_subtitle: t("headings.hero_subtitle", locale),
      selected_projects: t("headings.selected_projects", locale),
      olympiad_participations: t("headings.olympiad_participations", locale),
      olympiad_description: t("headings.olympiad_description", locale),
      location: t("headings.location", locale),
      location_value: t("headings.location_value", locale),
    },
    bento: {
      hero_bio: t("bento.hero_bio", locale),
      philosophy_title: t("bento.philosophy_title", locale),
      philosophy_text: t("bento.philosophy_text", locale),
      preferences_title: t("bento.preferences_title", locale),
      preferences_text: t("bento.preferences_text", locale),
      status_title: t("bento.status_title", locale),
      status_text: t("bento.status_text", locale),
      hobbies_title: t("bento.hobbies_title", locale),
      hobbies_text: t("bento.hobbies_text", locale),
      projects_title: t("bento.projects_title", locale),
      projects_subtitle: t("bento.projects_subtitle", locale),
    },
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
