import { useState } from "react";
import { Search, UserPlus, Mail, Phone } from "lucide-react";

function Members() {
  const [searchTerm, setSearchTerm] = useState("");

  const members = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      class: "8A",
      role: "Thành viên",
      email: "a.nguyen@email.com",
      phone: "0123456789",
    },
    {
      id: 2,
      name: "Trần Thị B",
      class: "9B",
      role: "Thành viên",
      email: "b.tran@email.com",
      phone: "0123456790",
    },
    {
      id: 3,
      name: "Lê Văn C",
      class: "7C",
      role: "Thành viên",
      email: "c.le@email.com",
      phone: "0123456791",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      class: "8D",
      role: "Thành viên",
      email: "d.pham@email.com",
      phone: "0123456792",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      class: "9A",
      role: "Thành viên",
      email: "e.hoang@email.com",
      phone: "0123456793",
    },
  ];

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.class.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">
          Danh sách thành viên
        </h1>
        <button className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
          <UserPlus className="h-5 w-5 mr-2" />
          Thêm thành viên
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc lớp..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lớp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Liên hệ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {member.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{member.class}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {member.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {member.phone}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Members;
