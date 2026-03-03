import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));

        // TODO: Replace with actual API
        // const response = await fetch(`/api/progress?userId=${userId}&courseId=${courseId}`);
        // const data = await response.json();

        setStats(MOCK_PROGRESS);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProgress();
    }
  }, [userId, courseId]);

  return {
    stats,
    isLoading,
    error,
    completionRate: stats
      ? (stats.completedAssignments / stats.totalAssignments) * 100
      : 0,
  };
};

export default useProgress;
