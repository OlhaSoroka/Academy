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
import { Homework } from "../models/homework.model";

export const updateHomeworkById = async (
  id: string,
  homework: Homework,
): Promise<boolean> => {
  const homeworkRef = doc(db, Collection.HOMEWORKS, `${id}`);
  await updateDoc(homeworkRef, homework as any);
  return true;
};

export const deleteHomework = async (id: string): Promise<boolean> => {
  const homeworkRef = doc(db, Collection.HOMEWORKS, `${id}`);
  await deleteDoc(homeworkRef);
  return true;
};

export const getHomeworksByCourse = async (
  courseId: string,
): Promise<Homework[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.HOMEWORKS),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  const homeworks: Homework[] = [];
  documents.forEach((document) => {
    const homework = document.data();
    homeworks.push(homework as Homework);
  });
  return homeworks;
};

export const getHomeworksByStudent = async (
  studentId: string,
): Promise<Homework[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.HOMEWORKS),
    where("studentId ", "==", studentId),
  );
  const documents = await getDocs(collectionQuery);
  const homeworks: Homework[] = [];
  documents.forEach((document) => {
    const homework = document.data();
    homeworks.push(homework as Homework);
  });
  return homeworks;
};

export const createHomework = async (data: Homework): Promise<Homework> => {
  const documentReference = doc(firestore, Collection.HOMEWORKS, `${data.id}`);
  await setDoc(documentReference, data.asObject());
  return data;
};

export const deleteStudentHomeworks = async (
  studentId: string,
): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.HOMEWORKS),
    where("studentId ", "==", studentId),
  );

  const documents = await getDocs(collectionQuery);
  const deletePromises: Promise<void>[] = [];
  documents.forEach((document) => {
    deletePromises.push(deleteDoc(document.ref));
  });
  await Promise.all(deletePromises);
};
