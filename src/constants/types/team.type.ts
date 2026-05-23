import { DocumentReference } from "firebase/firestore";
import { DataWithId } from "./base.type";

export interface Role extends DataWithId {
	id: string;
	title: string;
}

export interface Department extends DataWithId {
	id: string;
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
