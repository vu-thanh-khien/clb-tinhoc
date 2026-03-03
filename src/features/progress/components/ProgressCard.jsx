// src/features/progress/components/ProgressCard.jsx
import { useProgress } from "../hooks/useProgress";

function ProgressCard({ userId, courseId }) {
  const { stats, isLoading, error, completionRate } = useProgress(
    userId,
    courseId,
  );

  // Xử lý trạng thái loading
  if (isLoading) {
    return (
      <div className="progress-card loading">
        <div className="spinner"></div>
        <p>Đang tải tiến độ...</p>
      </div>
    );
  }

  // Xử lý lỗi
  if (error) {
    return (
      <div className="progress-card error">
        <p>❌ {error}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  // Hiển thị khi có data
  return (
    <div className="progress-card">
      <h2>📊 Tiến độ học tập</h2>

      <div className="stat-row">
        <span>Hoàn thành:</span>
        <strong>
          {stats.completedAssignments}/{stats.totalAssignments} bài
        </strong>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${completionRate}%` }}
        ></div>
        <span>{completionRate}%</span>
      </div>

      <div className="stat-row">
        <span>Điểm trung bình:</span>
        <strong>{stats.averageScore}/10</strong>
      </div>

      <div className="stat-row">
        <span>Chuỗi ngày học:</span>
        <strong>🔥 {stats.currentStreak} ngày</strong>
      </div>
    </div>
  );
}

export default ProgressCard;
