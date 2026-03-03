import React from "react";
import { TrendingUp, Target, Award, BookOpen } from "lucide-react";

const ProgressChart = ({ stats }) => {
  const {
    completedAssignments = 0,
    totalAssignments = 0,
    averageScore = 0,
    currentStreak = 0,
    weeklyProgress = [],
    subjectBreakdown = [],
  } = stats || {};

  const completionRate =
    totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;

  // Simple bar chart for weekly progress
  const maxWeekly = Math.max(...weeklyProgress.map((w) => w.count), 1);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-5 h-5 opacity-80" />
            <span className="text-xs opacity-80">Bài tập</span>
          </div>
          <div className="text-2xl font-bold">
            {completedAssignments}/{totalAssignments}
          </div>
          <div className="text-xs opacity-80 mt-1">Đã hoàn thành</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 opacity-80" />
            <span className="text-xs opacity-80">Điểm TB</span>
          </div>
          <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
          <div className="text-xs opacity-80 mt-1">/10 điểm</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 opacity-80" />
            <span className="text-xs opacity-80">Tiến độ</span>
          </div>
          <div className="text-2xl font-bold">{completionRate.toFixed(0)}%</div>
          <div className="text-xs opacity-80 mt-1">Hoàn thành</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 opacity-80" />
            <span className="text-xs opacity-80">Streak</span>
          </div>
          <div className="text-2xl font-bold">{currentStreak}</div>
          <div className="text-xs opacity-80 mt-1">Ngày liên tiếp</div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">
          Hoạt động tuần này
        </h4>
        <div className="flex items-end justify-between h-40 gap-2">
          {weeklyProgress.map((day, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 relative group"
                style={{
                  height: `${(day.count / maxWeekly) * 100}%`,
                  minHeight: day.count > 0 ? "4px" : "0",
                }}
              >
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {day.count} bài tập
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">
          Phân bổ theo chủ đề
        </h4>
        <div className="space-y-3">
          {subjectBreakdown.map((subject, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">
                  {subject.name}
                </span>
                <span className="text-gray-500">
                  {subject.completed}/{subject.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${subject.total > 0 ? (subject.completed / subject.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
