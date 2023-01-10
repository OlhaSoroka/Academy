import {
	collection,
	getDocs,
	doc,
	query,
	where,
	deleteDoc,
	setDoc,
  } from "firebase/firestore";
  import { db, firestore } from "../../main";
  import { Collection } from "../models/collection.enum";
  import { Update, UpdateCategory } from "../models/update.model";
  
  
  export const deleteUpdate = async (id: string): Promise<boolean> => {
	const resultRef = doc(db, Collection.UPDATES, `${id}`);
	await deleteDoc(resultRef);
	return true;
  };
  
  export const createUpdate = async (data: Update): Promise<Update> => {
	const documentReference = doc(firestore, Collection.UPDATES, `${data.id}`);
	await setDoc(documentReference, data.asObject());
	return data;
  };
  
  export const getAllUpdates = async (): Promise<Update[]> => {
	const updatesData = await getDocs(collection(db, Collection.UPDATES));
	const updates: Update[] = [];
	updatesData.forEach((update) => updates.push(update.data() as Update));
	return updates;
  };
  
  export const getUpdatesByCategory = async (
	category: UpdateCategory,
  ): Promise<Update[]> => {
	const collectionQuery = query(
	  collection(firestore, Collection.UPDATES),
	  where("category", "==", category),
	);
	const documents = await getDocs(collectionQuery);
	const updates: Update[] = [];
	documents.forEach((document) => {
	  const update = document.data();
	  updates.push(update as Update);
	});
	return updates;
  };