import React, { useState, useRef } from "react";
import { Play, Check, RotateCcw } from "lucide-react";

const CodeEditor = ({
  initialCode = "",
  language = "python",
  onSubmit,
  onRun,
  readOnly = false,
  height = "400px",
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef(null);

  const languageTemplates = {
    python: '# Nhập code Python của bạn ở đây\nprint("Hello, World!")',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}',
    javascript:
      '// Nhập code JavaScript của bạn ở đây\nconsole.log("Hello, World!");',
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("> Đang chạy code...");

    setTimeout(() => {
      setOutput(
        `> Running ${language}...\n\nHello, World!\n\n[Hoàn thành trong 0.23s]`,
      );
      setIsRunning(false);
      onRun?.(code);
    }, 1000);
  };

  const handleSubmit = () => {
    if (
      window.confirm(
        "Bạn có chắc muốn nộp bài? Không thể chỉnh sửa sau khi nộp.",
      )
    ) {
      onSubmit?.(code);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset code về mặc định?")) {
      setCode(languageTemplates[language] || "");
      setOutput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setCode(code.substring(0, start) + "    " + code.substring(end));
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-mono">{language}</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-500 text-xs">
            main.
            {language === "python" ? "py" : language === "cpp" ? "cpp" : "js"}
          </span>
        </div>

        {!readOnly && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              <Play className="w-4 h-4" />
              {isRunning ? "Đang chạy..." : "Chạy thử"}
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
            >
              <Check className="w-4 h-4" />
              Nộp bài
            </button>
          </div>
        )}
      </div>

      {/* Editor & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-700">
        {/* Code Area */}
        <div className="relative" style={{ height }}>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 pl-12 resize-none focus:outline-none"
            placeholder="Nhập code của bạn ở đây..."
            spellCheck={false}
          />
          {/* Line numbers */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-800/50 border-r border-gray-700 text-gray-500 font-mono text-sm text-right pr-2 pt-4 select-none">
            {code.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        </div>

        {/* Output Area */}
        <div className="bg-black p-4 font-mono text-sm" style={{ height }}>
          <div className="flex items-center gap-2 text-gray-400 mb-2 pb-2 border-b border-gray-800">
            <span className="text-xs uppercase tracking-wider">
              Terminal Output
            </span>
          </div>
          <pre className="text-gray-300 whitespace-pre-wrap overflow-auto h-[calc(100%-2rem)]">
            {output || "> Sẵn sàng để chạy code..."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
