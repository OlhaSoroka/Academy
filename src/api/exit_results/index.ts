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
  import { ExitResult } from "../models/result.model";
  
  export const updateExitResultById = async (
	id: string,
	result: ExitResult,
  ): Promise<boolean> => {
	const resultRef = doc(db, Collection.EXIT_RESULTS, `${id}`);
	await updateDoc(resultRef, result as any);
	return true;
  };
  
  export const updateStudentExitResult = async (
	studentId: string,
	result: Partial<ExitResult>,
  ): Promise<void> => {
	const collectionQuery = query(
	  collection(firestore, Collection.EXIT_RESULTS),
	  where("studentId", "==", studentId),
	);
	const documents = await getDocs(collectionQuery);
  
	documents.forEach(async (document) => {
	  const resultData = document.data();
	  await updateDoc(document.ref, { ...resultData, ...result });
	});
  };
  
  export const deleteExitResult = async (id: string): Promise<boolean> => {
	const resultRef = doc(db, Collection.EXIT_RESULTS, `${id}`);
	await deleteDoc(resultRef);
	return true;
  };
  
  export const getExitResultsByCourse = async (
	courseId: string,
  ): Promise<ExitResult[]> => {
	try {
	  const collectionQuery = query(
		collection(firestore, Collection.EXIT_RESULTS),
		where("courseId", "==", courseId),
	  );
	  const documents = await getDocs(collectionQuery);
	  const results: ExitResult[] = [];
	  documents.forEach((document) => {
		const result = document.data();
		results.push(result as ExitResult);
	  });
	  return results;
	} catch (error) {
	  console.log({ error });
	  return [];
	}
  };
  
  export const getExitResultsByStudent = async (
	studentId: string,
  ): Promise<ExitResult[]> => {
	const collectionQuery = query(
	  collection(firestore, Collection.EXIT_RESULTS),
	  where("studentId ", "==", studentId),
	);
	const documents = await getDocs(collectionQuery);
	const results: ExitResult[] = [];
	documents.forEach((document) => {
	  const result = document.data();
	  results.push(result as ExitResult);
	});
	return results;
  };
  
  export const createExitResult = async (data: ExitResult): Promise<ExitResult> => {
	const documentReference = doc(firestore, Collection.EXIT_RESULTS, `${data.id}`);
	await setDoc(documentReference, data.asObject());
	return data;
  };
  
  export const deleteStudentExitResults = async (
	studentId: string,
  ): Promise<void> => {
	const collectionQuery = query(
	  collection(firestore, Collection.EXIT_RESULTS),
	  where("studentId", "==", studentId),
	);
  
	const documents = await getDocs(collectionQuery);
	documents.forEach(async (document) => {
	  await deleteDoc(document.ref);
	});
  };
  
  export const deleteCoursesExitResults = async (courseId: string): Promise<void> => {
	const collectionQuery = query(
	  collection(firestore, Collection.EXIT_RESULTS),
	  where("courseId", "==", courseId),
	);
	const documents = await getDocs(collectionQuery);
	documents.forEach(async (document) => {
	  await deleteDoc(document.ref);
	});
  };
  