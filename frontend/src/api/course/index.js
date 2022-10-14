/* import axios from "../index"
export const COURSES_URL = `https://fake-server-vue-js-app.herokuapp.com` */

import { db } from "@/main"; /* 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; */
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

export const getAllCourses = async () => {
  try {
    const coursesData = await getDocs(collection(db, "courses"));
    const courses = [];
    coursesData.forEach((course) => courses.push(course.data()));
	return courses;
  } catch (error) {
    console.log({ error });
  }
};

export const updateCourseById = async (id, course) => {
  try {
    const courseRef = doc(db, "courses", `${id}`);
    await updateDoc(courseRef, course);
  } catch (error) {
    console.log({ error });
  }
};

export const patchCourse = async (id, field, value) => {
  try {
    const courseRef = doc(db, 'courses', `${id}`);
    const docSnap = await getDoc(courseRef);
    docSnap[field] = value;
    console.log(docSnap)
    /* console.log(id, field, value) */
    /* await updateDoc(courseRef, {field: value} ) */
  } catch (error) {
    console.log({ error });
  }
};

export const deleteCourse = async (id) => {
  try {
    const coursesRef = doc(db, "courses", `${id}`);
    await deleteDoc(coursesRef);
  } catch (error) {
    console.log({ error });
  }
};
