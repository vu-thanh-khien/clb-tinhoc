import { useState, useEffect } from "react";

// Mock data - Thay bằng API thực tế
const MOCK_LEADERBOARD = [
  {
    id: "HS001",
    name: "Nguyễn Văn A",
    class: "8A",
    completed: 18,
    total: 20,
    averageScore: 9.2,
    streak: 12,
    trend: "up",
    rankChange: 2,
  },
  {
    id: "HS002",
    name: "Trần Thị B",
    class: "8B",
    completed: 17,
    total: 20,
    averageScore: 8.8,
    streak: 8,
    trend: "same",
    rankChange: 0,
  },
  {
    id: "HS003",
    name: "Lê Văn C",
    class: "8A",
    completed: 16,
    total: 20,
    averageScore: 8.5,
    streak: 5,
    trend: "down",
    rankChange: 1,
  },
  {
    id: "HS004",
    name: "Phạm Thị D",
    class: "8C",
    completed: 15,
    total: 20,
    averageScore: 8.2,
    streak: 7,
    trend: "up",
    rankChange: 3,
  },
  {
    id: "HS005",
    name: "Hoàng Văn E",
    class: "8B",
    completed: 14,
    total: 20,
    averageScore: 7.9,
    streak: 4,
    trend: "same",
    rankChange: 0,
  },
  {
    id: "HS006",
    name: "Vũ Thị F",
    class: "8A",
    completed: 13,
    total: 20,
    averageScore: 7.5,
    streak: 3,
    trend: "down",
    rankChange: 2,
  },
  {
    id: "HS007",
    name: "Đặng Văn G",
    class: "8C",
    completed: 12,
    total: 20,
    averageScore: 7.2,
    streak: 6,
    trend: "up",
    rankChange: 1,
  },
  {
    id: "HS008",
    name: "Bùi Thị H",
    class: "8B",
    completed: 11,
    total: 20,
    averageScore: 6.8,
    streak: 2,
    trend: "down",
    rankChange: 3,
  },
  {
    id: "HS009",
    name: "Ngô Văn I",
    class: "8A",
    completed: 10,
    total: 20,
    averageScore: 6.5,
    streak: 1,
    trend: "same",
    rankChange: 0,
  },
  {
    id: "HS010",
    name: "Dương Thị K",
    class: "8C",
    completed: 9,
    total: 20,
    averageScore: 6.2,
    streak: 0,
    trend: "down",
    rankChange: 2,
  },
];

export const useLeaderboard = (period = "month") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        // TODO: Replace with actual API
        // const response = await fetch(`/api/leaderboard?period=${period}`);
        // const data = await response.json();

        setData(MOCK_LEADERBOARD);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [period]);

  return {
    data,
    isLoading,
    error,
    top3: data.slice(0, 3),
  };
};

export default useLeaderboard;
