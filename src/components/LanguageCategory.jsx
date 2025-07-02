import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaLanguage, FaGlobe } from "react-icons/fa";
import { GiTalk, GiEgyptianProfile, GiIndiaGate } from "react-icons/gi";
import { SiGoogletranslate } from "react-icons/si";
import { MdTranslate, MdOutlineLanguage } from "react-icons/md";
import { TbLanguageHiragana, TbWorld } from "react-icons/tb";
import axios from "axios";

// 🔥 Icon Map
const iconMap = {
  FaLanguage: <FaLanguage className="text-4xl text-blue-500" />,
  GiTalk: <GiTalk className="text-4xl text-yellow-500" />,
  SiGoogletranslate: <SiGoogletranslate className="text-4xl text-pink-500" />,
  FaGlobe: <FaGlobe className="text-4xl text-gray-600" />,
  TbLanguageHiragana: <TbLanguageHiragana className="text-4xl text-red-500" />,
  GiEgyptianProfile: <GiEgyptianProfile className="text-4xl text-green-600" />,
  GiIndiaGate: <GiIndiaGate className="text-4xl text-orange-600" />,
  MdOutlineLanguage: <MdOutlineLanguage className="text-4xl text-green-500" />,
  MdTranslate: <MdTranslate className="text-4xl text-purple-600" />,
  TbWorld: <TbWorld className="text-4xl text-sky-500" />,
};

const LanguageCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://online-tutor-server-opal.vercel.app/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-4 text-center text-gray-800">
          Explore <span className="text-blue-600">Language</span> Categories
        </h2>
        <p className="mb-12 text-center text-gray-600 text-lg max-w-2xl mx-auto">
          Find the perfect tutor by exploring languages you’re passionate about.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/find-tutors/${cat.path}`)}
              className="bg-white/60 backdrop-blur-xl border border-blue-100 rounded-3xl p-6 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-4">
                {iconMap[cat.icon] || (
                  <FaLanguage className="text-4xl text-blue-500" />
                )}
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {cat.title}
                </h3>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Discover {cat.title} tutors
                </p>
                <FaArrowRight className="text-blue-500 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageCategory;