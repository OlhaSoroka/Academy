import {
  collection,
  getDocs,
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
import { Material } from "../models/material.model";
import { ToastType,useToastStore } from "../../store/toast.store";

export const updateMaterialById = async (
  id: string,
  material: Material,
): Promise<boolean> => {
  const materialRef = doc(db, Collection.MATERIALS, `${id}`);
  await updateDoc(materialRef, material as any);
  const toastStore = useToastStore();
  toastStore.showToastMessage({
    message: "Material successfully updated",
    type: ToastType.SUCCESS,
  });
  return true;
};
 
export const deleteMaterial = async (id: string): Promise<boolean> => {
  const materialRef = doc(db, Collection.MATERIALS, `${id}`);
  await deleteDoc(materialRef);
  const toastStore = useToastStore();
  toastStore.showToastMessage({
    message: "Material successfully deleted",
    type: ToastType.SUCCESS,
  });
  return true;
};

export const getMaterialsByCourse = async (
  courseId: string,
): Promise<Material[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.MATERIALS),
    where("courseId", "==", courseId),
    orderBy("createdAt", "desc"),
  );
  const documents = await getDocs(collectionQuery);
  const materials: Material[] = [];
  documents.forEach((document) => {
    const material = document.data();
    materials.push(material as Material);
  });
  return materials;
};

export const createMaterial = async (data: Material): Promise<Material> => {
  const documentReference = doc(firestore, Collection.MATERIALS, `${data.id}`);
  await setDoc(documentReference, data.asObject());
  return data;
};

export const deleteCoursesMaterials = async (
  courseId: string,
): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.MATERIALS),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  documents.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
};
