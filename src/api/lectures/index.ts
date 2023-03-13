import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db, firestore } from "../../main";
import {
  createHomework,
  deleteLectureHomeworks,
  getHomeworksByLecture,
  updateHomeworkById,
} from "../homework";
import { Collection } from "../models/collection.enum";
import { LectureHomework, StudentHomework } from "../models/homework.model";
import { Lecture } from "../models/lecture.model";
import { getStudentsByCourse } from "../user";
import { ToastType, useToastStore } from "../../store/toast.store";

export const updateLectureById = async (
  id: string,
  lecture: Lecture,
): Promise<boolean> => {
  const lectureRef = doc(db, Collection.LECTURES, `${id}`);
  delete lecture.mentor;
  const lectureHomework = await getHomeworksByLecture(id);
  lectureHomework.students.forEach((student) => {
    student.deadline = lecture.dateOfDeadline;
  });
  await updateHomeworkById(lectureHomework.id,lectureHomework)
  await updateDoc(lectureRef, lecture as any);
  return true;
};

export const deleteLecture = async (id: string): Promise<boolean> => {
  const lectureRef = doc(db, Collection.LECTURES, `${id}`);
  await deleteDoc(lectureRef);
  await deleteLectureHomeworks(id);
  const toastStore = useToastStore();
  toastStore.showToastMessage({
    message: "Lecture successfully deleted",
    type: ToastType.SUCCESS,
  });
  return true;
};
 
export const getLectureByCourse = async (
  courseId: string,
): Promise<Lecture[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.LECTURES),
    where("courseId", "==", courseId),
    orderBy("createdAt", "asc"),
  );
  const documents = await getDocs(collectionQuery);
  const lectures: Lecture[] = [];
  documents.forEach((document) => {
    const lecture = document.data();
    lectures.push(lecture as Lecture);
  });
  return lectures;
};

export const getLectureByMentor = async (
  mentorId: string,
): Promise<Lecture[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.LECTURES),
    where("mentorId", "==", mentorId),
    orderBy("createdAt", "asc"),
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
  const lectureHomework = new LectureHomework(uuidv4(), data.id, data.courseId);
  const students = await getStudentsByCourse(data.courseId);
  for (const student of students) {
    lectureHomework.students.push(new StudentHomework(student.id).asObject());
  }
  await createHomework(lectureHomework);
  return data;
};

export const deleteCoursesLectures = async (
  courseId: string,
): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.LECTURES),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  documents.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
};
