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
import { Lecture } from "../models/lecture.model";

export const updateLectureById = async (
  id: string,
  lecture: Lecture,
): Promise<boolean> => {
  const lectureRef = doc(db, Collection.LECTURES, `${id}`);
  delete lecture.mentor;
  await updateDoc(lectureRef, lecture as any);
  return true;
};

export const deleteLecture = async (id: string): Promise<boolean> => {
  const lectureRef = doc(db, Collection.LECTURES, `${id}`);
  await deleteDoc(lectureRef);
  return true;
};

export const getLectureByCourse = async (
  courseId: string,
): Promise<Lecture[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.LECTURES),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  const lectures: Lecture[] = [];
  documents.forEach((document) => {
    const lecture = document.data();
    lectures.push(lecture as Lecture);
  });
  return lectures;
};

export const createLecture = async (data: Lecture): Promise<Lecture> => {
  const documentReference = doc(firestore, Collection.LECTURES, `${data.id}`);
  await setDoc(documentReference, data.asObject());
  return data;
};
