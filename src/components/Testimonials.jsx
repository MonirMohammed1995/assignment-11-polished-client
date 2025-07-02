import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Sarah Lopez",
    language: "Spanish Learner",
    comment: "This platform helped me become fluent in just 4 months! The tutors are super friendly and flexible.",
    img: "https://i.postimg.cc/jS1sBpJJ/images.jpg",
  },
  {
    name: "Kenji Takahashi",
    language: "English Learner",
    comment: "Excellent tutoring experience! Booking and communication was seamless.",
    img: "https://i.postimg.cc/T1Qx0F61/1517277249021.jpg",
  },
  {
    name: "Ayesha Rahman",
    language: "French Learner",
    comment: "Highly recommended! Affordable and the review system is very helpful to choose tutors.",
    img: "https://i.postimg.cc/nrS5CJx4/1628160790233.jpg",
  },
  {
    name: "Liam Patel",
    language: "German Learner",
    comment: "The platform's user interface is clean and tutors are excellent. Love the review and rating system.",
    img: "https://i.postimg.cc/9QGFNLyK/download-1.jpg",
  },
  {
    name: "Mina Chen",
    language: "Japanese Learner",
    comment: "A wonderful experience with native speakers. Flexible schedules and affordable pricing!",
    img: "https://i.postimg.cc/mrB2x7wD/download.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
          What Our <span className="text-blue-600">Learners</span> Say
        </h2>
        <p className="mb-12 text-gray-600 text-lg max-w-2xl mx-auto">
          Hear directly from our global community about how Language Exchange has helped them achieve their goals.
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-20"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white/60 backdrop-blur-xl border border-blue-100 p-6 rounded-3xl shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300 h-full py-12">
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{t.name}</h4>
                    <span className="text-sm text-blue-600">{t.language}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "{t.comment}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
