import {
	collection,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	query,
	where,
	setDoc,
  } from "firebase/firestore";
  import { db, firestore } from "../../main";
  import { Collection } from "../models/collection.enum";
  import { Document } from "../models/documents.model";
  
  export const updateDocumentById = async (
	id: string,
	material: Document,
  ): Promise<boolean> => {
	const materialRef = doc(db, Collection.DOCUMENTS, `${id}`);
	await updateDoc(materialRef, material as any);
	return true;
  };
  
  export const deleteDocument= async (id: string): Promise<boolean> => {
	const materialRef = doc(db, Collection.DOCUMENTS, `${id}`);
	await deleteDoc(materialRef);
	return true;
  };
  
  export const getDocumentByCourse = async (
	courseId: string,
  ): Promise<Document[]> => {
	const collectionQuery = query(
	  collection(firestore, Collection.DOCUMENTS),
	  where("courseId", "==", courseId),
	);
	const documents = await getDocs(collectionQuery);
	const materials: Document[] = [];
	documents.forEach((document) => {
	  const material = document.data();
	  materials.push(material as Document);
	});
	return materials;
  };
  
  export const createDocument = async (data: Document): Promise<Document> => {
	const documentReference = doc(firestore, Collection.DOCUMENTS, `${data.id}`);
	await setDoc(documentReference, data.asObject());
	return data;
  };
  
  export const deleteCoursesDocument= async (
	courseId: string,
  ): Promise<void> => {
	const collectionQuery = query(
	  collection(firestore, Collection.DOCUMENTS),
	  where("courseId", "==", courseId),
	);
	const documents = await getDocs(collectionQuery);
	documents.forEach(async (document) => {
	  await deleteDoc(document.ref);
	});
  };
  