import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Plus,
  Search,
  ThumbsUp,
  MessageCircle,
  Eye,
  Filter,
} from "lucide-react";

const MOCK_TOPICS = [
  {
    id: "1",
    title: "Giúp đỡ: Lỗi vòng lặp vô hạn trong Python",
    author: "Nguyễn Văn A",
    authorId: "HS001",
    avatar: "N",
    category: "Python",
    replies: 5,
    views: 42,
    likes: 8,
    isSolved: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    preview: "Mình đang gặp lỗi while True không thoát được, ai giúp với...",
  },
  {
    id: "2",
    title: "Hỏi về bài tập 3: Hàm đệ quy",
    author: "Trần Thị B",
    authorId: "HS002",
    avatar: "T",
    category: "Thuật toán",
    replies: 3,
    views: 28,
    likes: 4,
    isSolved: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    preview: "Không hiểu cách viết hàm đệ quy tính giai thừa...",
  },
  {
    id: "3",
    title: "Chia sẻ: Tài liệu học Python miễn phí",
    author: "Lê Văn C",
    authorId: "HS003",
    avatar: "L",
    category: "Tài liệu",
    replies: 12,
    views: 156,
    likes: 25,
    isSolved: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    preview:
      "Mình tổng hợp một số nguồn học Python hay, chia sẻ cho mọi người...",
  },
  {
    id: "4",
    title: "Thắc mắc: Cách debug trong VS Code",
    author: "Phạm Thị D",
    authorId: "HS004",
    avatar: "P",
    category: "Công cụ",
    replies: 2,
    views: 19,
    likes: 3,
    isSolved: false,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    preview: "Ai biết cách cài extension debug Python trong VS Code không ạ?",
  },
];

const ForumPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all | solved | unsolved | mine
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUserId = localStorage.getItem("userId");

  const filteredTopics = MOCK_TOPICS.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "solved" && topic.isSolved) ||
      (filter === "unsolved" && !topic.isSolved) ||
      (filter === "mine" && topic.authorId === currentUserId);
    return matchesSearch && matchesFilter;
  });

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000; // seconds

    if (diff < 60) return "Vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Diễn đàn hỏi đáp
          </h1>
          <p className="text-gray-500 mt-1">
            Trao đổi, giúp đỡ lẫn nhau trong học tập
          </p>
        </div>

        {isLoggedIn && (
          <button
            onClick={() => navigate("/forum/create")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Đặt câu hỏi
          </button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm chủ đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">Tất cả chủ đề</option>
          <option value="solved">Đã giải quyết</option>
          <option value="unsolved">Chưa giải quyết</option>
          {isLoggedIn && <option value="mine">Câu hỏi của tôi</option>}
        </select>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => navigate(`/forum/${topic.id}`)}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {topic.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                    {topic.category}
                  </span>
                  {topic.isSolved && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1">
                      ✓ Đã giải quyết
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {topic.preview}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>{topic.author}</span>
                    <span>•</span>
                    <span>{formatTime(topic.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {topic.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {topic.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {topic.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Không tìm thấy chủ đề nào</p>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
