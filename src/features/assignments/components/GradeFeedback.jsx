import React, { useState } from "react";
import { Star, MessageSquare, Send, X } from "lucide-react";
import CodeEditor from "./CodeEditor";

const GradeFeedback = ({ submission, onSubmit, onClose }) => {
  const [score, setScore] = useState(submission?.score || 0);
  const [feedback, setFeedback] = useState(submission?.feedback || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit?.({ score, feedback });
    setIsSubmitting(false);
  };

  const getScoreColor = (s) => {
    if (s >= 8) return "text-green-600 bg-green-50 border-green-200";
    if (s >= 5) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Chấm điểm bài nộp
            </h3>
            <p className="text-sm text-gray-500">
              {submission?.studentName} • {submission?.studentId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Code Review */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Code của học sinh
            </h4>
            <CodeEditor
              initialCode={submission?.code || "// Không có code"}
              readOnly={true}
              height="300px"
            />

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-semibold text-gray-700 mb-2">
                Kết quả chạy thử
              </h5>
              <pre className="text-sm text-gray-600 font-mono whitespace-pre-wrap">
                {submission?.output || "Không có output"}
              </pre>
            </div>
          </div>

          {/* Right: Grading Form */}
          <div className="space-y-6">
            {/* Score Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Điểm số (0-10)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={score}
                  onChange={(e) => setScore(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div
                  className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-bold ${getScoreColor(score)}`}
                >
                  {score}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>

            {/* Quick Score Buttons */}
            <div className="flex gap-2">
              {[0, 5, 7, 8, 9, 10].map((s) => (
                <button
                  key={s}
                  onClick={() => setScore(s)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    score === s
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Nhận xét
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Nhập nhận xét cho học sinh..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />

              {/* Quick feedback templates */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Làm tốt!",
                  "Cần cải thiện logic",
                  "Code sạch, dễ đọc",
                  "Cần tối ưu hiệu suất",
                ].map((template) => (
                  <button
                    key={template}
                    onClick={() =>
                      setFeedback((prev) =>
                        prev ? prev + "\n" + template : template,
                      )
                    }
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-600 transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Đang lưu..." : "Lưu điểm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeFeedback;
