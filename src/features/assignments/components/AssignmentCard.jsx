import React from "react";
import { Clock, FileText, CheckCircle, AlertCircle, Code } from "lucide-react";

const AssignmentCard = ({ assignment, onClick, userRole = "student" }) => {
  const {
    id,
    title,
    description,
    difficulty,
    deadline,
    status,
    submittedCount,
    totalStudents,
    maxScore,
    tags = [],
  } = assignment;

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "overdue":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  const isOverdue = new Date(deadline) < new Date();

  return (
    <div
      onClick={() => onClick?.(id)}
      className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(difficulty)}`}
            >
              {difficulty === "easy"
                ? "Dễ"
                : difficulty === "medium"
                  ? "Trung bình"
                  : "Khó"}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            // ✅ MỚI - thêm check array và dark mode
            {Array.isArray(tags) &&
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
          </div>
          {getStatusIcon()}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className={isOverdue ? "text-red-500 font-medium" : ""}>
                {isOverdue
                  ? "Đã hết hạn"
                  : `Còn ${Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))} ngày`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Code className="w-4 h-4" />
              <span>{maxScore} điểm</span>
            </div>
          </div>

          {/* Teacher view: Submission stats */}
          {userRole === "teacher" && (
            <div className="text-right">
              <span className="text-blue-600 font-semibold">
                {submittedCount}/{totalStudents}
              </span>
              <span className="text-gray-400 text-xs ml-1">đã nộp</span>
            </div>
          )}

          {/* Student view: Status */}
          {userRole === "student" && status === "completed" && (
            <span className="text-green-600 font-medium text-sm">
              Đã hoàn thành
            </span>
          )}
        </div>

        {/* Progress bar for teacher */}
        {userRole === "teacher" && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(submittedCount / totalStudents) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
