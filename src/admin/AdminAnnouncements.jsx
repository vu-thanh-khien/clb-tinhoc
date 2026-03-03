import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Save, Bell, Pin } from "lucide-react";

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "Bình thường",
    isPinned: false,
  });

  useEffect(() => {
    const savedAnn = localStorage.getItem("announcements");
    if (savedAnn) {
      setAnnouncements(JSON.parse(savedAnn));
    } else {
      const defaultAnn = [
        {
          id: 1,
          title: "Khai giảng khóa học mới",
          content: "Thông báo khai giảng",
          priority: "Cao",
          isPinned: true,
        },
        {
          id: 2,
          title: "Lịch thi cuối kỳ",
          content: "Lịch thi HK2",
          priority: "Cao",
          isPinned: true,
        },
      ];
      setAnnouncements(defaultAnn);
      localStorage.setItem("announcements", JSON.stringify(defaultAnn));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("announcements", JSON.stringify(announcements));
  }, [announcements]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAnn) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingAnn.id ? { ...formData, id: editingAnn.id } : a,
        ),
      );
    } else {
      const newAnn = { ...formData, id: Date.now() };
      setAnnouncements([newAnn, ...announcements]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thông báo này?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const togglePin = (id) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, isPinned: !a.isPinned } : a,
      ),
    );
  };

  const openModal = (ann = null) => {
    if (ann) {
      setEditingAnn(ann);
      setFormData(ann);
    } else {
      setEditingAnn(null);
      setFormData({
        title: "",
        content: "",
        priority: "Bình thường",
        isPinned: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAnn(null);
  };

  const filteredAnn = announcements.filter((ann) =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Cao":
        return "bg-red-100 text-red-800";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Quản lý thông báo
          </h2>
          <p className="text-gray-600">
            Tổng số: {announcements.length} thông báo
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Thêm thông báo
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm thông báo..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnn.map((ann) => (
          <div
            key={ann.id}
            className={`bg-white rounded-lg shadow-md p-6 ${ann.isPinned ? "border-l-4 border-blue-500" : ""}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {ann.isPinned && (
                    <Pin className="h-5 w-5 text-blue-500 fill-current" />
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ann.priority)}`}
                  >
                    {ann.priority}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {ann.title}
                </h3>
                <p className="text-gray-600">{ann.content}</p>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => togglePin(ann.id)}
                  className={`p-2 rounded-lg ${ann.isPinned ? "bg-blue-100" : "bg-gray-100"}`}
                >
                  <Pin className="h-5 w-5" />
                </button>
                <button
                  onClick={() => openModal(ann)}
                  className="p-2 rounded-lg bg-blue-100 text-blue-600"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(ann.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingAnn ? "Chỉnh sửa" : "Thêm mới"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mức độ ưu tiên
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <option value="Cao">Cao</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Bình thường">Bình thường</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPinned"
                  className="h-4 w-4"
                  checked={formData.isPinned}
                  onChange={(e) =>
                    setFormData({ ...formData, isPinned: e.target.checked })
                  }
                />
                <label htmlFor="isPinned" className="ml-2">
                  Ghim lên đầu
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border py-2 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                >
                  {editingAnn ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAnnouncements;
