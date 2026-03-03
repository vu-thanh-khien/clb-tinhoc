import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Bell,
  MessageSquare,
  TrendingUp,
  Calendar,
  Award,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data - sau này thay bằng API
const MOCK_STATS = {
  totalStudents: 156,
  totalAssignments: 42,
  completionRate: 78,
  activeUsers: 89,
  newStudentsThisMonth: 12,
  assignmentsThisWeek: 8,
};

const MOCK_CHART_DATA = [
  { name: "T2", students: 120, assignments: 15 },
  { name: "T3", students: 132, assignments: 18 },
  { name: "T4", students: 145, assignments: 22 },
  { name: "T5", students: 156, assignments: 25 },
  { name: "T6", students: 148, assignments: 20 },
  { name: "T7", students: 140, assignments: 12 },
  { name: "CN", students: 135, assignments: 10 },
];

const MOCK_SUBJECT_DATA = [
  { name: "Scratch", value: 45, color: "#F97316" },
  { name: "Python", value: 35, color: "#3B82F6" },
  { name: "Web", value: 20, color: "#8B5CF6" },
];

const MOCK_RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "submission",
    user: "Nguyễn Văn A",
    action: "nộp bài tập Python cơ bản",
    time: "5 phút trước",
    status: "success",
  },
  {
    id: 2,
    type: "register",
    user: "Trần Thị B",
    action: "đăng ký khóa học Scratch",
    time: "15 phút trước",
    status: "info",
  },
  {
    id: 3,
    type: "question",
    user: "Lê Văn C",
    action: "đặt câu hỏi trong diễn đàn",
    time: "30 phút trước",
    status: "warning",
  },
  {
    id: 4,
    type: "achievement",
    user: "Phạm Thị D",
    action: "đạt 100 điểm bài kiểm tra",
    time: "1 giờ trước",
    status: "success",
  },
  {
    id: 5,
    type: "login",
    user: "Hoàng Văn E",
    action: "đăng nhập hệ thống",
    time: "2 giờ trước",
    status: "info",
  },
];

const MOCK_UPCOMING_TASKS = [
  {
    id: 1,
    title: "Chấm bài tập tuần 3",
    deadline: "Hôm nay, 17:00",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Chuẩn bị đề thi Olympic",
    deadline: "Ngày mai, 09:00",
    priority: "high",
    completed: false,
  },
  {
    id: 3,
    title: "Cập nhật tài liệu Python",
    deadline: "25/03/2026",
    priority: "medium",
    completed: false,
  },
  {
    id: 4,
    title: "Họp ban chủ nhiệm",
    deadline: "26/03/2026, 14:00",
    priority: "low",
    completed: true,
  },
];

// Components
const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </h3>
        <div className="flex items-center mt-2">
          {changeType === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              changeType === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </span>
          <span className="text-sm text-gray-400 ml-1">so với tháng trước</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, href, color }) => (
  <Link
    to={href}
    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group"
  >
    <div
      className={`p-2 rounded-lg ${color} group-hover:scale-110 transition-transform`}
    >
      <Icon className="h-5 w-5 text-white" />
    </div>
    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
      {label}
    </span>
    <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
  </Link>
);

function AdminDashboard() {
  const [stats, setStats] = useState(MOCK_STATS);
  const [timeRange, setTimeRange] = useState("week");

  // TODO: Fetch real data from API
  useEffect(() => {
    // const fetchStats = async () => {
    //   const response = await fetch('/api/admin/stats');
    //   const data = await response.json();
    //   setStats(data);
    // };
    // fetchStats();
  }, [timeRange]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Tổng quan hoạt động CLB Tin học
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="year">Năm nay</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng học sinh"
          value={stats.totalStudents}
          change="12%"
          changeType="up"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Bài tập đã giao"
          value={stats.totalAssignments}
          change="8%"
          changeType="up"
          icon={BookOpen}
          color="bg-green-500"
        />
        <StatCard
          title="Tỷ lệ hoàn thành"
          value={`${stats.completionRate}%`}
          change="5%"
          changeType="up"
          icon={TrendingUp}
          color="bg-purple-500"
        />
        <StatCard
          title="Đang hoạt động"
          value={stats.activeUsers}
          change="3%"
          changeType="down"
          icon={Clock}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Thống kê học sinh & bài tập
            </h3>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", r: 4 }}
                  name="Học sinh"
                />
                <Line
                  type="monotone"
                  dataKey="assignments"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", r: 4 }}
                  name="Bài tập"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Phân bố môn học
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_SUBJECT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_SUBJECT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {MOCK_SUBJECT_DATA.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Thao tác nhanh
          </h3>
          <div className="space-y-3">
            <QuickAction
              icon={BookOpen}
              label="Tạo bài tập mới"
              href="/assignments/create"
              color="bg-blue-500"
            />
            <QuickAction
              icon={FileText}
              label="Thêm tài liệu"
              href="/admin/documents"
              color="bg-green-500"
            />
            <QuickAction
              icon={Bell}
              label="Gửi thông báo"
              href="/admin/announcements"
              color="bg-orange-500"
            />
            <QuickAction
              icon={Users}
              label="Quản lý thành viên"
              href="/admin/members"
              color="bg-purple-500"
            />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Hoạt động gần đây
            </h3>
            <Link
              to="/admin/activities"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="space-y-4">
            {MOCK_RECENT_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === "success"
                      ? "bg-green-100 text-green-600"
                      : activity.status === "warning"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {activity.status === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : activity.status === "warning" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Công việc sắp tới
            </h3>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="space-y-3">
            {MOCK_UPCOMING_TASKS.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg border ${
                  task.completed
                    ? "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700"
                    : task.priority === "high"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                      : task.priority === "medium"
                        ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                        : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center ${
                      task.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {task.completed && (
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        task.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {task.deadline}
                      </span>
                      {!task.completed && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {task.priority === "high"
                            ? "Cao"
                            : task.priority === "medium"
                              ? "Trung bình"
                              : "Thấp"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
            + Thêm công việc mới
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
