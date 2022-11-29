import {
	collection,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	query,
	where,
	setDoc,
  } from "firebase/firestore";
  import { db, firestore } from "../../main";
  import { Collection } from "../models/collection.enum";
  import { EntryResult } from "../models/result.model";
  
  export const updateEntryResultById = async (
	id: string,
	result: EntryResult,
  ): Promise<boolean> => {
	const resultRef = doc(db, Collection.ENTRY_RESULTS, `${id}`);
	await updateDoc(resultRef, result as any);
	return true;
  };
  
  export const updateStudentEntryResult = async (
	studentId: string,
	result: Partial<EntryResult>,
  ): Promise<void> => {
	const collectionQuery = query(
	  collection(firestore, Collection.ENTRY_RESULTS),
	  where("studentId", "==", studentId),
	);
	const documents = await getDocs(collectionQuery);
  
	documents.forEach(async (document) => {
	  const resultData = document.data();
	  await updateDoc(document.ref, { ...resultData, ...result });
	});
  };
  
  export const deleteEntryResult = async (id: string): Promise<boolean> => {
	const resultRef = doc(db, Collection.ENTRY_RESULTS, `${id}`);
	await deleteDoc(resultRef);
	return true;
  };
  
  export const getEntryResultsByCourse = async (
	courseId: string,
  ): Promise<EntryResult[]> => {
	try {
	  const collectionQuery = query(
		collection(firestore, Collection.ENTRY_RESULTS),
		where("courseId", "==", courseId),
	  );
	  const documents = await getDocs(collectionQuery);
	  const results: EntryResult[] = [];
	  documents.forEach((document) => {
		const result = document.data();
		results.push(result as EntryResult);
	  });
	  return results;
	} catch (error) {
	  console.log({ error });
	  return [];
	}
  };
  
  export const getEntryResultsByStudent = async (
	studentId: string,
  ): Promise<EntryResult[]> => {
	const collectionQuery = query(
	  collection(firestore, Collection.ENTRY_RESULTS),
	  where("studentId ", "==", studentId),
	);
	const documents = await getDocs(collectionQuery);
	const results: EntryResult[] = [];
	documents.forEach((document) => {
	  const result = document.data();
	  results.push(result as EntryResult);
	});
	return results;
  };
  
  export const createEntryResult = async (data: EntryResult): Promise<EntryResult> => {
	const documentReference = doc(firestore, Collection.ENTRY_RESULTS, `${data.id}`);
	await setDoc(documentReference, data.asObject());
	return data;
  };
  
  export const deleteStudentEntryResults = async (
	studentId: string,
  ): Promise<void> => {
	const collectionQuery = query(
	  collection(firestore, Collection.ENTRY_RESULTS),
	  where("studentId", "==", studentId),
	);
  
	const documents = await getDocs(collectionQuery);
	documents.forEach(async (document) => {
	  await deleteDoc(document.ref);
	});
  };
  
  export const deleteCoursesEntryResults = async (courseId: string): Promise<void> => {
	const collectionQuery = query(
	  collection(firestore, Collection.ENTRY_RESULTS),
	  where("courseId", "==", courseId),
	);
	const documents = await getDocs(collectionQuery);
	documents.forEach(async (document) => {
	  await deleteDoc(document.ref);
	});
  };
  