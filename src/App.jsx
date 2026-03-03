import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

// Layout & Critical Pages (load ngay)
import Layout from "./components/Layout";
import AdminLayout from "./admin/AdminLayout";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load các pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Activities = lazy(() => import("./pages/Activities"));
const Members = lazy(() => import("./pages/Members"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));

// Admin pages
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminMembers = lazy(() => import("./admin/AdminMembers"));
const AdminCourses = lazy(() => import("./admin/AdminCourses"));
const AdminDocuments = lazy(() => import("./admin/AdminDocuments"));
const AdminAnnouncements = lazy(() => import("./admin/AdminAnnouncements"));
const AdminContacts = lazy(() => import("./admin/AdminContacts"));

// Feature pages
const AssignmentsPage = lazy(
  () => import("./features/assignments/pages/AssignmentsPage"),
);
const AssignmentDetailPage = lazy(
  () => import("./features/assignments/pages/AssignmentDetailPage"),
);
const CreateAssignmentPage = lazy(
  () => import("./features/assignments/pages/CreateAssignmentPage"),
);
const ProgressPage = lazy(
  () => import("./features/progress/pages/ProgressPage"),
);
const LeaderboardPage = lazy(
  () => import("./features/leaderboard/pages/LeaderboardPage"),
);
const ForumPage = lazy(() => import("./features/forum/pages/ForumPage"));
const TopicDetailPage = lazy(
  () => import("./features/forum/pages/TopicDetailPage"),
);
const NotificationsPage = lazy(
  () => import("./features/notifications/pages/NotificationsPage"),
);

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <LoadingSpinner />
  </div>
);

// Route Guards (giữ nguyên)
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/dang-nhap" replace />;
};

const TeacherRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");
  if (!isLoggedIn) return <Navigate to="/dang-nhap" replace />;
  if (userRole !== "teacher" && userRole !== "admin") {
    return <Navigate to="/assignments" replace />;
  }
  return children;
};

const StudentRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");
  if (!isLoggedIn) return <Navigate to="/dang-nhap" replace />;
  if (userRole !== "student") return <Navigate to="/admin" replace />;
  return children;
};

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center px-4">
      <div className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">
        404
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Không tìm thấy trang
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không
        khả dụng.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="gioi-thieu" element={<About />} />
            <Route path="hoat-dong" element={<Activities />} />
            <Route path="thanh-vien" element={<Members />} />
            <Route path="lien-he" element={<Contact />} />
            <Route path="dang-nhap" element={<Login />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="assignments/:id" element={<AssignmentDetailPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="forum" element={<ForumPage />} />
            <Route path="forum/:id" element={<TopicDetailPage />} />
            <Route
              path="progress"
              element={
                <StudentRoute>
                  <ProgressPage />
                </StudentRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Teacher/Admin Routes */}
          <Route
            path="/assignments/create"
            element={
              <TeacherRoute>
                <CreateAssignmentPage />
              </TeacherRoute>
            }
          />
          <Route
            path="/forum/create"
            element={
              <ProtectedRoute>
                <ForumPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
