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
import { Result } from "../models/result.model";

export const updateResultById = async (
  id: string,
  result: Result,
): Promise<boolean> => {
  const resultRef = doc(db, Collection.RESULTS, `${id}`);
  await updateDoc(resultRef, result as any);
  return true;
};

export const updateStudentResult = async (
  studentId: string,
  result: Partial<Result>,
): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.RESULTS),
    where("studentId", "==", studentId),
  );
  const documents = await getDocs(collectionQuery);

  documents.forEach(async (document) => {
    const resultData = document.data();
    await updateDoc(document.ref, { ...resultData, ...result });
  });
};

export const deleteResult = async (id: string): Promise<boolean> => {
  const resultRef = doc(db, Collection.RESULTS, `${id}`);
  await deleteDoc(resultRef);
  return true;
};

export const getResultsByCourse = async (
  courseId: string,
): Promise<Result[]> => {
  try {
    const collectionQuery = query(
      collection(firestore, Collection.RESULTS),
      where("courseId", "==", courseId),
    );
    const documents = await getDocs(collectionQuery);
    const results: Result[] = [];
    documents.forEach((document) => {
      const result = document.data();
      results.push(result as Result);
    });
    return results;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getResultsByStudent = async (
  studentId: string,
): Promise<Result[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.RESULTS),
    where("studentId ", "==", studentId),
  );
  const documents = await getDocs(collectionQuery);
  const results: Result[] = [];
  documents.forEach((document) => {
    const result = document.data();
    results.push(result as Result);
  });
  return results;
};

export const createResult = async (data: Result): Promise<Result> => {
  const documentReference = doc(firestore, Collection.RESULTS, `${data.id}`);
  await setDoc(documentReference, data.asObject());
  return data;
};

export const deleteStudentResults = async (
  studentId: string,
): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.RESULTS),
    where("studentId", "==", studentId),
  );

  const documents = await getDocs(collectionQuery);
  documents.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
};

export const deleteCoursesResults = async (courseId: string): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.RESULTS),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  documents.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
};
