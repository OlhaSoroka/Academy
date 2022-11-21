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
import { Comment } from "../models/comment.model";

export const updateCommentById = async (
  id: string,
  comment: Comment,
): Promise<boolean> => {
  const commentRef = doc(db, Collection.COMMENTS, `${id}`);
  await updateDoc(commentRef, comment as any);
  return true;
};

export const deleteComment = async (id: string): Promise<boolean> => {
  const commentRef = doc(db, Collection.COMMENTS, `${id}`);
  await deleteDoc(commentRef);
  return true;
};

export const getCommentsByCourse = async (
  courseId: string,
): Promise<Comment[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.COMMENTS),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  const comments: Comment[] = [];
  documents.forEach((document) => {
    const comment = document.data();
    comments.push(comment as Comment);
  });
  return comments;
};

export const getCommentsByAuthor = async (
  authorId: string,
): Promise<Comment[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.COMMENTS),
    where("authorId ", "==", authorId),
  );
  const documents = await getDocs(collectionQuery);
  const comments: Comment[] = [];
  documents.forEach((document) => {
    const comment = document.data();
    comments.push(comment as Comment);
  });
  return comments;
};

export const createComment = async (data: Comment): Promise<Comment> => {
  const documentReference = doc(firestore, Collection.COMMENTS, `${data.id}`);
  await setDoc(documentReference, data.asObject());
  return data;
};

export const deleteCoursesComments = async (
  courseId: string,
): Promise<void> => {
  const collectionQuery = query(
    collection(firestore, Collection.COMMENTS),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  documents.forEach(async (document) => {
    await deleteDoc(document.ref);
  });
};
