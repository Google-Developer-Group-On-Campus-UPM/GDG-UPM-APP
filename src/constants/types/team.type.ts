/**
 * Team Member Type Definitions
 *
 * This file contains TypeScript type definitions for team member data structures.
 * These types ensure type safety throughout the application and serve as documentation
 * for the expected data structure.
 */

/**
 * Team Member Interface
 *
 * Represents a single team member in the GDG UPM organization.
 * Used for displaying team members on the website and managing member data.
 */
export interface TeamMember {
  /** Unique identifier for the team member */
  id: string;

  /** Full name of the team member */
  name: string;

  /** Profile photo filename */
  image: string;

  /** Interest */
  interests: string;

  /** Social links */
  socialLinks: string[];

  /** Role/position within the department */
  currentRoleId: string;

  /** Department/team the member belongs to */
  currentDepartmentId: Department;

  /** Whether the member is currently active */
  isActive: boolean;

  /** Timestamp when the member was added */
  createdAt?: Date;

  /** Timestamp when the member info was last updated */
  updatedAt?: Date;
}

/**
 * Department Types
 *
 * Defines all the departments/teams within GDG UPM.
 * TODO: Must match the constants defined in constants.ts
 */
export type Department =
  | "lead"
  | "topboard"
  | "aiml"
  | "cloud"
  | "mobileapp"
  | "webapp"
  | "uiux"
  | "cybersecurity"
  | "creatives"
  | "communitysocials"
  | "externalrelations";

/**
 * Team Structure
 *
 * Represents the entire team organization with members grouped by department.
 */
export type TeamStructure = {
  [key in Department]: TeamMember[];
};

/**
 * Department Info
 *
 * Additional information about each department.
 */
export interface DepartmentInfo {
  id: Department;
  name: string;
  description?: string;
  memberCount?: number;
  color?: string; // For UI theming
  icon?: string; // Icon name or path
}
