import React from "react";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

const LeaderboardTable = ({ data, currentUserId }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">
            {rank}
          </span>
        );
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Bảng xếp hạng
        </h2>
        <p className="text-gray-600 mt-1">Top học sinh xuất sắc nhất tháng</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                Hạng
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Học sinh
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Bài hoàn thành
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Điểm TB
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Streak
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Xu hướng
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((student, index) => {
              const isCurrentUser = student.id === currentUserId;
              const rank = index + 1;

              return (
                <tr
                  key={student.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    isCurrentUser
                      ? "bg-blue-50/50 border-l-4 border-blue-500"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {getRankIcon(rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          rank === 1
                            ? "bg-yellow-500"
                            : rank === 2
                              ? "bg-gray-400"
                              : rank === 3
                                ? "bg-orange-500"
                                : "bg-blue-500"
                        }`}
                      >
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {student.name}
                          {isCurrentUser && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                              Bạn
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.class}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-gray-900">
                      {student.completed}
                    </span>
                    <span className="text-gray-400 text-sm">
                      /{student.total}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`font-bold text-lg ${
                        student.averageScore >= 8
                          ? "text-green-600"
                          : student.averageScore >= 5
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {student.averageScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-semibold text-orange-600">
                        {student.streak}
                      </span>
                      <span className="text-xs text-gray-400">ngày</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {getTrendIcon(student.trend)}
                      <span className="text-sm text-gray-600">
                        {student.trend === "up"
                          ? "+"
                          : student.trend === "down"
                            ? "-"
                            : ""}
                        {student.rankChange}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Current User Summary (if not in top) */}
      {currentUserId && !data.find((s) => s.id === currentUserId) && (
        <div className="p-4 bg-blue-50 border-t border-blue-100">
          <p className="text-sm text-blue-700 text-center">
            Bạn đang ở ngoài top {data.length}. Hãy cố gắng hoàn thành thêm bài
            tập để lên hạng!
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
