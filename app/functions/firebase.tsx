import { db } from "@/config/firebase-config"
import { doc, collection, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, QuerySnapshot, CollectionReference } from "firebase/firestore"

interface TeamMember {
	name: string;
	role: string;
	image: string;
	social: {
		facebook: string;
		twitter: string;
		github: string;
	};
	imagePositions: string;
}

async function addMemberToTeam(teamId: string, data: TeamMember): Promise<void> {
	try {
		const teamRef = await collection(doc(db, "team", teamId), "members");
		const memberExists = (await getDocs(teamRef)).docs.findIndex((doc) => doc.data().name === data.name);
		if (memberExists) {
			console.log("Member already exists in the team.");
			return;
		}
		await addDoc(teamRef, data);
		console.log("Member added to team successfully.");
	} catch (error) {
		console.error("Error adding member to team: ", error);
	}
	return;
}

async function updateMemberInTeam(teamId: string, memberId: string, data: TeamMember, merge?: boolean): Promise<void> {
	try {
		await setDoc(doc(db, "team", teamId, "members", memberId), data, { merge });
		console.log("Member updated in team successfully.");
	} catch (error) {
		console.error("Error updating member in team: ", error);
	}
	return;
}

async function addTeam(data: TeamMember): Promise<void> {
	try {
		const teamRef = await collection(db, "team");
		const teamExists = ((await getDocs(teamRef)).docs).findIndex((doc) => doc.data().name === data.name);
		if (teamExists) {
			console.log("Team already exists in the database.");
			return;
		}
		await addDoc(teamRef, data);
		console.log("Team added to database successfully.");
	} catch (error) {
		console.error("Error adding team to database: ", error);
	}
	return;
}

async function updateTeam(teamId: string, data: any, merge?: boolean): Promise<void> {
	try {
		await setDoc(doc(db, "team", teamId), data, { merge });
		console.log("Team updated in database successfully.");
	} catch (error) {
		console.error("Error updating team in database: ", error);
	}
	return;
}