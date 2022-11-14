import { createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseAuth, firestore } from "../../main";
import { ROLES } from "../../models/router.model";
import { ToastType, useToastStore } from "../../store/toast.store";
import { Collection } from "../models/collection.enum";
import { AppUser, RegisterUserBody } from "../models/user.model";
import { createImageUrl, deleteImage } from "../storage";

export const deleteUserById = async (id: string): Promise<boolean> => {
  try {
    const documentReference = doc(firestore, Collection.USERS, id);
    const document = await getDoc(documentReference);
    const email = (document.data() as AppUser).email as string;
    await deleteImage(email);
    await deleteDoc(documentReference);
    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const getAllUsers = async (): Promise<AppUser[]> => {
  try {
    const collectionReference = collection(firestore, Collection.USERS);
    const documents = await getDocs(collectionReference);
    const users: AppUser[] = [];
    documents.forEach((document) => {
      const user = document.data();
      users.push(user as AppUser);
    });
    return users;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getUsersByRole = async (role: ROLES): Promise<AppUser[]> => {
  try {
    const collectionQuery = query(
      collection(firestore, Collection.USERS),
      where("role", "==", role),
    );
    const documents = await getDocs(collectionQuery);
    const users: AppUser[] = [];
    documents.forEach((document) => {
      const user = document.data();
      users.push(user as AppUser);
    });
    return users;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getStudentsByCourse = async (courseId: string): Promise<AppUser[]> => {
	try {
		const collectionQuery = query(collection(firestore, Collection.USERS), where("courseId", "==", courseId));
		const documents = await getDocs(collectionQuery);
		const students: AppUser[] = [];
		documents.forEach((document) => {
		  const student = document.data();
		  students.push(student as AppUser);
		});
		return students;
	} catch (error) {
		console.log({error});
		return []
	}
  }

export const gethUserByID = async (id: string): Promise<AppUser | null> => {
  try {
    const documentReference = doc(firestore, Collection.USERS, id);
    const document = await getDoc(documentReference);
    const user = document.data() as AppUser;
    return user;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const updateUserByID = async (
  id: string,
  data: Partial<AppUser>,
): Promise<AppUser | null> => {
  try {
    const documentReference = doc(firestore, Collection.USERS, id);
    const document = await getDoc(documentReference);
    const user = document.data() as AppUser;
    const userToUpdate: AppUser = { ...user, ...data };
    await updateDoc(documentReference, userToUpdate as any);
    return userToUpdate;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const registerUser = async (
  data: RegisterUserBody,
): Promise<AppUser> => {
  const credentials = await createUserWithEmailAndPassword(
    firebaseAuth,
    data.email,
    data.password,
  );
  const uid = credentials.user.uid;
  const newUser: AppUser = {
    id: uid,
    avatarUrl: "",
    courseId: data.courseId || "",
    email: data.email,
    fullName: data.fullName,
    role: data.role
  };

  const documentReference = doc(firestore, Collection.USERS, uid);
  await setDoc(documentReference, newUser);
  return newUser;
};

export const changePassword = async (newPassword: string): Promise<boolean> => {
  const toastStore = useToastStore();
  try {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      await updatePassword(currentUser, newPassword);
      toastStore.showToastMessage({
        message: "Password successfully updated",
        type: ToastType.SUCCESS,
      });
      return true;
    }
    toastStore.showToastMessage({
      message: "Can't find this user",
      type: ToastType.FAILURE,
    });
    return false;
  } catch {
    toastStore.showToastMessage({
      message: "Can't update user password",
      type: ToastType.FAILURE,
    });
    return false;
  }
};

export const getMentorsAndAdmins = async (): Promise<AppUser[]> => {
	try {
		const collectionQuery = query(collection(firestore, Collection.USERS), where("role", "!=", ROLES.STUDENTS_ROLE));
		const documents = await getDocs(collectionQuery);
		const users: AppUser[] = [];
		documents.forEach((document) => {
		  const user = document.data();
		  users.push(user as AppUser);
		});
		return users;
	} catch (error) {
		console.log({error});
		return []
	}
  }
