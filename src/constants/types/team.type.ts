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

import { DocumentReference } from "firebase/firestore";
import { DataWithId } from "./base.type";

export interface Role extends DataWithId {
	title: string;
}

export interface Department extends DataWithId {
	id: DepartmentList;
	name: string;
	description?: string;
}
export interface TeamMember extends DataWithId {
	id?: string;
	ref?: DocumentReference;
	name: string | null;
	role: string | null;
	image: string | null;
	interest: string | null;
	social: {
		linkedin: string;
		[key: string]: string;
	};
	isActive: boolean;
	currentRoleID?: string;
	currentDepartmentID?: string;
}

/**
 * Department Types
 *
 * Defines all the departments/teams within GDG UPM.
 * TODO: Must match the constants defined in constants.ts
 */
export type DepartmentList =
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
	[key in DepartmentList]: TeamMember[];
};
