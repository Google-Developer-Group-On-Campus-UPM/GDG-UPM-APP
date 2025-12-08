import { DocumentData } from "firebase/firestore";

export interface DataWithId extends DocumentData {
  id?: string;
}
