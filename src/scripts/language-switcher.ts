/**
 * Client-side TypeScript script for enhanced language switching
 * Provides smooth transitions and remembers language preference
 */

class LanguageSwitcher {
  private currentLocale: "en" | "it";

  constructor() {
    this.currentLocale = this.detectCurrentLocale();
    this.init();
  }

  private detectCurrentLocale(): "en" | "it" {
    const pathname = window.location.pathname;

    // Check if URL contains /it/
    if (pathname.startsWith("/it/") || pathname === "/it") {
      return "it";
    }

    // Default to English
    return "en";
  }

  private init(): void {
    // Store language preference in localStorage
    localStorage.setItem("preferred-language", this.currentLocale);

    // Set up event listeners for language switcher links
    this.setupEventListeners();

    // Add smooth transition class to body
    document.body.classList.add("lang-transition");
  }

  private setupEventListeners(): void {
    // Find all language switcher links
    const languageSwitchers = document.querySelectorAll(
      ".language-switcher a[hreflang]",
    );

    languageSwitchers.forEach((link) => {
      if (link instanceof HTMLAnchorElement) {
        link.addEventListener("click", (e) =>
          this.handleLanguageSwitch(e, link),
        );
      }
    });
  }

  private handleLanguageSwitch(event: Event, link: HTMLAnchorElement): void {
    event.preventDefault();

    const targetLocale = link.getAttribute("hreflang") as "en" | "it";
    if (!targetLocale || targetLocale === this.currentLocale) {
      return;
    }

    this.switchToLanguage(targetLocale);
  }

  private switchToLanguage(targetLocale: "en" | "it"): void {
    // Store preference
    localStorage.setItem("preferred-language", targetLocale);

    // Get current path without locale prefix
    const currentPath = this.getCurrentPath();

    // Generate target URL
    const targetUrl = this.generateTargetUrl(currentPath, targetLocale);

    // Add loading state
    this.addLoadingState();

    // Navigate to new URL
    this.navigateToUrl(targetUrl);
  }

  private getCurrentPath(): string {
    const pathname = window.location.pathname;

    // Remove locale prefix if present
    const pathWithoutLocale = pathname
      .replace(/^\/(en|it)\//, "/")
      .replace(/^\/$/, "");

    return pathWithoutLocale;
  }

  private generateTargetUrl(path: string, targetLocale: "en" | "it"): string {
    const baseUrl = window.location.origin;

    if (targetLocale === "en") {
      // English is default locale (no prefix)
      return `${baseUrl}${path === "" ? "/" : path}`;
    } else {
      // Italian has /it prefix
      return `${baseUrl}/it${path === "" ? "/" : path}`;
    }
  }

  private addLoadingState(): void {
    const languageSwitchers = document.querySelectorAll(".language-switcher");

    languageSwitchers.forEach((switcher) => {
      switcher.classList.add("loading");
    });

    // Add a subtle loading indicator
    document.body.style.opacity = "0.8";
    document.body.style.transition = "opacity 0.2s ease";
  }

  private navigateToUrl(url: string): void {
    // Small delay for visual feedback
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  }

  // Static method to detect user's browser language preference
  public static detectBrowserLanguage(): "en" | "it" {
    const browserLang = navigator.language || navigator.languages?.[0];

    if (browserLang?.toLowerCase().startsWith("it")) {
      return "it";
    }

    return "en";
  }

  // Static method to redirect to preferred language on first visit
  public static redirectToPreferredLanguage(): void {
    const currentPath = window.location.pathname;
    const isHomePage = currentPath === "/" || currentPath === "";

    // Only redirect on homepage and if no language preference is stored
    if (isHomePage && !localStorage.getItem("preferred-language")) {
      const browserLang = LanguageSwitcher.detectBrowserLanguage();
      const currentLocale = currentPath.startsWith("/it") ? "it" : "en";

      if (browserLang === "it" && currentLocale === "en") {
        window.location.href = "/it/";
      }
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Auto-redirect based on browser language (optional)
  // LanguageSwitcher.redirectToPreferredLanguage();

  // Initialize the language switcher
  new LanguageSwitcher();
});

// Add CSS for smooth transitions
const style = document.createElement("style");
style.textContent = `
  .lang-transition {
    transition: opacity 0.2s ease;
  }

  .language-switcher.loading {
    opacity: 0.6;
    pointer-events: none;
  }

  .language-switcher a {
    position: relative;
  }

  .language-switcher a:hover {
    transform: translateY(-1px);
    transition: transform 0.2s ease;
  }
`;
document.head.appendChild(style);

export { LanguageSwitcher };
