import React from "react";
import { Lock, Check } from "lucide-react";

const Badge = ({
  icon: Icon,
  title,
  description,
  unlocked = false,
  progress = 0,
  total = 100,
  color = "blue",
}) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    gray: "from-gray-400 to-gray-500",
  };

  const progressPercent = Math.min((progress / total) * 100, 100);

  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
        unlocked
          ? "bg-white border-transparent shadow-lg hover:shadow-xl"
          : "bg-gray-50 border-gray-200 opacity-75"
      }`}
    >
      <div
        className={`w-16 h-16 rounded-full bg-gradient-to-br ${
          unlocked ? colors[color] : colors.gray
        } flex items-center justify-center mx-auto mb-3 shadow-lg`}
      >
        {unlocked ? (
          <Icon className="w-8 h-8 text-white" />
        ) : (
          <Lock className="w-6 h-6 text-white/70" />
        )}
      </div>

      <div className="text-center">
        <h4
          className={`font-bold mb-1 ${unlocked ? "text-gray-900" : "text-gray-500"}`}
        >
          {title}
        </h4>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{description}</p>

        {!unlocked && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Tiến độ</span>
              <span>
                {progress}/{total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gray-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {unlocked && (
          <div className="flex items-center justify-center gap-1 text-green-600 text-xs font-medium">
            <Check className="w-3 h-3" />
            Đã đạt được
          </div>
        )}
      </div>

      {unlocked && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none" />
      )}
    </div>
  );
};

export default Badge;
