import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export const useSubmissions = (assignmentId) => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mySubmission, setMySubmission] = useState(null);

  // Get current user from localStorage
  const currentUserId = localStorage.getItem("userId") || "HS001";
  const currentUserName = localStorage.getItem("userName") || "Học sinh";

  // 🔄 Fetch submissions real-time from Firestore
  useEffect(() => {
    if (!assignmentId) return;

    setIsLoading(true);

    try {
      const q = query(
        collection(db, "submissions"),
        where("assignmentId", "==", assignmentId),
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const submissionsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              submittedAt: data.submittedAt?.toDate?.() || data.submittedAt,
              gradedAt: data.gradedAt?.toDate?.() || data.gradedAt,
            };
          });

          setSubmissions(submissionsData);

          // Find current user's submission
          const mine = submissionsData.find(
            (s) => s.studentId === currentUserId,
          );
          setMySubmission(mine || null);

          setIsLoading(false);
        },
        (err) => {
          console.error("Error fetching submissions:", err);
          setError(err.message);
          setIsLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up listener:", err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [assignmentId, currentUserId]);

  // ➕ Submit assignment to Firestore
  const submitAssignment = useCallback(
    async (code, output = "") => {
      try {
        // Check if already submitted
        if (mySubmission) {
          return { success: false, error: "Bạn đã nộp bài rồi!" };
        }

        const docRef = await addDoc(collection(db, "submissions"), {
          assignmentId,
          studentId: currentUserId,
          studentName: currentUserName,
          code,
          output,
          submittedAt: serverTimestamp(),
          status: "pending",
          score: null,
          feedback: "",
          likes: 0,
        });

        return {
          success: true,
          data: {
            id: docRef.id,
            assignmentId,
            studentId: currentUserId,
            studentName: currentUserName,
            code,
            output,
            submittedAt: new Date(),
            status: "pending",
          },
        };
      } catch (err) {
        console.error("Error submitting assignment:", err);
        return { success: false, error: err.message };
      }
    },
    [assignmentId, currentUserId, currentUserName, mySubmission],
  );

  // ✏️ Grade submission (teacher only)
  const gradeSubmission = useCallback(
    async (submissionId, { score, feedback }) => {
      try {
        const docRef = doc(db, "submissions", submissionId);
        await updateDoc(docRef, {
          score,
          feedback,
          status: "graded",
          gradedAt: serverTimestamp(),
          gradedBy: currentUserId,
        });

        return { success: true };
      } catch (err) {
        console.error("Error grading submission:", err);
        return { success: false, error: err.message };
      }
    },
    [currentUserId],
  );

  // ❌ Delete submission (nếu cần)
  const deleteSubmission = useCallback(
    async (submissionId) => {
      try {
        // Chỉ cho phép xóa nếu chưa được chấm
        const submission = submissions.find((s) => s.id === submissionId);
        if (submission?.status === "graded") {
          return { success: false, error: "Không thể xóa bài đã được chấm!" };
        }

        // TODO: Thêm deleteDoc nếu cần
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },
    [submissions],
  );

  return {
    submissions,
    mySubmission,
    isLoading,
    error,
    submitAssignment,
    gradeSubmission,
    deleteSubmission,
  };
};

export default useSubmissions;
