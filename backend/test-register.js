fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "testuser",
    email: "test@example.com",
    password: "123456",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log("Kết quả:", data))
  .catch((err) => console.error("Lỗi:", err));
