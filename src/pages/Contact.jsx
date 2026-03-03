import { useState } from "react";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Tư vấn khóa học",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập nội dung";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Lưu vào localStorage (giả lập gửi đi)
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    const newContact = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString("vi-VN"),
      status: "Chưa xử lý",
    };
    contacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Tư vấn khóa học",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Hotline",
      content: "0123.456.789",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "clb@haithanh.edu.vn",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Địa chỉ",
      content: "THCS Hải Thành, Hải Hậu, Nam Định",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bạn có câu hỏi về khóa học? Muốn đăng ký tham gia CLB? Hãy để lại
            thông tin, chúng tôi sẽ liên hệ lại trong 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin liên hệ */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md flex items-start space-x-4"
              >
                <div className={`p-3 rounded-lg ${info.color}`}>
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{info.title}</h3>
                  <p className="text-gray-600 mt-1">{info.content}</p>
                </div>
              </div>
            ))}

            {/* Giờ làm việc */}
            <div className="bg-blue-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-4">Giờ làm việc</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex justify-between">
                  <span>Thứ 2 - Thứ 6:</span>
                  <span>15:00 - 17:30</span>
                </li>
                <li className="flex justify-between">
                  <span>Thứ 7:</span>
                  <span>08:00 - 11:30</span>
                </li>
                <li className="flex justify-between text-blue-300">
                  <span>Chủ nhật:</span>
                  <span>Nghỉ</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Gửi thành công!
                  </h3>
                  <p className="text-gray-600">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Họ tên */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />{" "}
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="0123 456 789"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />{" "}
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Chủ đề */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chủ đề
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      >
                        <option value="Tư vấn khóa học">Tư vấn khóa học</option>
                        <option value="Đăng ký tham gia CLB">
                          Đăng ký tham gia CLB
                        </option>
                        <option value="Hợp tác, tài trợ">
                          Hợp tác, tài trợ
                        </option>
                        <option value="Góp ý, phản hồi">Góp ý, phản hồi</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="5"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Nhập nội dung bạn muốn hỏi..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />{" "}
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Nút gửi */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Gửi tin nhắn</span>
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    Bằng việc gửi form, bạn đồng ý cho chúng tôi liên hệ lại qua
                    thông tin đã cung cấp.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
