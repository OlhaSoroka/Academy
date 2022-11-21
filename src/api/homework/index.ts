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
import { LectureHomework } from "../models/homework.model";

export const updateHomeworkById = async (
  id: string,
  homework: LectureHomework,
): Promise<boolean> => {
  const homeworkRef = doc(db, Collection.HOMEWORKS, `${id}`);
  delete homework.asObject;
  await updateDoc(homeworkRef, homework as any);
  return true;
};

export const deleteHomework = async (id: string): Promise<boolean> => {
  const homeworkRef = doc(db, Collection.HOMEWORKS, `${id}`);
  await deleteDoc(homeworkRef);
  return true;
};

export const getHomeworksByLecture = async (
  lectureId: string,
): Promise<LectureHomework> => {
  const collectionQuery = query(
    collection(firestore, Collection.HOMEWORKS),
    where("lectureId", "==", lectureId),
  );
  const documents = await getDocs(collectionQuery);
  const homeworks: LectureHomework[] = [];
  documents.forEach((document) => {
    const homework = document.data();
    homeworks.push(homework as LectureHomework);
  });
  return homeworks[0];
};

export const getCoursesHomeworks = async (
  courseId: string,
): Promise<LectureHomework[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.HOMEWORKS),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  const homeworks: LectureHomework[] = [];
  documents.forEach((document) => {
    const homework = document.data();
    homeworks.push(homework as LectureHomework);
  });
  return homeworks;
};


export const createHomework = async (
  data: LectureHomework,
): Promise<LectureHomework> => {
  const documentReference = doc(firestore, Collection.HOMEWORKS, `${data.id}`);
  await setDoc(documentReference, data.asObject!());
  return data;
};

export const deleteLectureHomeworks = async (
  lectureId: string,
): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.HOMEWORKS),
    where("lectureId", "==", lectureId),
  );
  const documents = await getDocs(collectionQuery);
  documents.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
};

export const deleteCoursesHomeworks = async (
  courseId: string,
): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.HOMEWORKS),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  documents.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
};
