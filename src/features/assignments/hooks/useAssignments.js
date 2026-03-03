import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export const useAssignments = (options = {}) => {
  const { courseId, status } = options;

  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Fetch assignments from Firestore (real-time)
  useEffect(() => {
    setIsLoading(true);

    try {
      let q = query(
        collection(db, "assignments"),
        orderBy("createdAt", "desc"),
      );

      if (courseId) {
        q = query(q, where("courseId", "==", courseId));
      }

      if (status) {
        q = query(q, where("status", "==", status));
      }

      // 🔄 Real-time listener
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const assignmentsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              // Convert Firestore Timestamp to JS Date
              deadline: data.deadline?.toDate?.() || data.deadline,
              createdAt: data.createdAt?.toDate?.() || data.createdAt,
            };
          });

          setAssignments(assignmentsData);
          setIsLoading(false);
        },
        (err) => {
          console.error("Error fetching assignments:", err);
          setError(err.message);
          setIsLoading(false);
        },
      );

      // Cleanup listener
      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up listener:", err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [courseId, status]);

  // ➕ Create assignment
  const createAssignment = useCallback(async (assignmentData) => {
    try {
      const docRef = await addDoc(collection(db, "assignments"), {
        ...assignmentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        submittedCount: 0,
        totalStudents: 30,
      });

      return {
        success: true,
        data: {
          id: docRef.id,
          ...assignmentData,
        },
      };
    } catch (err) {
      console.error("Error creating assignment:", err);
      return { success: false, error: err.message };
    }
  }, []);

  // ✏️ Update assignment
  const updateAssignment = useCallback(async (id, updates) => {
    try {
      const docRef = doc(db, "assignments", id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      return { success: true };
    } catch (err) {
      console.error("Error updating assignment:", err);
      return { success: false, error: err.message };
    }
  }, []);

  // 🗑️ Delete assignment
  const deleteAssignment = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, "assignments", id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting assignment:", err);
      return { success: false, error: err.message };
    }
  }, []);

  return {
    assignments,
    isLoading,
    error,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
};

export default useAssignments;
