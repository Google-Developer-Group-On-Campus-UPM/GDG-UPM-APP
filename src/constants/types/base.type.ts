import { DocumentData, DocumentReference } from "firebase/firestore";

export interface DataWithId extends DocumentData {
  id?: string;
  ref?: DocumentReference;
}
