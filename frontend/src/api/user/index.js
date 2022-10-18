import { firebaseAuth, firestore, storage } from '@/main';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { USER_COLLECTION } from '../collections.const';
import { createImageUrl } from '../storage';

export const deleteUserById = async (id) => {
	try {
		const documentReference = doc(firestore, USER_COLLECTION, id);
		await deleteDoc(documentReference);
		return 'User deleted';
	} catch (error) {
		console.log({ error });
	}
};

export const getAllUsers = async () => {
	try {
		const collectionReference = collection(firestore, USER_COLLECTION);
		const documents = await getDocs(collectionReference);
		const users = [];
		documents.forEach((document) => {
			const user = document.data();
			users.push(user);
		});
		return users;
	} catch (error) {
		console.log({ error });
	}
};

export const gethUserByID = async (id) => {
	try {
		const documentReference = doc(firestore, USER_COLLECTION, id);
		const document = await getDoc(documentReference);
		const user = document.data();
		return user;
	} catch (error) {
		console.log({ error });
	}
};

export const updateUserByID = async (id, data) => {
	try {
		const documentReference = doc(firestore, USER_COLLECTION, id);
		const document = await getDoc(documentReference);
		const user = document.data();

		const userToUpdate = { ...user, ...data };

		await updateDoc(documentReference, userToUpdate);

		localStorage.setItem('currentUser', JSON.stringify(userToUpdate));

		return userToUpdate;
	} catch (error) {
		console.log({ error });
	}
};

export const registerUser = async (data) => {
	try {
		const credentials = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
		const uid = credentials.user.uid;
		const newUser = {
			avatarUrl: await createImageUrl(ref(storage, 'images/default-avatar.jpg')),
			course: data.course || '',
			email: data.email,
			fullName: data.fullName,
			role: data.role,
			id: uid,
		};

		const documentReference = doc(firestore, USER_COLLECTION, uid);
		await setDoc(documentReference, newUser);
		return newUser;
	} catch (error) {
		console.log({ error });
	}
};
