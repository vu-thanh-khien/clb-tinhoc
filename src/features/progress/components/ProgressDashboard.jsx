// src/features/progress/components/ProgressDashboard.jsx
import { useProgress } from "../hooks/useProgress";
import "./ProgressDashboard.css";

function ProgressDashboard({ userId = "user123", courseId = "course456" }) {
  const {
    stats,
    isLoading,
    error,
    refresh,
    updateProgress,
    completionRate,
    totalWeekly,
    subjectStats,
    bestSubject,
    weakestSubject,
    isCompleted,
    remainingAssignments,
  } = useProgress(userId, courseId);

  // 🎯 Xử lý khi click "Hoàn thành bài tập"
  const handleCompleteAssignment = () => {
    const assignmentId = stats.completedAssignments + 1;
    const randomScore = (Math.random() * 2 + 8).toFixed(1); // Random 8.0-10.0

    updateProgress(assignmentId, parseFloat(randomScore));

    // Hiệu ứng thông báo (có thể dùng toast library)
    alert(
      `🎉 Chúc mừng! Bạn đã hoàn thành bài tập ${assignmentId} với điểm ${randomScore}`,
    );
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refresh} />;

  return (
    <div className="progress-dashboard">
      {/* Header với nút refresh */}
      <header className="dashboard-header">
        <h1>📈 Bảng điều khiển tiến độ</h1>
        <button
          className="btn-refresh"
          onClick={refresh}
          title="Làm mới dữ liệu"
        >
          🔄
        </button>
      </header>

      {/* Thẻ tổng quan */}
      <div className="stats-grid">
        <StatCard
          title="Tổng tiến độ"
          value={`${completionRate}%`}
          icon="📊"
          color={
            completionRate >= 80
              ? "green"
              : completionRate >= 50
                ? "yellow"
                : "red"
          }
        />
        <StatCard
          title="Bài tập còn lại"
          value={remainingAssignments}
          icon="📝"
        />
        <StatCard
          title="Điểm trung bình"
          value={stats.averageScore}
          icon="⭐"
        />
        <StatCard title="Hoạt động tuần này" value={totalWeekly} icon="🔥" />
      </div>

      {/* Progress bar lớn */}
      <section className="main-progress">
        <h3>Tiến độ khóa học</h3>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          >
            <span className="progress-text">{completionRate}%</span>
          </div>
        </div>
        <p className="progress-detail">
          Đã hoàn thành {stats.completedAssignments} / {stats.totalAssignments}{" "}
          bài tập
        </p>

        {isCompleted && (
          <div className="completion-badge">🎉 Khóa học đã hoàn thành!</div>
        )}
      </section>

      {/* Phân tích theo môn học */}
      <section className="subjects-section">
        <h3>📚 Tiến độ theo môn học</h3>
        <div className="subjects-grid">
          {subjectStats.map((subject) => (
            <div key={subject.name} className="subject-card">
              <h4>{subject.name}</h4>
              <div className="mini-progress">
                <div
                  className="mini-fill"
                  style={{ width: `${subject.percentage}%` }}
                ></div>
              </div>
              <p>
                {subject.completed}/{subject.total} bài (
                {Math.round(subject.percentage)}%)
              </p>
              <small>Còn {subject.remaining} bài</small>
            </div>
          ))}
        </div>
      </section>

      {/* Gợi ý cải thiện */}
      <section className="suggestions">
        <h3>💡 Gợi ý</h3>
        {weakestSubject.percentage < 50 && (
          <div className="suggestion-card warning">
            <strong>⚠️ Cần cải thiện:</strong> {weakestSubject.name}
            (mới hoàn thành {Math.round(weakestSubject.percentage)}%)
          </div>
        )}
        {bestSubject.percentage === 100 && (
          <div className="suggestion-card success">
            <strong>🌟 Xuất sắc:</strong> Bạn đã hoàn thành {bestSubject.name}!
          </div>
        )}
      </section>

      {/* Biểu đồ hoạt động tuần */}
      <section className="weekly-chart">
        <h3>📅 Hoạt động 7 ngày qua</h3>
        <div className="chart-container">
          {stats.weeklyProgress.map((day) => (
            <div key={day.day} className="chart-bar-wrapper">
              <div
                className="chart-bar"
                style={{ height: `${(day.count / 4) * 100}%` }}
                title={`${day.day}: ${day.count} bài`}
              ></div>
              <span className="chart-label">{day.day}</span>
              <span className="chart-value">{day.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hoạt động gần đây */}
      <section className="recent-activity">
        <h3>🕐 Hoạt động gần đây</h3>
        <ul className="activity-list">
          {stats.recentActivity.map((activity, index) => (
            <li key={index} className={`activity-item ${activity.type}`}>
              <span className="activity-icon">
                {activity.type === "completed"
                  ? "✅"
                  : activity.type === "started"
                    ? "🚀"
                    : "📊"}
              </span>
              <div className="activity-content">
                <p className="activity-title">{activity.title}</p>
                <time className="activity-time">
                  {formatTimeAgo(activity.date)}
                </time>
              </div>
              {activity.score && (
                <span className="activity-score">{activity.score} điểm</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Nút hành động */}
      <div className="action-buttons">
        {!isCompleted && (
          <button className="btn-primary" onClick={handleCompleteAssignment}>
            ✅ Đánh dấu hoàn thành bài tập tiếp theo
          </button>
        )}
        <button className="btn-secondary" onClick={refresh}>
          🔄 Làm mới dữ liệu
        </button>
      </div>
    </div>
  );
}

// 🔧 Component phụ: StatCard
function StatCard({ title, value, icon, color = "blue" }) {
  return (
    <div className={`stat-card color-${color}`}>
      <span className="stat-icon">{icon}</span>
      <div className="stat-info">
        <h4>{title}</h4>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

// 🔧 Component phụ: LoadingSkeleton
function LoadingSkeleton() {
  return (
    <div className="progress-dashboard loading">
      <div className="skeleton-header"></div>
      <div className="skeleton-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card"></div>
        ))}
      </div>
    </div>
  );
}

// 🔧 Component phụ: ErrorMessage
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="progress-dashboard error">
      <h2>😕 Có lỗi xảy ra</h2>
      <p>{message}</p>
      <button onClick={onRetry}>Thử lại</button>
    </div>
  );
}

// 🔧 Helper: Format thời gian
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return "Vừa xong";
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  if (diffInHours < 48) return "Hôm qua";
  return `${Math.floor(diffInHours / 24)} ngày trước`;
}

export default ProgressDashboard;
