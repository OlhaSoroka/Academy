import { storage } from '@/main';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';

export const createImageUrl = async (imageRef) => {
	return await getDownloadURL(imageRef);
};

export const createImageRef = (userEmail) => {
	const imageRef = ref(storage, `/images/${userEmail}.jpg`);
	return imageRef;
};

export const uploadImage = async (imageRef, image) => {
	try {
		const snapshot = await uploadBytes(imageRef, image);
		return snapshot;
	} catch (error) {
		return 'Uploaded failed';
	}
};
export const deleteImage = async (userEmail) => {
	try {
		const imageRef = ref(storage , `/images/${userEmail}.jpg`)
		await deleteObject(imageRef)
		return "Image deleted"
	} catch (error) {
		return ""
	}
} 


