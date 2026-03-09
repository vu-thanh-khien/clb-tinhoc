require("dotenv").config();
const connectDB = require("../config/database");
const Category = require("../models/Category");

const categories = [
  {
    name: "Thắc mắc chung",
    description: "Các câu hỏi chung về CLB",
    icon: "help-circle",
    color: "#3B82F6",
    order: 1,
  },
  {
    name: "Thảo luận bài tập",
    description: "Trao đổi về contests và bài tập",
    icon: "code",
    color: "#10B981",
    order: 2,
  },
  {
    name: "Chia sẻ kiến thức",
    description: "Tutorials và tips lập trình",
    icon: "book-open",
    color: "#F59E0B",
    order: 3,
  },
  {
    name: "Tuyển dụng & Intern",
    description: "Cơ hội việc làm cho thành viên",
    icon: "briefcase",
    color: "#EF4444",
    order: 4,
  },
];

async function seed() {
  try {
    await connectDB();

    console.log("🗑️  Xóa categories cũ...");
    await Category.deleteMany({});

    console.log("🌱 Tạo categories mới...");
    await Category.insertMany(categories);

    console.log("✅ Seed thành công!");
    console.log("📊 Categories:", categories.map((c) => c.name).join(", "));

    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
    process.exit(1);
  }
}

seed();
