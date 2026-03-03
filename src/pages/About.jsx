import { Target, Eye, Heart } from "lucide-react";

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Giới thiệu CLB Tin học
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Target className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Sứ mệnh</h3>
          <p className="text-gray-600">
            Trang bị kiến thức tin học và kỹ năng lập trình cho học sinh THCS
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Tầm nhìn</h3>
          <p className="text-gray-600">
            Trở thành CLB Tin học hàng đầu về chất lượng đào tạo và sáng tạo
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Giá trị cốt lõi</h3>
          <p className="text-gray-600">
            Sáng tạo - Hợp tác - Chia sẻ - Không ngừng học hỏi
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Lịch sử hình thành</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          CLB Tin học THCS Hải Thành được thành lập với mục tiêu tạo ra một sân
          chơi bổ ích cho các em học sinh yêu thích công nghệ thông tin. Dưới sự
          dẫn dắt của thầy Vũ Thanh Khiên, CLB đã đạt được nhiều thành tích đáng
          tự hào trong các kỳ thi tin học Phường.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Hiện tại, CLB có hơn 50 thành viên đang theo học các môn: Lập trình
          Scratch, Python, C++ và Thiết kế Web. Ngoài ra, CLB còn tích hợp các
          kiến thức về Trí tuệ nhân tạo (AI) để học sinh tiếp cận công nghệ mới
          nhất.
        </p>
      </div>
    </div>
  );
}

export default About;
