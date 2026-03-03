import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Share2,
  Flag,
  CheckCircle,
  Send,
  User,
} from "lucide-react";

const MOCK_TOPIC = {
  id: "1",
  title: "Giúp đỡ: Lỗi vòng lặp vô hạn trong Python",
  content: `Mình đang làm bài tập về vòng lặp while, nhưng gặp lỗi vòng lặp không bao giờ dừng. Code của mình như sau:

while True:
    print("Hello")
    if input("Stop? ") == "yes":
        break

Mình nhập "yes" nhưng vòng lặp vẫn tiếp tục. Ai biết lỗi ở đâu không ạ?`,
  author: "Nguyễn Văn A",
  authorId: "HS001",
  avatar: "N",
  category: "Python",
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  likes: 8,
  views: 42,
  isSolved: true,
  replies: [
    {
      id: "r1",
      author: "Giáo viên A",
      authorRole: "teacher",
      avatar: "G",
      content:
        'Bạn kiểm tra lại xem có đang nhập đúng chữ "yes" không (có thể có khoảng trắng thừa). Thử dùng .strip() nhé:\n\nif input("Stop? ").strip().lower() == "yes":',
      likes: 12,
      isSolution: true,
      createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "r2",
      author: "Trần Thị B",
      authorRole: "student",
      avatar: "T",
      content: "Mình cũng gặp lỗi này, cảm ơn thầy/cô đã giải đáp!",
      likes: 3,
      isSolution: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
  ],
};

const TopicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyContent, setReplyContent] = useState("");
  const [topic, setTopic] = useState(MOCK_TOPIC);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000;

    if (diff < 60) return "Vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    const newReply = {
      id: `r${Date.now()}`,
      author: localStorage.getItem("userName") || "Bạn",
      authorRole: localStorage.getItem("userRole") || "student",
      avatar: (localStorage.getItem("userName") || "B").charAt(0),
      content: replyContent,
      likes: 0,
      isSolution: false,
      createdAt: new Date().toISOString(),
    };

    setTopic({
      ...topic,
      replies: [...topic.replies, newReply],
    });
    setReplyContent("");
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/forum")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại diễn đàn
      </button>

      {/* Topic Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
            {topic.category}
          </span>
          {topic.isSolved && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Đã giải quyết
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{topic.title}</h1>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {topic.avatar}
          </div>
          <div>
            <div className="font-medium text-gray-900">{topic.author}</div>
            <div className="text-sm text-gray-500">
              {formatTime(topic.createdAt)}
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6 text-gray-700 whitespace-pre-wrap">
          {topic.content}
        </div>

        <div className="flex items-center gap-4 text-gray-500">
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <ThumbsUp className="w-4 h-4" />
            {topic.likes} thích
          </button>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {topic.replies.length} trả lời
          </span>
          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Share2 className="w-4 h-4" />
            Chia sẻ
          </button>
          <button className="flex items-center gap-1 hover:text-red-600 transition-colors ml-auto">
            <Flag className="w-4 h-4" />
            Báo cáo
          </button>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          {topic.replies.length} câu trả lời
        </h2>

        {topic.replies.map((reply) => (
          <div
            key={reply.id}
            className={`bg-white rounded-xl border p-6 ${
              reply.isSolution
                ? "border-green-400 bg-green-50/30"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${
                  reply.authorRole === "teacher"
                    ? "bg-purple-500"
                    : "bg-gray-400"
                }`}
              >
                {reply.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-900">
                    {reply.author}
                  </span>
                  {reply.authorRole === "teacher" && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                      Giáo viên
                    </span>
                  )}
                  {reply.isSolution && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Giải pháp
                    </span>
                  )}
                  <span className="text-sm text-gray-500 ml-auto">
                    {formatTime(reply.createdAt)}
                  </span>
                </div>

                <div className="text-gray-700 whitespace-pre-wrap mb-3">
                  {reply.content}
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    {reply.likes} thích
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      {isLoggedIn ? (
        <form
          onSubmit={handleSubmitReply}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Trả lời chủ đề
          </h3>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Nhập câu trả lời của bạn..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!replyContent.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              Gửi trả lời
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-gray-600">
            Vui lòng{" "}
            <button
              onClick={() => navigate("/dang-nhap")}
              className="text-blue-600 hover:underline"
            >
              đăng nhập
            </button>{" "}
            để trả lời chủ đề
          </p>
        </div>
      )}
    </div>
  );
};

export default TopicDetailPage;
