import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map URL sang tiếng Việt
  const breadcrumbMap = {
    "gioi-thieu": "Giới thiệu",
    "hoat-dong": "Hoạt động",
    "thanh-vien": "Thành viên",
    "lien-he": "Liên hệ",
    "dang-nhap": "Đăng nhập",
    assignments: "Bài tập",
    progress: "Tiến độ",
    leaderboard: "Bảng xếp hạng",
    forum: "Diễn đàn",
    notifications: "Thông báo",
  };

  if (location.pathname === "/") return null;

  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400">
      <Link
        to="/"
        className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        Trang chủ
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbMap[name] || name;

        return (
          <div key={name} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-gray-900 dark:text-white">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
