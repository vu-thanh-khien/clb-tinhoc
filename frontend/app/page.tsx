"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Đang kiểm tra kết nối...");

  useEffect(() => {
    fetch("https://clb-tinhoc-api.onrender.com/api/health")
      .then((res) => res.json())
      .then((data) => {
        setStatus(`OK - Database: ${data.db}`);
      })
      .catch(() => {
        setStatus("Không kết nối được Backend");
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>CLB Tin học - Trường THCS Hải Thành</h1>
      <p>Trạng thái hệ thống:</p>
      <strong>{status}</strong>
    </div>
  );
}
