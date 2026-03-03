import React from "react";
import {
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Award,
  CheckCircle,
} from "lucide-react";
import ProgressChart from "../components/ProgressChart";
import Badge from "../../../components/ui/Badge";
import useProgress from "../hooks/useProgress";

const ProgressPage = ({ userId = "HS001" }) => {
  const { stats, isLoading, completionRate } = useProgress(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không có dữ liệu tiến độ</p>
      </div>
    );
  }

  // Mock badges data
  const badges = [
    {
      icon: Trophy,
      title: "Học sinh siêng năng",
      description: "Hoàn thành 10 bài tập liên tiếp",
      unlocked: stats.currentStreak >= 10,
      progress: Math.min(stats.currentStreak, 10),
      total: 10,
      color: "yellow",
    },
    {
      icon: Target,
      title: "Điểm cao",
      description: "Đạt điểm 9+ trong 5 bài tập",
      unlocked: stats.averageScore >= 9,
      progress:
        stats.averageScore >= 9 ? 5 : Math.floor((stats.averageScore / 9) * 5),
      total: 5,
      color: "green",
    },
    {
      icon: TrendingUp,
      title: "Tiến bộ vượt bậc",
      description: "Cải thiện điểm số 20% so với tháng trước",
      unlocked: false,
      progress: 60,
      total: 100,
      color: "blue",
    },
    {
      icon: Calendar,
      title: "Chuyên cần",
      description: "Học 30 ngày không nghỉ",
      unlocked: stats.currentStreak >= 30,
      progress: stats.currentStreak,
      total: 30,
      color: "purple",
    },
    {
      icon: Award,
      title: "Hoàn thành khóa học",
      description: "Hoàn thành 100% bài tập",
      unlocked: completionRate >= 100,
      progress: Math.floor(completionRate),
      total: 100,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Tiến độ học tập
          </h1>
          <p className="text-gray-500 mt-1">
            Theo dõi quá trình học tập và thành tích của bạn
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
          <Trophy className="w-5 h-5" />
          <span className="font-semibold">
            Streak: {stats.currentStreak} ngày
          </span>
        </div>
      </div>

      {/* Progress Charts */}
      <ProgressChart stats={stats} />

      {/* Badges Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          Huy hiệu thành tích
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((badge, index) => (
            <Badge key={index} {...badge} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Hoạt động gần đây
        </h3>
        <div className="space-y-4">
          {stats.recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "completed"
                    ? "bg-green-100 text-green-600"
                    : activity.type === "graded"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {activity.type === "completed" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : activity.type === "graded" ? (
                  <Award className="w-5 h-5" />
                ) : (
                  <Target className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">
                    {activity.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                {activity.score && (
                  <div className="mt-1 text-sm">
                    <span className="text-gray-500">Điểm: </span>
                    <span
                      className={`font-semibold ${
                        activity.score >= 8
                          ? "text-green-600"
                          : activity.score >= 5
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {activity.score}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
