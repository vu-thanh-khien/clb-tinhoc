import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import BackToTop from "./BackToTop";
import LoadingSpinner from "./LoadingSpinner";

function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Loading effect khi chuyển trang
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // ✅ Scroll to top thủ công thay vì ScrollRestoration
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 pt-16">
      {/* Loading Overlay */}
      {isLoading && <LoadingSpinner />}

      {/* Header cố định */}
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />

      {/* ❌ ĐÃ XÓA: <ScrollRestoration /> */}
    </div>
  );
}

export default Layout;
