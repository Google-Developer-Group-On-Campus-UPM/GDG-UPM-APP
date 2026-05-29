/**
 * Application Constants
 *
 * This file contains all the constant values used throughout the GDG UPM application.
 * Centralizing constants makes the app easier to maintain and update.
 *
 * Categories:
 * 1. Site configuration
 * 2. API endpoints and URLs
 * 3. UI configuration (colors, sizes, breakpoints)
 * 4. Feature flags and environment settings
 * 5. Social media links and contact information
 */

/**
 * Constants Organization:
 * 1. Site metadata and branding
 * 2. Navigation and routing constants
 * 3. Firebase collection names
 * 4. UI theme and styling constants
 * 5. External links and social media
 * 6. Feature flags and configurations
 */

import { LINKS } from "./links";

// Site Configuration
export const SITE_NAME = "GDGoC UPM";
export const SITE_DESCRIPTION =
  "Google Developer Group on Campus - Universiti Putra Malaysia";
export const SITE_URL = LINKS.COMMUNITY_PLATFORM;
export const ORGANIZATION_NAME = "Google Developer Group on Campus UPM";

// Contact Information
export const CONTACT_EMAIL = "gdgocupm@gmail.com"; // TODO: Update with actual email
export const UNIVERSITY_NAME = "Universiti Putra Malaysia";
export const UNIVERSITY_LOCATION = "Serdang, Selangor, Malaysia";

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: LINKS.FACEBOOK,
  INSTAGRAM: LINKS.INSTAGRAM,
  LINKEDIN: LINKS.LINKEDIN,
  GITHUB: LINKS.GITHUB,
  TWITTER: LINKS.TWITTER,
};

// Navigation Routes
export const ROUTES = {
  HOME: LINKS.HOME,
  ABOUT: LINKS.ABOUT,
  EVENTS: LINKS.EVENTS,
  ADMIN: LINKS.ADMIN,
};

// Firebase Collection Names
export const COLLECTIONS = {
  EVENTS: "events",
  PARTNERS: "partners",
  USERS: "users",
  ROLES: "roles",
  DEPARTMENTS: "departments",
} as const;

// Team Departments
export const DEPARTMENTS = {
  LEAD: "lead",
  TOP_BOARD: "topboard",
  AI_ML: "aiml",
  CLOUD: "cloud",
  MOBILE_APP: "mobileapp",
  WEB_APP: "webapp",
  UI_UX: "uiux",
  CYBERSECURITY: "cybersecurity",
  CREATIVES: "creatives",
  COMMUNITY_SOCIALS: "communitysocials",
  EXTERNAL_RELATIONS: "externalrelations",
} as const;

// Department Display Names
export const DEPARTMENT_NAMES = {
  [DEPARTMENTS.LEAD]: "Leadership",
  [DEPARTMENTS.TOP_BOARD]: "Top Board",
  [DEPARTMENTS.AI_ML]: "AI/ML",
  [DEPARTMENTS.CLOUD]: "Cloud",
  [DEPARTMENTS.MOBILE_APP]: "Mobile App",
  [DEPARTMENTS.WEB_APP]: "Web App",
  [DEPARTMENTS.UI_UX]: "UI/UX",
  [DEPARTMENTS.CYBERSECURITY]: "Cybersecurity",
  [DEPARTMENTS.CREATIVES]: "Creatives",
  [DEPARTMENTS.COMMUNITY_SOCIALS]: "Community & Socials",
  [DEPARTMENTS.EXTERNAL_RELATIONS]: "External Relations",
} as const;

// Image Paths
export const IMAGE_PATHS = {
  LOGO: "/images/GDG_Logo.svg",
  TEAM_PHOTOS: "/images/team/",
  EVENT_IMAGES: "/images/events/",
  HERO_IMAGES: "/images/hero/",
  SOCIAL_ICONS: "/images/social/",
} as const;

// Pagination
export const ITEMS_PER_PAGE = {
  EVENTS: 3,
  TEAM_MEMBERS: 12,
} as const;

// Event Status
export const EVENT_STATUS = {
  UPCOMING: "upcoming",
  PAST: "past",
} as const;

// UI Configuration
export const UI_CONFIG = {
  // Breakpoints (matching Tailwind CSS)
  BREAKPOINTS: {
    SM: "640px",
    MD: "768px",
    LG: "1024px",
    XL: "1280px",
    "2XL": "1536px",
  },

  // Animation Durations
  ANIMATIONS: {
    FAST: "150ms",
    NORMAL: "300ms",
    SLOW: "500ms",
  },

  // Z-Index Layers
  Z_INDEX: {
    DROPDOWN: 1000,
    MODAL: 1050,
    TOOLTIP: 1100,
    NOTIFICATION: 1200,
  },

  // Common Sizes
  SIZES: {
    AVATAR_SM: 32,
    AVATAR_MD: 48,
    AVATAR_LG: 64,
    LOGO_SM: 40,
    LOGO_MD: 56,
    LOGO_LG: 72,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "An unexpected server error occurred. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  RATE_LIMIT: "Too many requests. Please wait a moment and try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: "Changes saved successfully!",
  DELETE_SUCCESS: "Item deleted successfully!",
  UPDATE_SUCCESS: "Update completed successfully!",
  UPLOAD_SUCCESS: "File uploaded successfully!",
  EMAIL_SENT: "Email sent successfully!",
};
