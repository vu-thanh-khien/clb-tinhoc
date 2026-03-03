import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HeroSlider() {
  const slides = [
    {
      image: "/images/hero-1.jpg",
      title: "Chào mừng đến CLB Tin học",
      subtitle: "Nơi ươm mầm đam mê công nghệ",
      cta: "Tìm hiểu ngay",
      link: "/gioi-thieu",
    },
    {
      image: "/images/hero-2.jpg",
      title: "Học lập trình từ cơ bản",
      subtitle: "Scratch, Python, C++, Web Development",
      cta: "Xem khóa học",
      link: "/hoat-dong",
    },
    {
      image: "/images/hero-3.jpg",
      title: "Đội ngũ giảng viên tận tâm",
      subtitle: "Dưới sự dẫn dắt của thầy Vũ Thanh Khiên",
      cta: "Liên hệ ngay",
      link: "/lien-he",
    },
  ];

  return (
    <div className="relative h-[600px] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-100 mb-8">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    {slide.cta}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors hidden md:block">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors hidden md:block">
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

export default HeroSlider;
