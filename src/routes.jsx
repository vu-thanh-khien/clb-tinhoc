import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy loading cho code splitting
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

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Wrapper cho lazy components
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Route guards (ví dụ đơn giản)
const RequireAuth = ({ children, allowedRoles = [] }) => {
  // TODO: Thay bằng logic auth thực tế
  const user = { role: "student", isAuthenticated: true }; // Mock user

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/assignments" replace />,
  },
  {
    path: "/assignments",
    element: <RequireAuth>{withSuspense(AssignmentsPage)}</RequireAuth>,
  },
  {
    path: "/assignments/create",
    element: (
      <RequireAuth allowedRoles={["teacher", "admin"]}>
        {withSuspense(CreateAssignmentPage)}
      </RequireAuth>
    ),
  },
  {
    path: "/assignments/:id",
    element: <RequireAuth>{withSuspense(AssignmentDetailPage)}</RequireAuth>,
  },
  {
    path: "/progress",
    element: <RequireAuth>{withSuspense(ProgressPage)}</RequireAuth>,
  },
  // Catch all
  {
    path: "*",
    element: <div className="p-8 text-center">404 - Không tìm thấy trang</div>,
  },
]);

export default router;
