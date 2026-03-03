import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Code2, ArrowLeft, Loader2 } from "lucide-react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("=== LOGIN START ===");
      console.log("Email:", formData.email);

      const result = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      const user = result.user;
      console.log("Login success, UID:", user.uid);

      // Lưu localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.displayName || "User");

      // Giả định role từ email
      const role = formData.email.includes("teacher")
        ? "teacher"
        : formData.email.includes("admin")
          ? "admin"
          : "student";
      localStorage.setItem("userRole", role);

      console.log("Role:", role);
      console.log("=== LOGIN END ===");

      navigate(role === "student" ? "/assignments" : "/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError("Email hoặc mật khẩu không đúng!");
    } finally {
      setIsLoading(false);
    }
  };

  // 📝 REGISTER - Đơn giản nhất có thể
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("=== REGISTER START ===");
      console.log("1. Creating auth user...");

      // Bước 1: Tạo user trong Authentication
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      const user = result.user;
      console.log("2. Created user, UID:", user.uid);

      // Bước 2: Cập nhật tên hiển thị
      console.log("3. Updating profile...");
      await updateProfile(user, {
        displayName: formData.displayName,
      });

      // Bước 3: Lưu vào Firestore - Đơn giản nhất
      console.log("4. Saving to Firestore...");

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: formData.email,
        displayName: formData.displayName,
        role: formData.role,
        createdAt: new Date().toISOString(),
      });

      console.log("5. Saved to Firestore!");

      // Bước 4: Lưu localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", formData.displayName);
      localStorage.setItem("userRole", formData.role);

      console.log("6. Done! Redirecting...");
      console.log("=== REGISTER END ===");

      // Chuyển trang
      navigate(formData.role === "student" ? "/assignments" : "/admin");
    } catch (err) {
      console.error("=== REGISTER ERROR ===");
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);

      if (err.code === "auth/email-already-in-use") {
        setError("Email đã được sử dụng!");
      } else if (err.code === "auth/weak-password") {
        setError("Mật khẩu cần ít nhất 6 ký tự!");
      } else {
        setError("Đăng ký thất bại: " + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Code2 className="mx-auto h-12 w-12 text-blue-600" />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {isRegistering ? "Đăng ký" : "Đăng nhập"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={isRegistering ? handleRegister : handleLogin}
          >
            {/* Name - register only */}
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Họ tên
                </label>
                <input
                  name="displayName"
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            )}

            {/* Role - register only */}
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vai trò
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="student">Học sinh</option>
                  <option value="teacher">Giáo viên</option>
                </select>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="a@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="123456"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isRegistering ? (
                "Đăng ký"
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {isRegistering
                ? "Đã có tài khoản? Đăng nhập"
                : "Chưa có tài khoản? Đăng ký"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
