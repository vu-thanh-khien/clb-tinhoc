import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Target,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import CodeEditor from "../components/CodeEditor";
import SubmissionList from "../components/SubmissionList";
import GradeFeedback from "../components/GradeFeedback";
import useAssignments from "../hooks/useAssignments";
import useSubmissions from "../hooks/useSubmissions";

const AssignmentDetailPage = ({ userRole = "student" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showGrader, setShowGrader] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch assignment
  const { assignments, isLoading: loadingAssignment } = useAssignments();
  const assignment = assignments.find((a) => a.id === id);

  // Fetch submissions
  const {
    submissions,
    mySubmission,
    submitAssignment,
    gradeSubmission,
    isLoading: loadingSubmissions,
  } = useSubmissions(id);

  const handleSubmit = async (code) => {
    const result = await submitAssignment(code);
    if (result.success) {
      alert("Nộp bài thành công!");
    } else {
      alert(result.error || "Có lỗi xảy ra!");
    }
  };

  const handleGrade = (submission) => {
    setSelectedSubmission(submission);
    setShowGrader(true);
  };

  const handleGradeSubmit = async ({ score, feedback }) => {
    const result = await gradeSubmission(selectedSubmission.id, {
      score,
      feedback,
    });
    if (result.success) {
      setShowGrader(false);
      setSelectedSubmission(null);
      alert("Chấm điểm thành công!");
    }
  };

  // Loading state
  if (loadingAssignment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Not found
  if (!assignment) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Không tìm thấy bài tập!</p>
        <button
          onClick={() => navigate("/assignments")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const isOverdue = new Date(assignment.deadline) < new Date();
  const canSubmit = userRole === "student" && !isOverdue && !mySubmission;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/assignments")}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách
      </button>

      {/* Assignment Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  assignment.difficulty === "easy"
                    ? "bg-green-100 text-green-800"
                    : assignment.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {assignment.difficulty === "easy"
                  ? "Dễ"
                  : assignment.difficulty === "medium"
                    ? "Trung bình"
                    : "Khó"}
              </span>
              {Array.isArray(assignment.tags) &&
                assignment.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {assignment.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {assignment.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:text-right">
            <div className="flex items-center lg:justify-end gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span
                className={
                  isOverdue
                    ? "text-red-600 font-medium"
                    : "text-gray-600 dark:text-gray-300"
                }
              >
                {isOverdue
                  ? "Đã hết hạn"
                  : `Hạn: ${new Date(assignment.deadline).toLocaleDateString("vi-VN")}`}
              </span>
            </div>
            <div className="flex items-center lg:justify-end gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Target className="w-4 h-4 text-gray-400" />
              <span>{assignment.maxScore} điểm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Editor or Submission List */}
        <div className="lg:col-span-2 space-y-6">
          {userRole === "student" ? (
            <>
              {canSubmit ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Làm bài tập
                  </h3>
                  <CodeEditor onSubmit={handleSubmit} height="500px" />
                </div>
              ) : mySubmission ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Bài đã nộp
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Nộp lúc:{" "}
                      {mySubmission.submittedAt?.toLocaleString?.("vi-VN") ||
                        "Vừa xong"}
                    </span>
                  </div>
                  <CodeEditor
                    initialCode={mySubmission.code}
                    readOnly={true}
                    height="400px"
                  />
                </div>
              ) : (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-400">
                    Đã hết hạn nộp bài
                  </h3>
                </div>
              )}
            </>
          ) : (
            <SubmissionList
              submissions={submissions}
              assignmentId={id}
              onGrade={handleGrade}
            />
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Thông tin bài tập
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Trạng thái
                </span>
                <span
                  className={`font-medium ${
                    assignment.status === "completed"
                      ? "text-green-600"
                      : assignment.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {assignment.status === "completed"
                    ? "Hoàn thành"
                    : assignment.status === "pending"
                      ? "Đang chờ"
                      : "Quá hạn"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Modal */}
      {showGrader && selectedSubmission && (
        <GradeFeedback
          submission={selectedSubmission}
          onSubmit={handleGradeSubmit}
          onClose={() => {
            setShowGrader(false);
            setSelectedSubmission(null);
          }}
        />
      )}
    </div>
  );
};

export default AssignmentDetailPage;
