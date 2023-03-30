import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { db, firestore } from "../../main";
import { Collection } from "../models/collection.enum";
import { Course } from "../models/course.model";
import { ToastType, useToastStore } from "../../store/toast.store";

export const getAllCourses = async ()/* : Promise<Course[] | undefined> */ => {
  try {
    const collectionQuery = query(
      collection(firestore, Collection.COURSES),
      orderBy("createdAt", "desc"),
    );
    const documents = await getDocs(collectionQuery);
    const courses: Course[] = [];
    documents.forEach((document) => courses.push(document.data() as Course));
    return courses;
  } catch (error) {
    console.log({ error });
  }
};

export const updateCourseById = async (id: string, course: Course): Promise<void> => {
  try {
    const courseRef = doc(db, Collection.COURSES, `${id}`);
    await updateDoc(courseRef, course as any);
    const toastStore = useToastStore();
    toastStore.showToastMessage({
      message: "Course info successfully updated",
      type: ToastType.SUCCESS,
    });
  } catch (error) {
    console.log({ error });
    const toastStore = useToastStore();
    toastStore.showToastMessage({
      message: "Error: Can't updated course info",
      type: ToastType.FAILURE,
    });
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


export const getCourseById = async (id: string): Promise<Course> => {
  const collectionQuery = query(collection(firestore, Collection.COURSES), where("id", "==", id));
  const documents = await getDocs(collectionQuery);
  const courses: Course[] = [];
  documents.forEach((document) => {
    const course = document.data();
    courses.push(course as Course);
  });
  return courses[0];
}


export const createCourse = async (data: Course): Promise<Course | null> => {
	try {
		const documentReference = doc(firestore, Collection.COURSES, `${data.id}`);
		await setDoc(documentReference, data.asObject());
		return data;
	} catch (error) {
		console.log({ error });
		return null;
	}
};