import {
  collection,
  getDocs,
  doc,
  query,
  where,
  deleteDoc,
  setDoc,
  orderBy,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
  endBefore,
  limitToLast,
  collectionGroup,
  getCountFromServer,
} from "firebase/firestore";
import { db, firestore } from "../../main";
import { Collection } from "../models/collection.enum";
import { Update, UpdateCategory } from "../models/update.model";

export const deleteUpdate = async (id: string): Promise<boolean> => {
  const resultRef = doc(db, Collection.UPDATES, `${id}`);
  await deleteDoc(resultRef);
  return true;
};

export const createUpdate = async (data: Update): Promise<Update> => {
  const documentReference = doc(firestore, Collection.UPDATES, `${data.id}`);
  await setDoc(documentReference, data.asObject());
  return data;
};

export const getAllUpdatesByCourseId = async (
  courseId: string,
): Promise<Update[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.UPDATES),
    where("courseId", "==", courseId),
  );
  const documents = await getDocs(collectionQuery);
  const updates: Update[] = [];
  documents.forEach((update) => updates.push(update.data() as Update));
  return updates;
};

export const getUpdatesByCategory = async (
  category: UpdateCategory,
): Promise<Update[]> => {
  const collectionQuery = query(
    collection(firestore, Collection.UPDATES),
    where("category", "==", category),
  );
  const documents = await getDocs(collectionQuery);
  const updates: Update[] = [];
  documents.forEach((document) => {
    const update = document.data();
    updates.push(update as Update);
  });
  return updates;
};

// first
export const getFirstPageUpdates = async (courseId?: string) => {
  let firstPageQuery;
  let totalUpdates = 0;
  if (courseId) {
    const totalUpdatesQuery = query(
      collection(firestore, Collection.UPDATES),
      where("courseId", "==", courseId),
    );
    const updates = await getDocs(totalUpdatesQuery);
    totalUpdates = updates.docs.length;

    firstPageQuery = query(
      collection(firestore, Collection.UPDATES),
      where("courseId", "==", courseId),
      orderBy("createdAt", "desc"),
      limit(5),
    );
  } else {
    const updatesGroup = collectionGroup(firestore, Collection.UPDATES);
    const snapshot = await getCountFromServer(updatesGroup);
    totalUpdates = snapshot.data().count;

    firstPageQuery = query(
      collection(firestore, Collection.UPDATES),
      orderBy("createdAt", "desc"),
      limit(5),
    );
  }

  const firstPageDocumentSnapshots = await getDocs(firstPageQuery);
  const updates: Update[] = [];
  firstPageDocumentSnapshots.forEach((document) => {
    const update = document.data();
    updates.push(update as Update);
  });
  return {
    firstUpdate: updates[0],
    lastVisible:
      firstPageDocumentSnapshots.docs[
        firstPageDocumentSnapshots.docs.length - 1
      ],
    total: totalUpdates,
    updates,
  };
};

// next
export const getNextPageUpdates = async (
  lastVisible: QueryDocumentSnapshot<DocumentData>,
  courseId?: string,
) => {
  let nextPageQuery;
  if (courseId) {
    nextPageQuery = query(
      collection(firestore, Collection.UPDATES),
      where("courseId", "==", courseId),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(5),
    );
  } else {
    nextPageQuery = query(
      collection(firestore, Collection.UPDATES),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(5),
    );
  }

  const nextPageDocumentSnapshots = await getDocs(nextPageQuery);
  const updates: Update[] = [];
  nextPageDocumentSnapshots.forEach((document) => {
    const update = document.data();
    updates.push(update as Update);
  });
  return {
    firstVisible: nextPageDocumentSnapshots.docs[0],
    lastVisible:
      nextPageDocumentSnapshots.docs[nextPageDocumentSnapshots.docs.length - 1],
    updates,
  };
};

//prev
export const getPrevPageUpdates = async (
  firstVisible: QueryDocumentSnapshot<DocumentData>,
  courseId?: string,
) => {
  let prevPageQuery;
  if (courseId) {
    prevPageQuery = query(
      collection(firestore, Collection.UPDATES),
      where("courseId", "==", courseId),
      orderBy("createdAt", "desc"),
      endBefore(firstVisible),
      limitToLast(5),
    );
  } else {
    prevPageQuery = query(
      collection(firestore, Collection.UPDATES),
      orderBy("createdAt", "desc"),
      endBefore(firstVisible),
      limitToLast(5),
    );
  }

  const prevPageDocumentSnapshots = await getDocs(prevPageQuery);
  const updates: Update[] = [];
  prevPageDocumentSnapshots.forEach((document) => {
    const update = document.data();
    updates.push(update as Update);
  });
  return {
    firstVisible: prevPageDocumentSnapshots.docs[0],
    lastVisible:
      prevPageDocumentSnapshots.docs[prevPageDocumentSnapshots.docs.length - 1],
    updates,
  };
};
