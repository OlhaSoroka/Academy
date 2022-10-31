import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firebaseAuth, firestore } from "../../main";
import { ROLES } from "../../models/router.model";
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
		return true
	} catch (error) {
		console.log({ error });
		return false
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
		const collectionQuery = query(collection(firestore, Collection.USERS), where("role", "==", role));
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

export const updateUserByID = async (id: string, data: Partial<AppUser>): Promise<AppUser | null> => {
	try {
		const documentReference = doc(firestore, Collection.USERS, id);
		const document = await getDoc(documentReference);
		const user = document.data() as AppUser;

		const userToUpdate: AppUser = { ...user, ...data };

		await updateDoc(documentReference, userToUpdate as any);

		localStorage.setItem('currentUser', JSON.stringify(userToUpdate));

		return userToUpdate;
	} catch (error) {
		console.log({ error });
		return null;
	}
};

export const registerUser = async (data: RegisterUserBody): Promise<AppUser | null> => {
	try {
		const credentials = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
		const uid = credentials.user.uid;
		const newUser: AppUser = {
			avatarUrl: 'asd',
			course: data.course || '',
			email: data.email,
			fullName: data.fullName,
			role: data.role,
			id: uid
		};

		const documentReference = doc(firestore, Collection.USERS, uid);
		await setDoc(documentReference, newUser);
		return newUser;
	} catch (error) {
		console.log({ error });
		return null;
	}
};
