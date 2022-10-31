import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db, firestore } from "../../main";
import { Collection } from "../models/collection.enum";
import { Course } from "../models/course.model";
import { ICourse } from "../../models/courses.models";

export const getAllCourses = async ()/* : Promise<Course[] | undefined> */ => {
  try {
    const coursesData = await getDocs(collection(db, Collection.COURSES));
    const courses: ICourse[] = [];
    coursesData.forEach((course) => courses.push(course.data() as ICourse));
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


export const getCourseByName = async (name: string): Promise<Course | null> => {
  try {
    const collectionQuery = query(collection(firestore, Collection.COURSES), where("name", "==", name));
    const documents = await getDocs(collectionQuery);
		const courses: Course[] = [];
		documents.forEach((document) => {
			const course = document.data();
			courses.push(course as Course);
		});
    return courses[0];
  } catch  {
    return null
  }
}
