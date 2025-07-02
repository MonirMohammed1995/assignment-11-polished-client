import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const bannerData = [
  {
    id: 1,
    title: "Learn Anything, Anytime",
    description: "Connect with expert tutors across all subjects and levels.",
    image: "https://i.postimg.cc/FK4t4PkL/slider-1.jpg"
  },
  {
    id: 2,
    title: "Boost Your Skills",
    description: "Upgrade your knowledge with personalized guidance.",
    image: "https://i.postimg.cc/jSWNbcYt/slider-2.jpg"
  },
  {
    id: 3,
    title: "Find the Perfect Tutor",
    description: "Explore profiles, read reviews, and book instantly.",
    image: "https://i.postimg.cc/k5qncMcz/slider-3.jpg"
  },
  {
    id: 4,
    title: "Flexible Learning",
    description: "Study at your pace — anytime, anywhere.",
    image: "https://i.postimg.cc/Qxzm1HXN/slider-4.jpg"
  },
  {
    id: 5,
    title: "Start Your Journey Today",
    description: "Join EduBridge and unlock your potential.",
    image: "https://i.postimg.cc/XYMFnFj5/slider-5.jpg"
  }
];

const Banner = () => {
  return (
    <section className="relative">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={5000}
        transitionTime={1000}
        swipeable
        emulateTouch
        showArrows={false}
      >
        {bannerData.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-[400px] md:h-[600px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md animate-fade-up">
                {slide.title}
              </h2>
              <p className="text-sm md:text-lg text-gray-200 mb-6 max-w-xl animate-fade-up delay-200">
                {slide.description}
              </p>
              <Link
                to="/register"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-lg md:text-xl font-semibold shadow-lg transition-all duration-300 animate-fade-up delay-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
