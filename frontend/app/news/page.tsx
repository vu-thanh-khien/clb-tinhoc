"use client";

import { useEffect, useState } from "react";

type News = {
  _id: string;
  title: string;
  content: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          "https://clb-tinhoc-api.onrender.com/api/forum",
        );
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error("Không tải được tin tức");
      }
    }

    fetchNews();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Tin tức CLB Tin học</h1>

      {news.length === 0 && <p>Chưa có bài viết.</p>}

      {news.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ddd",
            padding: 20,
            marginTop: 20,
          }}
        >
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
