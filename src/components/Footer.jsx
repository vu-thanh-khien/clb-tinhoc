import { Link } from "react-router-dom";
import {
  Code2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Send,
  Heart,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // TODO: Connect to API
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Cơ cấu tổ chức", href: "/gioi-thieu#co-cau" },
      { label: "Lịch sử phát triển", href: "/gioi-thieu#lich-su" },
      { label: "Thành tích", href: "/gioi-thieu#thanh-tich" },
    ],
    programs: [
      { label: "Lập trình Scratch", href: "/hoat-dong#scratch" },
      { label: "Python cơ bản", href: "/hoat-dong#python" },
      { label: "Thiết kế Web", href: "/hoat-dong#web" },
      { label: "Trí tuệ nhân tạo", href: "/hoat-dong#ai" },
    ],
    resources: [
      { label: "Bài tập thực hành", href: "/assignments" },
      { label: "Tài liệu học tập", href: "/hoat-dong#tailieu" },
      { label: "Đề thi mẫu", href: "/hoat-dong#dethi" },
      { label: "Dự án tham khảo", href: "/hoat-dong#duan" },
    ],
    community: [
      { label: "Diễn đàn thảo luận", href: "/forum" },
      { label: "Bảng xếp hạng", href: "/leaderboard" },
      { label: "Hoạt động & Sự kiện", href: "/hoat-dong" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/clbtinhoc.haithanh",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@clbtinhoc.haithanh",
      label: "YouTube",
      color: "hover:bg-red-600",
    },
    {
      icon: Send,
      href: "https://zalo.me/0904168234",
      label: "Zalo",
      color: "hover:bg-blue-500",
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg group-hover:scale-110 transition-transform">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  CLB Tin học
                </span>
                <span className="block text-sm text-slate-400">
                  THCS Hải Thành
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Nơi ươm mầm đam mê công nghệ, phát triển tư duy sáng tạo và kỹ
              năng lập trình cho thế hệ trẻ.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:clb@haithanh.edu.vn"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors group"
              >
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                clb@haithanh.edu.vn
              </a>
              <a
                href="tel:0904168234"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors group"
              >
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                0123.456.789
              </a>
              <div className="flex items-start gap-3 text-sm">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>
                  Trường THCS Hải Thành
                  <br />
                  <span className="text-slate-500">
                    Phường Dương Kinh, TP. Hải Phòng
                  </span>
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 bg-slate-800 rounded-lg ${social.color} transition-all hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                Về chúng tôi
                <ChevronRight className="h-4 w-4 lg:hidden" />
              </h3>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Chương trình</h3>
              <ul className="space-y-3">
                {footerLinks.programs.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Tài nguyên</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Cộng đồng</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Đăng ký nhận tin</h3>
            <p className="text-sm text-slate-400 mb-4">
              Nhận thông báo về hoạt động và khóa học mới
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                  subscribed
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {subscribed ? "✓ Đã đăng ký!" : "Đăng ký ngay"}
              </button>
            </form>

            {subscribed && (
              <p className="text-green-400 text-xs mt-2 animate-pulse">
                Cảm ơn bạn đã đăng ký!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Teacher Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                K
              </div>
              <div>
                <p className="text-white font-medium">Thầy Vũ Thanh Khiên</p>
                <p className="text-sm text-slate-400">
                  Giáo viên phụ trách CLB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>22+ năm kinh nghiệm</span>
              <span className="hidden sm:inline">•</span>
              <span>Giải Nhất cấp Phường 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p className="flex items-center gap-1">
              © {currentYear} CLB Tin học THCS Hải Thành. Made with
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              for education
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/dieu-khoan"
                className="hover:text-slate-300 transition-colors"
              >
                Điều khoản
              </Link>
              <Link
                to="/bao-mat"
                className="hover:text-slate-300 transition-colors"
              >
                Bảo mật
              </Link>
              <a
                href="https://thcshaithanh.haiphong.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-300 transition-colors"
              >
                Website trường
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
