import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../main";
import { Collection } from "../models/collection.enum";
import { Course } from "../models/course.model";

export const getAllCourses = async (): Promise<Course[] | undefined> => {
  try {
    const coursesData = await getDocs(collection(db, Collection.COURSES));
    const courses: Course[] = [];
    coursesData.forEach((course) => courses.push(course.data() as Course));
    return courses;
  } catch (error) {
    console.log({ error });
  }
};

export const updateCourseById = async (id: string, course: Course): Promise<void> => {
  try {
    const courseRef = doc(db, Collection.COURSES, `${id}`);
    await updateDoc(courseRef, course as any);
  } catch (error) {
    console.log({ error });
  }
};

export const patchCourse = async (id: string, field: keyof Course, value: Course[keyof Course]): Promise<void> => {
  try {
    const documentReference = doc(db, Collection.COURSES, `${id}`);
    const document = await getDoc(documentReference);
	const course: Course = document.data() as Course;
	(course[field as keyof Course] as any) = value;
  } catch (error) {
    console.log({ error });
  }
};

export const deleteCourse = async (id: string): Promise<void> => {
  try {
    const coursesRef = doc(db, Collection.COURSES, `${id}`);
    await deleteDoc(coursesRef);
  } catch (error) {
    console.log({ error });
  }
};