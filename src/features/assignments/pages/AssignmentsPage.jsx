import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, BookOpen, LayoutGrid, List } from "lucide-react";
import AssignmentCard from "../components/AssignmentCard";
import useAssignments from "../hooks/useAssignments";

const AssignmentsPage = ({ userRole = "student" }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [filterStatus, setFilterStatus] = useState("all");

  const { assignments, isLoading, error } = useAssignments({
    status: filterStatus !== "all" ? filterStatus : undefined,
  });

  const handleAssignmentClick = (id) => {
    navigate(`/assignments/${id}`);
  };

  const handleCreateAssignment = () => {
    navigate("/assignments/create");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Có lỗi xảy ra: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Bài tập
          </h1>
          <p className="text-gray-500 mt-1">
            {userRole === "teacher"
              ? `Quản lý ${assignments.length} bài tập`
              : `Bạn có ${assignments.filter((a) => a.status === "pending").length} bài tập đang chờ`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Đang làm</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="overdue">Quá hạn</option>
          </select>

          {/* Create Button (Teacher only) */}
          {userRole === "teacher" && (
            <button
              onClick={handleCreateAssignment}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tạo bài tập
            </button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Tổng số", value: assignments.length, color: "blue" },
          {
            label: "Đang chờ",
            value: assignments.filter((a) => a.status === "pending").length,
            color: "yellow",
          },
          {
            label: "Hoàn thành",
            value: assignments.filter((a) => a.status === "completed").length,
            color: "green",
          },
          {
            label: "Quá hạn",
            value: assignments.filter((a) => a.status === "overdue").length,
            color: "red",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className={`text-2xl font-bold text-${stat.color}-600`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Assignments Grid/List */}
      {assignments.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            Chưa có bài tập nào
          </h3>
          <p className="text-gray-500 mt-1">
            {userRole === "teacher"
              ? "Bắt đầu tạo bài tập đầu tiên cho lớp học của bạn"
              : "Hiện tại chưa có bài tập nào được giao"}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              userRole={userRole}
              onClick={handleAssignmentClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
