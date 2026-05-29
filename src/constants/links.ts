/**
 * Centralized Links Configuration Registry
 *
 * This file acts as the single source of truth for all external links, social handles,
 * site routes, and menu links throughout the application.
 */

const DEFAULT_LINKS = {
  // Site & Registration Links
  COMMUNITY_PLATFORM:
    "https://docs.google.com/forms/d/e/1FAIpQLSdKS7Wdr7NoP_9aIgWONBWoSH1h3UCwUCvejKIWvm1LDV8aPQ/viewform",

  // Social & Developer Media Links
  FACEBOOK: "https://facebook.com/gdgupm",
  INSTAGRAM: "https://www.instagram.com/gdg.upm/",
  LINKEDIN: "https://www.linkedin.com/company/google-developer-groups-upm/",
  GITHUB: "https://github.com/gdgupm",
  GITHUB_ORG: "https://github.com/Google-Developer-Group-On-Campus-UPM",
  TWITTER: "https://twitter.com/gdgupm",
  YOUTUBE: "https://youtube.com/gdgupm",
  WHATSAPP: "https://chat.whatsapp.com/Cgb1swm8p5t5xqKahaV2nR",
  MEDIUM: "https://medium.com/@gdgocupm",
  SUGGEST_EVENT: "https://docs.google.com/forms/d/e/1FAIpQLSeRx-kBCYQ5I0_Roab5hqVT8M1kGWsBRHYQ-jFz_KZEL_fUXg/viewform",

  // Core Navigation Routes
  HOME: "/",
  ABOUT: "/community/about",
  EVENTS: "/community/events",
  ADMIN: "/admin",

  // Footer Subpages - Community
  FOOTER_COMMUNITY_ABOUT: "/community/about",
  FOOTER_COMMUNITY_EVENTS: "/community/events",
  FOOTER_COMMUNITY_TEAM: "/community/team",
  FOOTER_COMMUNITY_JOIN: "https://docs.google.com/forms/d/e/1FAIpQLSdKS7Wdr7NoP_9aIgWONBWoSH1h3UCwUCvejKIWvm1LDV8aPQ/viewform",

  // Footer Subpages - Programs
  FOOTER_PROGRAMS_JAMS: "/programs/jams",
  FOOTER_PROGRAMS_DEVFEST: "/programs/devfest/upm",
  FOOTER_PROGRAMS_TALKS: "/programs/tech-talks",
  FOOTER_PROGRAMS_HACKATHONS: "/programs/hackathons",
  FOOTER_PROGRAMS_WORKSHOPS: "/programs/workshops",

  // Footer Subpages - Resources
  FOOTER_RESOURCES_LEARNING: "/learning/materials",
  FOOTER_RESOURCES_CODELABS: "/learning/gdg/codelabs",
  FOOTER_RESOURCES_SPEAKERS: "/learning/speakers",
  FOOTER_RESOURCES_BLOG: "/blog",
  FOOTER_RESOURCES_PROJECTS: "/projects",

  // Footer Subpages - Support
  FOOTER_SUPPORT_FAQS: "/faqs",
  FOOTER_SUPPORT_VOLUNTEER: "/volunteer",
  FOOTER_SUPPORT_PARTNERSHIPS: "/partnerships",
  FOOTER_SUPPORT_CONTACT: "/contact",
  FOOTER_SUPPORT_GUIDELINES: "/guidelines",
};

// Map environment variable overrides if they exist
const ENV_LINKS = {
  COMMUNITY_PLATFORM:
    process.env.NEXT_PUBLIC_LINK_COMMUNITY_PLATFORM ||
    DEFAULT_LINKS.COMMUNITY_PLATFORM,
  FACEBOOK: process.env.NEXT_PUBLIC_LINK_FACEBOOK || DEFAULT_LINKS.FACEBOOK,
  INSTAGRAM: process.env.NEXT_PUBLIC_LINK_INSTAGRAM || DEFAULT_LINKS.INSTAGRAM,
  LINKEDIN: process.env.NEXT_PUBLIC_LINK_LINKEDIN || DEFAULT_LINKS.LINKEDIN,
  GITHUB: process.env.NEXT_PUBLIC_LINK_GITHUB || DEFAULT_LINKS.GITHUB,
  GITHUB_ORG:
    process.env.NEXT_PUBLIC_LINK_GITHUB_ORG || DEFAULT_LINKS.GITHUB_ORG,
  TWITTER: process.env.NEXT_PUBLIC_LINK_TWITTER || DEFAULT_LINKS.TWITTER,
  YOUTUBE: process.env.NEXT_PUBLIC_LINK_YOUTUBE || DEFAULT_LINKS.YOUTUBE,
  HOME: process.env.NEXT_PUBLIC_ROUTE_HOME || DEFAULT_LINKS.HOME,
  ABOUT: process.env.NEXT_PUBLIC_ROUTE_ABOUT || DEFAULT_LINKS.ABOUT,
  EVENTS: process.env.NEXT_PUBLIC_ROUTE_EVENTS || DEFAULT_LINKS.EVENTS,
  ADMIN: process.env.NEXT_PUBLIC_ROUTE_ADMIN || DEFAULT_LINKS.ADMIN,
};

// Complete dynamic config registry merging defaults, environment overrides, and runtime changes
const registry: typeof DEFAULT_LINKS = {
  ...DEFAULT_LINKS,
  ...ENV_LINKS,
};

/**
 * Access any centralized link or route.
 * Can be used in both static component rendering and dynamic API contexts.
 *
 * @param key The link identifier key
 * @returns The active URL/path string
 */
export function getLink(key: keyof typeof DEFAULT_LINKS): string {
  return registry[key];
}

/**
 * Dynamically updates one or more links in the registry at runtime.
 * Useful for updating paths dynamically from an API, Firestore registry, or Remote Config.
 *
 * @param newLinks Object containing key-value pairs to override in the registry
 */
export function updateLinks(newLinks: Partial<typeof DEFAULT_LINKS>): void {
  Object.assign(registry, newLinks);
}

/**
 * Export the static-ready LINKS object for easy access in components.
 * Re-evaluation can be done dynamically via helper function getLink(key).
 */
export const LINKS = registry;
