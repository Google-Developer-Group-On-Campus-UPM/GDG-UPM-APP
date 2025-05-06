import { db } from "@/config/firebase-config"
import { doc, collection, getDoc, getDocs, setDoc, addDoc, deleteDoc, query, where, QuerySnapshot } from "firebase/firestore"

// TODO: Test this code with a real firebase project and add types to the functions
// TODO: Add delete functions for team and team members

interface TeamMember {
	id: string;
	name: string;
	role: string;
	image: string;
	social: {
		instagram: string;
		linkedin: string;
		github: string;
	};
	imagePositions: string;
}

interface Team {
	id: string;
	name: string;
	data: {
		[key: string]: () => Promise<TeamMember[]>;
	}
}

async function addMemberToTeam(teamId: string, data: TeamMember): Promise<string> {
	try {
		const teamRef = await collection(doc(db, "team", teamId), "members");
		const memberExists = (await getDocs(teamRef)).docs.findIndex((doc) => doc.data().name === data.name);
		if (memberExists) {
			throw new Error("Member already exists in the team.");
		}
		await addDoc(teamRef, data);
		return "Member added to team successfully.";
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Error adding member to team: " + error.message);
		}
		throw new Error("Unknown error adding member to team.");
	}
}

async function updateMemberInTeam(teamId: string, memberId: string, data: TeamMember, merge?: boolean): Promise<string> {
	try {
		await setDoc(doc(db, "team", teamId, "members", memberId), data, { merge });
		return "Member updated in team successfully.";
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Error updating member in team: " + error.message);
		}
		throw new Error("Unknown error updating member in team.");
	}
}

async function addTeam(data: TeamMember, team?: QuerySnapshot): Promise<string> {
	try {
		const teamCollectionRef = await collection(db, "team");
		if (!team) {
			team = (await getDocs(teamCollectionRef));
		}
		const teamExists = (team.docs).findIndex((doc) => doc.data().name === data.name);
		if (teamExists) {
			throw new Error("Team already exists in the database");
		}
		await addDoc(teamCollectionRef, data);
		return "Team added to database successfully.";
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Error adding team to database: " + error.message);
		}
		throw new Error("Unknown error adding team to database.");
	}
}

async function updateTeam(teamId: string, data: any, merge?: boolean): Promise<string> {
	try {
		await setDoc(doc(db, "team", teamId), data, { merge });
		return "Team updated in database successfully.";
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Error updating team in database: " + error.message);
		}
		throw new Error("Unknown error updating team in database");
	}
}

async function getTeams(): Promise<Team[]> {
	try {
		const teamsRef = await getDocs(collection(db, "team"));
		const teams = await Promise.all(
			teamsRef.docs.map(async (doc) => {
			const data = doc.data();
			return { 
				id: doc.id,
				name: data.name,
				data: {
					[data.name]: () => getMembersOfTeam(doc.id)  
				}
			}
		}));
		return teams
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Error fetching teams: " + error.message);
		}
		throw new Error("Unknown error fetching teams");
	}
}

async function getTeam(name: string, teams?: Team[]): Promise<Object> {
	try {
		if (!teams) {
			teams = await getTeams();
		}
		const team = teams.find((team) => team.name === name);
		if (team) {
			return team;
		} else {
			throw new Error("Team not found.");
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Error fetching team: " + error.message);
		}
		throw new Error("Unknown error fetching team");
	}
} {

} 

async function getMembersOfTeam(teamId: string): Promise<TeamMember[]> {
	try {
		const teamDoc = await getDoc(doc(db, "team", teamId));
		if (!teamDoc.exists()) {
			throw new Error("Error: Team doesn't exist.");
		}
		const membersDocs = await getDocs(collection(teamDoc.ref, "members"));
		return membersDocs.docs.map((doc) => {
			const data = doc.data();
			return { 
				id: doc.id,
				name: data.name,
				role: data.role,
				image: data.image || "",
				social: {
					instagram: data.social?.instagram || "",
					linkedin: data.social?.linkedin || "",
					github: data.social?.github || ""
				},
				imagePositions: data.imagePositions || ""
			}
		});
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Error fetching team members: " + error.message);
		}
		throw new Error("Unknown error fetching team members.");
	}
}