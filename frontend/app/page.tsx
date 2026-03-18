"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Đang kiểm tra kết nối...");

  useEffect(() => {
    async function checkAPI() {
      try {
        const res = await fetch(
          "https://clb-tinhoc-api.onrender.com/api/health",
        );
        const data = await res.json();
        setStatus(`OK - Database: ${data.db}`);
      } catch (error) {
        setStatus("Không kết nối được Backend");
      }
    }

    checkAPI();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>CLB Tin học - Trường THCS Hải Thành</h1>
      <p>Trạng thái hệ thống:</p>
      <strong>{status}</strong>
    </div>
  );
}
