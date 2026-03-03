import React, { useState } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

const SubmissionList = ({ submissions, onGrade, assignmentId }) => {
  const [filter, setFilter] = useState("all"); // all | pending | graded
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesFilter = filter === "all" || sub.status === filter;
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "graded":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Đã chấm
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            Chờ chấm
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Chưa nộp
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900">
          Danh sách bài nộp
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({filteredSubmissions.length} học sinh)
          </span>
        </h3>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm học sinh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ chấm</option>
            <option value="graded">Đã chấm</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Học sinh
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Thời gian nộp
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Điểm
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSubmissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {sub.studentName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {sub.studentName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {sub.studentId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {sub.submittedAt ? (
                    <div>
                      <div>
                        {new Date(sub.submittedAt).toLocaleDateString("vi-VN")}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(sub.submittedAt).toLocaleTimeString("vi-VN")}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">{getStatusBadge(sub.status)}</td>
                <td className="px-4 py-3">
                  {sub.score !== null ? (
                    <span
                      className={`font-bold ${sub.score >= 8 ? "text-green-600" : sub.score >= 5 ? "text-yellow-600" : "text-red-600"}`}
                    >
                      {sub.score}/10
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {sub.status !== "not_submitted" && (
                    <button
                      onClick={() => onGrade?.(sub)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      {sub.status === "pending" ? "Chấm điểm" : "Xem lại"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Filter className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <p className="text-gray-500">Không tìm thấy bài nộp nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionList;
