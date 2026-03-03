import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
  Code2,
  BookOpen,
  Cpu,
  FileText,
  Bell,
  Users,
  Calendar,
  Award,
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
  Star,
  Play,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Zap,
  Target,
} from "lucide-react";

// ==========================================
// 🎯 CUSTOM HOOKS
// ==========================================

// Intersection Observer cho animation
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

// Counter animation
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return [ref, count];
};

// Lazy load image
const LazyImage = ({
  src,
  alt,
  className,
  placeholder = "/images/placeholder.svg",
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tempImg = new Image();
          tempImg.src = src;
          tempImg.onload = () => setLoaded(true);
          tempImg.onerror = () => setError(true);
          observer.disconnect();
        }
      });
    });

    observer.observe(img);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      <img
        src={error ? placeholder : loaded ? src : placeholder}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-60 blur-sm"}`}
        loading="lazy"
      />
    </div>
  );
};

// ==========================================
// 🎨 COMPONENTS
// ==========================================

const StatCard = ({ icon: Icon, number, suffix, label, description }) => {
  const [ref, count] = useCounter(number);

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {count}
            {suffix}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {label}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ feature, index, isActive, onClick }) => (
  <button
    onClick={() => onClick(index)}
    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border-2 ${
      isActive
        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
        : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white`}
      >
        {feature.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
          {feature.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {feature.description}
        </p>
      </div>
      <ChevronRight
        className={`h-5 w-5 text-gray-400 transition-transform ${isActive ? "rotate-90 text-blue-500" : ""}`}
      />
    </div>
  </button>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-slate-300 mb-6 leading-relaxed">{testimonial.content}</p>
    <div className="flex items-center gap-4">
      <LazyImage
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-semibold text-white">{testimonial.name}</p>
        <p className="text-sm text-slate-400">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

// ==========================================
// 🚀 MAIN COMPONENT
// ==========================================

function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [heroRef, heroInView] = useInView();

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Học lập trình",
      description: "Từ cơ bản đến nâng cao với lộ trình bài bản",
      items: [
        "Scratch 3 - Kéo thả trực quan",
        "Python - Ngôn ngữ tương lai",
        "C++ - Nền tảng vững chắc",
        "Thiết kế Website chuyên nghiệp",
      ],
      color: "from-blue-500 to-cyan-400",
      stats: "500+ bài học",
      image: "/images/feature-coding.jpg",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Tích hợp AI",
      description: "Làm chủ công nghệ trí tuệ nhân tạo",
      items: [
        "Machine Learning cơ bản",
        "Chatbot thông minh",
        "Nhận diện hình ảnh",
        "Xử lý ngôn ngữ tự nhiên",
      ],
      color: "from-purple-500 to-pink-500",
      stats: "AI 4.0",
      image: "/images/feature-ai.jpg",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Dự án thực tế",
      description: "Xây dựng portfolio từ dự án thực",
      items: [
        "Website cá nhân",
        "Ứng dụng di động",
        "Game 2D/3D",
        "Hệ thống quản lý",
      ],
      color: "from-green-500 to-emerald-400",
      stats: "50+ dự án",
      image: "/images/feature-project.jpg",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Thi đấu",
      description: "Chuẩn bị cho các kỳ thi chuyên môn",
      items: [
        "Olympic Tin học",
        "Kỳ thi HSG cấp tỉnh",
        "Cuộc thi sáng tạo trẻ",
        "Kỳ thi quốc tế",
      ],
      color: "from-orange-500 to-yellow-400",
      stats: "15+ giải thưởng",
      image: "/images/feature-competition.jpg",
    },
  ];

  const stats = [
    {
      icon: Users,
      number: 150,
      suffix: "+",
      label: "Thành viên",
      description: "Học sinh đang tham gia",
    },
    {
      icon: Calendar,
      number: 30,
      suffix: "+",
      label: "Buổi học",
      description: "Mỗi năm học",
    },
    {
      icon: Award,
      number: 25,
      suffix: "+",
      label: "Giải thưởng",
      description: "Các cấp huyện, tỉnh",
    },
    {
      icon: Zap,
      number: 95,
      suffix: "%",
      label: "Hài lòng",
      description: "Phụ huynh & học sinh",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Học sinh lớp 9",
      content:
        "CLB đã giúp mình đạt giải Nhì Olympic Tin học cấp tỉnh. Thầy Khiên dạy rất tận tâm!",
      avatar: "/images/avatar-1.jpg",
    },
    {
      name: "Trần Thị B",
      role: "Phụ huynh",
      content:
        "Con tôi tiến bộ rõ rệt sau 1 năm học. Từ không biết gì về máy tính giờ đã tự làm được game.",
      avatar: "/images/avatar-2.jpg",
    },
    {
      name: "Lê Văn C",
      role: "Cựu học sinh",
      content:
        "Kiến thức học được ở CLB là nền tảng vững chắc giúp mình theo đuổi ngành CNTT.",
      avatar: "/images/avatar-3.jpg",
    },
  ];

  const partners = [
    { name: "Viettel", logo: "/images/partner-viettel.png" },
    { name: "FPT", logo: "/images/partner-fpt.png" },
    { name: "Microsoft", logo: "/images/partner-microsoft.png" },
    { name: "Google", logo: "/images/partner-google.png" },
  ];

  return (
    <>
      <SEO
        title="Trang chủ"
        description="CLB Tin học THCS Hải Thành - Học lập trình Scratch, Python, Web Development và AI từ cơ bản đến nâng cao. Nơi ươm mầm đam mê công nghệ cho thế hệ trẻ."
        keywords="CLB Tin học, Scratch, Python, lập trình cho trẻ em, THCS Hải Thành, tin học phổ thông, học lập trình, AI cho học sinh"
        image="/images/hero-bg.jpg"
      />

      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-20"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          </div>

          <div
            className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full transition-all duration-1000 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-blue-200">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span>CLB Xuất sắc năm học 2024-2025</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  CLB Tin học
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-2">
                    THCS Hải Thành
                  </span>
                </h1>

                <p className="text-xl text-blue-100/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Nơi ươm mầm đam mê công nghệ, phát triển tư duy sáng tạo và kỹ
                  năng lập trình cho thế hệ trẻ
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to="/dang-nhap"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                  >
                    Bắt đầu học ngay
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/gioi-thieu"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Xem giới thiệu
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 justify-center lg:justify-start pt-4 border-t border-white/20">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <LazyImage
                        key={i}
                        src={`/images/avatar-${i}.jpg`}
                        alt=""
                        className="w-10 h-10 rounded-full border-2 border-slate-800"
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-blue-200 text-sm">
                      150+ học sinh tin tưởng
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="hidden lg:block relative">
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <LazyImage
                    src="/images/hero-code.jpg"
                    alt="Coding"
                    className="w-full h-80 rounded-2xl mb-4"
                  />
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm text-blue-300">Đang học</p>
                      <p className="font-bold text-lg">Python Cơ bản</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Live
                    </div>
                  </div>

                  {/* Floating Badges */}
                  <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-900 px-4 py-3 rounded-xl shadow-lg font-bold animate-bounce flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Giải Nhất cấp tỉnh
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white text-blue-600 px-4 py-3 rounded-xl shadow-lg font-semibold flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    CLB xuất sắc 2024
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
                Chương trình học
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Đa dạng lộ trình
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Từ cơ bản đến nâng cao, phù hợp với mọi lứa tuổi và trình độ
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Feature Tabs */}
              <div className="lg:col-span-4 space-y-4">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    feature={feature}
                    index={index}
                    isActive={activeFeature === index}
                    onClick={setActiveFeature}
                  />
                ))}
              </div>

              {/* Feature Content */}
              <div className="lg:col-span-8">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                    <div className="space-y-6">
                      <span className="inline-block px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-sm">
                        {features[activeFeature].stats}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {features[activeFeature].description} với giáo trình
                        được thiết kế bài bản, phù hợp với từng độ tuổi và năng
                        lực của học sinh.
                      </p>
                      <ul className="space-y-3">
                        {features[activeFeature].items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/hoat-dong"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        Tìm hiểu thêm
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].color} opacity-10 rounded-2xl`}
                      ></div>
                      <LazyImage
                        src={features[activeFeature].image}
                        alt={features[activeFeature].title}
                        className="w-full h-full min-h-[300px] rounded-2xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Cảm nhận học viên
              </h2>
              <p className="text-slate-400">
                Những chia sẻ từ học sinh và phụ huynh
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, index) => (
                <TestimonialCard key={index} testimonial={item} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sẵn sàng bắt đầu hành trình?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Đăng ký ngay hôm nay để nhận tư vấn miễn phí và ưu đãi đặc biệt
              dành cho học sinh mới
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dang-nhap"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Đăng ký ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/lien-he"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8 uppercase tracking-wider">
              Đối tác đồng hành
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {partners.map((partner, index) => (
                <LazyImage
                  key={index}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 object-contain hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
