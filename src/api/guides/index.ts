import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db, firestore } from "../../main";
import { Collection } from "../models/collection.enum";
import { Guide } from "../models/guide.model";

export const updateGuideById = async (
  id: string,
  guide: Guide,
): Promise<boolean> => {
  const resultRef = doc(db, Collection.GUIDES, `${id}`);
  await updateDoc(resultRef, guide as any);
  return true;
};

export const deleteGuide = async (id: string): Promise<boolean> => {
  const resultRef = doc(db, Collection.GUIDES, `${id}`);
  await deleteDoc(resultRef);
  return true;
};

export const createGuide = async (data: Guide): Promise<Guide> => {
  const documentReference = doc(firestore, Collection.GUIDES, `${data.id}`);
  await setDoc(documentReference, data.asObject());
  return data;
};

export const getAllGuides = async (): Promise<Guide[]> => {
  const guidesData = await getDocs(collection(db, Collection.GUIDES));
  const guides: Guide[] = [];
  guidesData.forEach((guide) => guides.push(guide.data() as Guide));
  return guides;
};
