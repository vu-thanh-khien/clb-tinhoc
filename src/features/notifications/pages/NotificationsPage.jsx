import React, { useState } from "react";
import {
  Bell,
  Check,
  Trash2,
  BookOpen,
  MessageSquare,
  Trophy,
  Clock,
} from "lucide-react";

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "assignment",
    title: "Bài tập mới được giao",
    message: 'Giáo viên vừa giao "Bài tập 4: Danh sách liên kết"',
    time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "2",
    type: "grade",
    title: "Bài làm đã được chấm điểm",
    message: "Bài tập 2 của bạn được chấm 8.5 điểm",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const getIcon = (type) => {
    switch (type) {
      case "assignment":
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case "grade":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "forum":
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000;
    if (diff < 60) return "Vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Bell className="w-6 h-6 text-blue-600" />
        Thông báo
      </h1>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 p-4 rounded-xl border ${n.isRead ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"}`}
          >
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
              {getIcon(n.type)}
            </div>
            <div className="flex-1">
              <h3
                className={`font-semibold ${n.isRead ? "text-gray-700" : "text-gray-900"}`}
              >
                {n.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{n.message}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                <Clock className="w-3 h-3" />
                {formatTime(n.time)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Không có thông báo</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
