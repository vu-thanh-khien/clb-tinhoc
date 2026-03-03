import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Trash2,
} from "lucide-react";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    // Sắp xếp mới nhất lên đầu
    setContacts(savedContacts.sort((a, b) => b.id - a.id));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c,
    );
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    if (window.confirm("Xóa liên hệ này?")) {
      const filtered = contacts.filter((c) => c.id !== id);
      setContacts(filtered);
      localStorage.setItem("contacts", JSON.stringify(filtered));
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: contacts.length,
    pending: contacts.filter((c) => c.status === "Chưa xử lý").length,
    processing: contacts.filter((c) => c.status === "Đang xử lý").length,
    done: contacts.filter((c) => c.status === "Đã xử lý").length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Chưa xử lý":
        return "bg-red-100 text-red-800";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      case "Đã xử lý":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Tổng liên hệ</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Chưa xử lý</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.processing}
          </div>
          <div className="text-sm text-gray-600">Đang xử lý</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{stats.done}</div>
          <div className="text-sm text-gray-600">Đã xử lý</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="Chưa xử lý">Chưa xử lý</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đã xử lý">Đã xử lý</option>
        </select>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Người gửi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Liên hệ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Chủ đề
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contact.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center mb-1">
                    <Mail className="h-4 w-4 mr-1" /> {contact.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" /> {contact.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {contact.subject}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> {contact.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    className={`text-sm px-3 py-1 rounded-full border-0 ${getStatusColor(contact.status)}`}
                    value={contact.status}
                    onChange={(e) =>
                      handleStatusChange(contact.id, e.target.value)
                    }
                  >
                    <option value="Chưa xử lý">Chưa xử lý</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => alert(`Nội dung: ${contact.message}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    title="Xem nội dung"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Xóa"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Không có liên hệ nào
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminContacts;
