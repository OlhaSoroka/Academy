import { deleteObject, getDownloadURL, ref, StorageReference, uploadBytes } from "firebase/storage";
import { storage } from "../../main";

export const createImageUrl = async (imageRef: StorageReference) => {
	return await getDownloadURL(imageRef);
};

export const createImageRef = (userEmail: string) => {
	const imageRef = ref(storage, `/images/${userEmail}.jpg`);
	return imageRef;
};

export const uploadImage = async (imageRef: StorageReference, image: File) => {
	try {
		const snapshot = await uploadBytes(imageRef, image);
		return snapshot;
	} catch (error) {
		return null;
	}
};
export const deleteImage = async (userEmail: string) => {
	try {
		const imageRef = ref(storage , `/images/${userEmail}.jpg`)
		await deleteObject(imageRef)
		return true
	} catch (error) {
		return false
	}
} 


