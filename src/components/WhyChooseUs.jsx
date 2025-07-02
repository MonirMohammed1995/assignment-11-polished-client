import { FaChalkboardTeacher, FaClock, FaGlobe } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-4">
          Why Choose <span className="text-indigo-500 dark:text-indigo-300">Language Exchange?</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          We provide the most flexible, affordable, and accessible language tutoring experience — anytime, anywhere.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group rounded-3xl p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition hover:scale-105">
            <FaChalkboardTeacher className="text-5xl text-indigo-600 mb-5 group-hover:rotate-3 transition" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Expert Tutors
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn from verified, experienced tutors dedicated to helping you succeed in any language.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-3xl p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition hover:scale-105">
            <FaClock className="text-5xl text-green-600 mb-5 group-hover:rotate-3 transition" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Flexible Scheduling
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Book sessions anytime — whether it's morning, evening, or weekends. Learn on your schedule.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group rounded-3xl p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition hover:scale-105">
            <FaGlobe className="text-5xl text-yellow-500 mb-5 group-hover:rotate-3 transition" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Global Community
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with learners and tutors worldwide. Exchange knowledge, culture, and friendships globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
