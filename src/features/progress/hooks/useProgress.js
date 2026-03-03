import { useState, useEffect, useCallback, useMemo } from "react";

// Mock data - sẽ thay bằng API thực sau
const MOCK_PROGRESS = {
  completedAssignments: 12,
  totalAssignments: 20,
  averageScore: 7.8,
  currentStreak: 5,
  weeklyProgress: [
    { day: "T2", count: 2 },
    { day: "T3", count: 3 },
    { day: "T4", count: 1 },
    { day: "T5", count: 4 },
    { day: "T6", count: 2 },
    { day: "T7", count: 0 },
    { day: "CN", count: 1 },
  ],
  subjectBreakdown: [
    { name: "Python Cơ bản", completed: 8, total: 10 },
    { name: "Thuật toán", completed: 3, total: 5 },
    { name: "Web Development", completed: 1, total: 5 },
  ],
  recentActivity: [
    {
      type: "completed",
      title: "Hoàn thành Bài tập 2",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      score: 8.5,
    },
    {
      type: "started",
      title: "Bắt đầu Bài tập 3",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      type: "graded",
      title: "Được chấm điểm Bài tập 1",
      date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      score: 9.0,
    },
  ],
};

export const useProgress = (userId, courseId) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Để trigger refresh

  // 🔄 Hàm refresh data thủ công
  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  // 🔄 Hàm cập nhật progress (khi user hoàn thành bài tập)
  const updateProgress = useCallback((assignmentId, score) => {
    setStats((prev) => {
      if (!prev) return prev;

      const newCompleted = prev.completedAssignments + 1;
      const newActivities = [
        {
          type: "completed",
          title: `Hoàn thành Bài tập ${assignmentId}`,
          date: new Date().toISOString(),
          score: score,
        },
        ...prev.recentActivity.slice(0, 4), // Giữ 5 hoạt động gần nhất
      ];

      return {
        ...prev,
        completedAssignments: newCompleted,
        recentActivity: newActivities,
        averageScore: (
          (prev.averageScore * prev.completedAssignments + score) /
          newCompleted
        ).toFixed(1),
      };
    });
  }, []);

  // 📊 Tính toán derived values với useMemo
  const derivedStats = useMemo(() => {
    if (!stats) return null;

    const completionRate =
      (stats.completedAssignments / stats.totalAssignments) * 100;

    const totalWeekly = stats.weeklyProgress.reduce(
      (sum, day) => sum + day.count,
      0,
    );

    const subjectStats = stats.subjectBreakdown.map((subject) => ({
      ...subject,
      percentage: (subject.completed / subject.total) * 100,
      remaining: subject.total - subject.completed,
    }));

    // Tìm môn học tiến độ cao nhất/thấp nhất
    const bestSubject = subjectStats.reduce((max, curr) =>
      curr.percentage > max.percentage ? curr : max,
    );
    const weakestSubject = subjectStats.reduce((min, curr) =>
      curr.percentage < min.percentage ? curr : min,
    );

    return {
      completionRate: Math.round(completionRate * 10) / 10,
      totalWeekly,
      subjectStats,
      bestSubject,
      weakestSubject,
      isCompleted: completionRate === 100,
      remainingAssignments: stats.totalAssignments - stats.completedAssignments,
    };
  }, [stats]);

  // 🌐 Fetch data
  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Giả lập delay API
        await new Promise((resolve) => setTimeout(resolve, 600));

        // TODO: Thay bằng API thực
        // const response = await fetch(
        //   `/api/progress?userId=${userId}&courseId=${courseId}`
        // );
        // if (!response.ok) throw new Error('Failed to fetch progress');
        // const data = await response.json();

        setStats(MOCK_PROGRESS);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi tải tiến độ");
        console.error("Progress fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [userId, courseId, refreshKey]);

  return {
    stats,
    isLoading,
    error,
    refresh,
    updateProgress,
    ...derivedStats,
  };
};

export default useProgress;
