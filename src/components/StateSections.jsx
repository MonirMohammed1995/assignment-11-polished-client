import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  Users,
  Star,
  Languages,
  UserRound
} from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'Total Tutors',
    count: 128,
    icon: <Users size={32} className="text-indigo-600" />,
  },
  {
    id: 2,
    title: 'Total Reviews',
    count: 524,
    icon: <Star size={32} className="text-yellow-500" />,
  },
  {
    id: 3,
    title: 'Languages Taught',
    count: 14,
    icon: <Languages size={32} className="text-green-600" />,
  },
  {
    id: 4,
    title: 'Registered Users',
    count: 980,
    icon: <UserRound size={32} className="text-pink-500" />,
  },
];

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6 sm:px-10 lg:px-16 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Our Impact in Numbers
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Trusted by a growing global community of learners and educators.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
                {inView ? <CountUp end={stat.count} duration={2} /> : '0'}
              </h3>
              <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;