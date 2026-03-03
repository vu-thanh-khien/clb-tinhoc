import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/members", icon: Users, label: "Thành viên" },
  { path: "/admin/courses", icon: BookOpen, label: "Khóa học" },
  { path: "/admin/documents", icon: FileText, label: "Tài liệu" },
  { path: "/admin/announcements", icon: Bell, label: "Thông báo" },
  { path: "/admin/contacts", icon: MessageSquare, label: "Liên hệ" },
];

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Check admin role
  const userRole = localStorage.getItem("userRole");
  if (userRole !== "admin" && userRole !== "teacher") {
    return <Navigate to="/" replace />;
  }

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ${
          isSidebarOpen
            ? "w-64 translate-x-0"
            : "w-0 -translate-x-full lg:w-20 lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              {isSidebarOpen && (
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    Admin
                  </span>
                  <span className="block text-xs text-gray-500">
                    CLB Tin học
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all">
              <Settings className="h-5 w-5" />
              {isSidebarOpen && <span>Cài đặt</span>}
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span>Đăng xuất</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Xin chào, {localStorage.getItem("userName") || "Admin"}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                {(localStorage.getItem("userName") || "A").charAt(0)}
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="px-6 py-2 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/admin" className="hover:text-blue-600">
                Admin
              </Link>
              {location.pathname !== "/admin" && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    {sidebarItems.find((i) => isActive(i.path))?.label}
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminLayout;
